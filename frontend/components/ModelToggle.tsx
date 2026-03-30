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
            onClick={() => !model.disabled && onToggle(model.id)}
            title={model.disabled ? "API not configured yet" : model.description}
            disabled={model.disabled}
            className={`
              group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl
              border-2 text-sm font-medium transition-all duration-200
              ${model.disabled 
                ? "bg-white/2 opacity-40 border-dashed border-white/5 cursor-not-allowed grayscale"
                : isActive
                  ? `bg-gradient-to-r ${model.color} text-white border-transparent shadow-lg shadow-black/20 scale-105`
                  : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }
            `}
          >
            {/* Active dot indicator */}
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 transition-all ${
                model.disabled ? "bg-gray-800" : isActive ? "bg-white" : "bg-gray-600"
              }`}
            />
            {model.label}
            {model.disabled && (
              <span className="absolute -top-2 -right-1 bg-gray-800 text-[8px] px-1.5 py-0.5 rounded-md border border-white/10 text-gray-500 font-bold uppercase tracking-tighter">
                Soon
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
