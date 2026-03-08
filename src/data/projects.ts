// TODO: Replace with your real project portfolio.
export type Project = {
  title: string;
  description: string;
  skills: string[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    title: "Ode de Parfum",
    description:
      "Currently building a full-stack tool to generate custom fragrances based on songs. Experience your favorite tunes note by note.",
    skills: ["Python", "FastAPI", "Flask", "OpenAI", "Spotify", "Hugging Face", "React"],
    githubUrl: "https://github.com/Minulion/OdP",
  },
  {
    title: "Better Evidence Project",
    description:
      "An extensive searchable research library of over 4000+ scientific papers, images, and videos, built for the team at George Mason University.",
    skills: ["Python", "Amazon S3", "Amazon Bedrock", "Go"],
    githubUrl: "https://github.com/Minulion/gmu-better-evidence-project",
  },
  {
    title: "DIYA Water Quality",
    description:
      "A tool to analyze the presence of 100+ chemicals in water across the US, detecting correlations with cancer and flagging counties for risk.",
    skills: ["Python", "Pandas", "Numpy", "Scikit-learn", "Matplotlib"],
    githubUrl: "https://github.com/Minulion/DIYA2021water",
  },
];
