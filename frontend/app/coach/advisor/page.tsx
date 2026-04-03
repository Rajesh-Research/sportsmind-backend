"use client";

import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Send, Brain, User, Sparkles, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const suggestedQuestions = [
  "How can I improve my athlete's sprint start reaction time?",
  "What are the key biomechanical markers for a good tennis serve?",
  "Design a 4-week periodization plan for a track sprinter.",
  "What recovery protocols reduce hamstring re-injury risk?",
];

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (query?: string) => {
    const text = query || input;
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/api/ai/rag/ask?query=${encodeURIComponent(text)}`,
        { method: "POST" }
      );
      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response || "No response received.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Unable to connect to the GPT advisor. Please ensure the backend is running on port 8000.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <DashboardLayout role="coach">
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center glow-green-subtle">
              <Brain className="w-5 h-5 text-brand-400" />
            </div>
            <span>GPT Sports Advisor</span>
          </h1>
          <p className="text-surface-500">
            Powered by RAG + GPT — ask about biomechanics, strategy, training science, and more.
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 glass-card overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full animate-fade-in">
                <div className="w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center mb-4 glow-green-subtle">
                  <Sparkles className="w-10 h-10 text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">What would you like to know?</h3>
                <p className="text-sm text-surface-500 mb-6 text-center max-w-md">
                  Ask any question about sports science, biomechanics, strategy, or training — the GPT advisor draws from an expert knowledge base.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-left p-3 rounded-xl bg-surface-900/50 hover:bg-surface-800/60 border border-surface-800/50 hover:border-brand-500/20 transition-all text-sm text-surface-400 hover:text-surface-300"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-4 h-4 text-brand-400" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-brand-600/80 text-white rounded-br-md border border-brand-500/30"
                      : "bg-surface-900/90 text-surface-200 border border-surface-800/50 rounded-bl-md"
                  }`}
                  style={msg.role === "user" ? { boxShadow: '0 0 10px rgba(0,255,136,0.1)' } : {}}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <p className={`text-[10px] mt-2 ${msg.role === "user" ? "text-brand-200" : "text-surface-600"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-surface-800 border border-surface-700/50 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-surface-400" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Brain className="w-4 h-4 text-brand-400" />
                </div>
                <div className="bg-surface-900/90 border border-surface-800/50 rounded-2xl rounded-bl-md p-4">
                  <div className="flex items-center gap-2 text-sm text-brand-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    GPT is thinking...
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-surface-800/30">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask the GPT sports advisor..."
                className="input-field flex-1"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="btn-primary !px-4"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
