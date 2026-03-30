// Central config for all models the UI knows about.
// Add / remove entries here to control what appears in the UI.

import { ModelConfig } from "@/types";

export const MODELS: ModelConfig[] = [
  {
    id: "groq",
    label: "Groq (LLaMA 3)",
    color: "from-violet-500 to-purple-600",
    description: "Ultra-fast inference on Meta's LLaMA 3",
  },
  {
    id: "mistral",
    label: "Mistral AI",
    color: "from-sky-500 to-blue-600",
    description: "Efficient and powerful European LLM",
  },
  {
    id: "huggingface",
    label: "HuggingFace",
    color: "from-orange-500 to-amber-600",
    description: "Coming soon: No API key configured",
    disabled: true,
  },
  {
    id: "gemini",
    label: "Google Gemini",
    color: "from-emerald-500 to-teal-600",
    description: "Coming soon: No API key configured",
    disabled: true,
  },
  {
    id: "azure",
    label: "Azure OpenAI",
    color: "from-blue-700 to-indigo-800",
    description: "Enterprise-grade OpenAI via Microsoft Azure",
  },
];

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
