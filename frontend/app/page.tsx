"use client";

import ModelToggle from "@/components/ModelToggle";
import PromptInput from "@/components/PromptInput";
import ResponseGrid from "@/components/ResponseGrid";
import { useChat } from "@/hooks/useChat";

export default function HomePage() {
  const { prompt, setPrompt, selectedModels, toggleModel, panels, isSubmitting, submitPrompt, clearAll } = useChat();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-4 py-12 pb-20 max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-900/30 border border-violet-700/40 rounded-full text-xs text-violet-300 font-medium mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            AI Multi-Model Chat Aggregator
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Ask Once,<br />Compare Everything
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Your prompt is sent to all selected models simultaneously. See who answers best, side by side.
          </p>
        </header>

        {/* Model selector */}
        <section className="w-full max-w-3xl space-y-2">
          <p className="text-xs font-medium text-gray-500 text-center uppercase tracking-widest">
            Select Models
          </p>
          <ModelToggle selected={selectedModels} onToggle={toggleModel} />
        </section>

        {/* Prompt input */}
        <section className="w-full">
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            onSubmit={submitPrompt}
            onClear={clearAll}
            isSubmitting={isSubmitting}
            selectedCount={selectedModels.length}
          />
        </section>

        {/* Response panels — only shown after first submit */}
        <section className="w-full">
          <ResponseGrid selectedModels={selectedModels} panels={panels} />
        </section>
      </div>
    </main>
  );
}
