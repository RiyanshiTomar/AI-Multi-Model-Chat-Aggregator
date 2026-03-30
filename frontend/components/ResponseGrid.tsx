"use client";

import { ModelId, PanelState } from "@/types";
import ResponsePanel from "./ResponsePanel";

interface Props {
  selectedModels: ModelId[];
  panels: Record<ModelId, PanelState>;
}

// Renders the active response panels in a responsive grid.
// - 1 model   → centered single column
// - 2 models  → 2 columns
// - 3+ models → 2 columns (wraps to 3 on xl screens)
export default function ResponseGrid({ selectedModels, panels }: Props) {
  if (selectedModels.length === 0) return null;

  const gridClass =
    selectedModels.length === 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : selectedModels.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className={`grid gap-4 w-full ${gridClass}`}>
      {selectedModels.map((id) => (
        <ResponsePanel key={id} panel={panels[id]} />
      ))}
    </div>
  );
}
