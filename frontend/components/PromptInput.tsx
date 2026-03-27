"use client";

import { KeyboardEvent } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  isSubmitting: boolean;
  selectedCount: number;
}

export default function PromptInput({ value, onChange, onSubmit, onClear, isSubmitting, selectedCount }: Props) {
  // Submit on Cmd/Ctrl + Enter
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  const canSubmit = value.trim().length > 0 && !isSubmitting && selectedCount > 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-violet-500/60 focus-within:shadow-lg focus-within:shadow-violet-500/10 transition-all duration-300">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything — all selected models will answer simultaneously…"
          rows={4}
          className="w-full bg-transparent px-5 pt-5 pb-16 text-white placeholder-gray-500 resize-none outline-none text-sm leading-relaxed"
        />

        {/* Toolbar row */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-black/20">
          <span className="text-xs text-gray-500 select-none">
            {selectedCount} model{selectedCount !== 1 ? "s" : ""} selected · Ctrl+Enter to send
          </span>

          <div className="flex items-center gap-2">
            {(value || false) && (
              <button
                onClick={onClear}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
              >
                Clear
              </button>
            )}
            <button
              onClick={onSubmit}
              disabled={!canSubmit}
              className={`
                flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${canSubmit
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 shadow-md shadow-violet-900/40"
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Querying…
                </>
              ) : (
                "Send to All"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
