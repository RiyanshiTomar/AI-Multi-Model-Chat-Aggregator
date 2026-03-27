"use client";

import { ModelId } from "@/types";
import { MODELS } from "@/lib/config";

interface Props {
  selected: ModelId[];
  onToggle: (id: ModelId) => void;
}

export default function ModelToggle({ selected, onToggle }: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {MODELS.map((model) => {
        const isActive = selected.includes(model.id);
        return (
          <button
            key={model.id}
            onClick={() => onToggle(model.id)}
            title={model.description}
            className={`
              group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl
              border-2 text-sm font-medium transition-all duration-200
              ${isActive
                ? `bg-gradient-to-r ${model.color} text-white border-transparent shadow-lg shadow-black/20 scale-105`
                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }
            `}
          >
            {/* Active dot indicator */}
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 transition-all ${
                isActive ? "bg-white" : "bg-gray-600"
              }`}
            />
            {model.label}
          </button>
        );
      })}
    </div>
  );
}
