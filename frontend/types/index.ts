// All shared types for the AI chat aggregator

export type ModelId = "groq" | "mistral" | "openai" | "huggingface";

export interface ModelConfig {
  id: ModelId;
  label: string;
  color: string; // tailwind bg class for the panel accent
  description: string;
}

// What the backend sends back per model
export interface ModelResponse {
  model: ModelId;
  status: "success" | "error";
  data?: string;
  message?: string;
}

// Per-panel UI state (loading / done / error)
export type PanelStatus = "idle" | "loading" | "success" | "error";

export interface PanelState {
  modelId: ModelId;
  status: PanelStatus;
  response: string;
  errorMessage: string;
}
