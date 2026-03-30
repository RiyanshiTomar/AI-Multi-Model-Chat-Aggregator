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
    id: "openai",
    label: "OpenAI GPT-3.5",
    color: "from-emerald-500 to-teal-600",
    description: "Trusted general-purpose language model",
  },
  {
    id: "huggingface",
    label: "HuggingFace",
    color: "from-orange-500 to-amber-600",
    description: "Open-source Mistral 7B via HuggingFace",
  },
];

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
