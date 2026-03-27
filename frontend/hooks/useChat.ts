"use client";

import { useState } from "react";
import { ModelId, PanelState } from "@/types";
import { API_URL, MODELS } from "@/lib/config";

// Builds the initial "idle" state for every model
function buildInitialPanels(): Record<ModelId, PanelState> {
  const initial = {} as Record<ModelId, PanelState>;
  MODELS.forEach((m) => {
    initial[m.id] = {
      modelId: m.id,
      status: "idle",
      response: "",
      errorMessage: "",
    };
  });
  return initial;
}

export function useChat() {
  const [selectedModels, setSelectedModels] = useState<ModelId[]>(["groq", "mistral"]);
  const [prompt, setPrompt] = useState("");
  const [panels, setPanels] = useState<Record<ModelId, PanelState>>(buildInitialPanels);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle a model on/off. Always keep at least one selected.
  function toggleModel(id: ModelId) {
    setSelectedModels((prev) => {
      if (prev.includes(id)) {
        // Don't deselect the last one
        return prev.length > 1 ? prev.filter((m) => m !== id) : prev;
      }
      return [...prev, id];
    });
  }

  async function submitPrompt() {
    const trimmed = prompt.trim();
    if (!trimmed || isSubmitting || selectedModels.length === 0) return;

    setIsSubmitting(true);

    // Set all selected panels to loading, reset others to idle
    setPanels((prev) => {
      const next = { ...prev };
      MODELS.forEach((m) => {
        if (selectedModels.includes(m.id)) {
          next[m.id] = { ...next[m.id], status: "loading", response: "", errorMessage: "" };
        } else {
          next[m.id] = { ...next[m.id], status: "idle", response: "", errorMessage: "" };
        }
      });
      return next;
    });

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed, models: selectedModels }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const json = await res.json();

      // Map each model result back into panel state
      setPanels((prev) => {
        const next = { ...prev };
        json.responses.forEach((item: { model: ModelId; status: string; data?: string; message?: string }) => {
          if (item.status === "success") {
            next[item.model] = { modelId: item.model, status: "success", response: item.data || "", errorMessage: "" };
          } else {
            next[item.model] = { modelId: item.model, status: "error", response: "", errorMessage: item.message || "Something went wrong" };
          }
        });
        return next;
      });
    } catch (err: unknown) {
      // Network-level failure — mark every selected panel as error
      const message = err instanceof Error ? err.message : "Failed to reach the server";
      setPanels((prev) => {
        const next = { ...prev };
        selectedModels.forEach((id) => {
          next[id] = { modelId: id, status: "error", response: "", errorMessage: message };
        });
        return next;
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Clear everything back to the initial state
  function clearAll() {
    setPrompt("");
    setPanels(buildInitialPanels());
  }

  return {
    prompt,
    setPrompt,
    selectedModels,
    toggleModel,
    panels,
    isSubmitting,
    submitPrompt,
    clearAll,
  };
}
