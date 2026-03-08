import { NextResponse } from "next/server";

type IncomingMessage = {
  role?: "user" | "assistant" | "system";
  content?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { messages?: IncomingMessage[] } | null;
  const messages = body?.messages ?? [];
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      message:
        "Assistant endpoint is scaffolded. Add OPENAI_API_KEY and your system prompt/context in src/app/api/chat/route.ts.",
    });
  }

  // TODO: Replace this with OpenAI SDK call using final prompt/context strategy.
  return NextResponse.json({
    message: `Integration point active. Last user message: "${latestUserMessage?.content ?? ""}"`,
  });
}
