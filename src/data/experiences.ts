export type Experience = {
  id: string;
  role: string;
  company: string;
  date: string;
  summary: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Project Manager",
    company: "Data Science for Sustainable Development",
    date: "Jan 2026 - Present",
    summary: "Building a route optimization tool for the Badger Prairie Needs Network.",
    highlights: [
      "Lead a team of 5 developers to build a route optimization tool for the 3rd largest food pantry in Dane county.",
      "Implement a Vehicle Routing Problem (VRP)-based solution to partition 300+ delivery addresses and balance route durations using Google Maps and OSRM APIs.",
      "Manage GitHub workflow (issue creation, task assignment, pull request review) to align development with client specs.",
      "Deploy Google Cloud hosting, develop backend database with address caching to improve usability and performance.",
    ],
  },
  {
    id: "exp-2",
    role: "AI Agent Builder Intern",
    company: "NeuralSeek",
    date: "Aug 2025 - Sep 2025",
    summary: "Built an agentic RAG pipeline to create custom study plans.",
    highlights: [
      "Completed an intensive 6-week program on agentic AI design, prompt engineering, and LLM workflow integration.",
      "Implemented multi-step agent workflows for subject classification, planning, and source ranking.",
      "Earned certification in agent development and collaborated with a peer cohort on real-world deployment strategies.",
    ],
  },
  {
    id: "exp-3",
    role: "Software Engineer",
    company: "Data Science for Sustainable Development",
    date: "Oct 2024 - May 2025",
    summary: "Built the Better Evidence Project search engine for George Mason University.",
    highlights: [
      "Engineered a Python and Go script to generate metadata and thumbnails for 3000+ research papers in AWS S3.",
      "Automated metadata generation for uploaded PDFs using Bedrock API, cutting ~5 minutes of manual entry per paper.",
      "Coordinated with peers to fulfill project specifications and deploy search engine on researchers’ webpage.",
    ],
  },
];
