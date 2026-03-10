import { NextResponse } from "next/server";
import { buildChatbotInstructions } from "@/data/chatbot-context";

type IncomingMessage = {
  role?: "user" | "assistant" | "system";
  content?: string;
};

type OpenAIResponse = {
  output?: Array<{
    type?: string;
    role?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

function getAssistantText(response: OpenAIResponse) {
  const messageItem = response.output?.find((item) => item.type === "message" && item.role === "assistant");

  if (!messageItem?.content) {
    return null;
  }

  return messageItem.content
    .filter((part) => part.type === "output_text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("")
    .trim();
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { messages?: IncomingMessage[] } | null;
  const messages = (body?.messages ?? [])
    .filter(
      (message): message is Required<Pick<IncomingMessage, "role" | "content">> =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0,
    )
    .slice(-12);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      message: "Add OPENAI_API_KEY to enable the chatbot response.",
    });
  }

  if (messages.length === 0) {
    return NextResponse.json(
      {
        message: "Send a message to start the conversation.",
      },
      { status: 400 },
    );
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      store: false,
      instructions: buildChatbotInstructions(),
      input: messages.map((message) => ({
        role: message.role,
        content: [
          {
            type: message.role === "assistant" ? "output_text" : "input_text",
            text: message.content,
          },
        ],
      })),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("OpenAI API error", errorText);

    const message =
      process.env.NODE_ENV === "development"
        ? `OpenAI API error: ${errorText}`
        : "The chatbot could not generate a response right now.";

    return NextResponse.json(
      {
        message,
      },
      { status: 500 },
    );
  }

  const data = (await response.json()) as OpenAIResponse;
  const message = getAssistantText(data);

  if (!message) {
    return NextResponse.json(
      {
        message: "The chatbot did not return any text.",
      },
      { status: 500 },
    );
  }

  function sanitizeAssistantText(text: string) {
    return text.replace(/\s*[—–]\s*/g, ", ");
  }

  return NextResponse.json({ message: sanitizeAssistantText(message) });
}
