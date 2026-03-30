"use client";

import { PanelState } from "@/types";
import { MODELS } from "@/lib/config";

interface Props {
  panel: PanelState;
}

export default function ResponsePanel({ panel }: Props) {
  const model = MODELS.find((m) => m.id === panel.modelId)!;

  return (
    <div className="flex flex-col bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden h-full min-h-64">
      {/* Panel header with gradient accent */}
      <div className={`flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${model.color} bg-opacity-20`}>
        <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${model.color} shadow-md`} />
        <div>
          <p className="text-sm font-semibold text-white">{model.label}</p>
          <p className="text-xs text-white/60">{model.description}</p>
        </div>
        {/* Live status badge */}
        <div className="ml-auto">
          <StatusBadge status={panel.status} />
        </div>
      </div>

      {/* Panel body */}
      <div className="flex-1 px-5 py-4 overflow-auto">
        {panel.status === "idle" && <IdleContent />}
        {panel.status === "loading" && <LoadingContent label={model.label} />}
        {panel.status === "success" && <SuccessContent text={panel.response} />}
        {panel.status === "error" && <ErrorContent message={panel.errorMessage} />}
      </div>
    </div>
  );
}

// ---- Sub-components ----

function StatusBadge({ status }: { status: PanelState["status"] }) {
  const map = {
    idle: { label: "Ready", style: "bg-gray-700 text-gray-400" },
    loading: { label: "Generating…", style: "bg-yellow-900/60 text-yellow-400 animate-pulse" },
    success: { label: "Done", style: "bg-emerald-900/60 text-emerald-400" },
    error: { label: "Failed", style: "bg-red-900/60 text-red-400" },
  };
  const { label, style } = map[status];
  return (
    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${style}`}>
      {label}
    </span>
  );
}

function IdleContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 py-8">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <p className="text-xs text-gray-600">Waiting for your prompt…</p>
    </div>
  );
}

function LoadingContent({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
      {/* Animated dots spinner */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">{label} is thinking…</p>
    </div>
  );
}

function SuccessContent({ text }: { text: string }) {
  return (
    <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
      {text}
    </div>
  );
}

function ErrorContent({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center">
        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
        </svg>
      </div>
      <p className="text-xs text-red-400 font-medium">Request failed</p>
      <p className="text-xs text-gray-500 max-w-xs">{message}</p>
    </div>
  );
}
