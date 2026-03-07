"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIHelperProps {
  personalityType?: string;
  career?: string;
  compact?: boolean;
}

export default function AIHelper({
  personalityType,
  career,
  compact = false,
}: AIHelperProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          context: { personalityType, career },
        }),
      });

      const data = await res.json();
      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm having trouble connecting. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen ? (
          <div className="w-96 h-[500px] rounded-2xl bg-dark-800 border border-dark-600 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-dark-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-accent-purple" />
                <span className="font-semibold">AI Career Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-dark-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <p className="text-dark-400 text-sm text-center py-8">
                  Ask me anything about careers, skills, or your personality type!
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <Bot className="w-6 h-6 text-accent-purple flex-shrink-0" />
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      m.role === "user"
                        ? "bg-accent-purple/30"
                        : "bg-dark-700"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  </div>
                  {m.role === "user" && (
                    <User className="w-6 h-6 text-dark-400 flex-shrink-0" />
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <Bot className="w-6 h-6 text-accent-purple flex-shrink-0" />
                  <div className="p-3 rounded-xl bg-dark-700">
                    <p className="text-sm text-dark-400">Thinking...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-dark-600">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about careers..."
                  className="flex-1 px-4 py-2 rounded-lg bg-dark-900 border border-dark-600 focus:border-accent-purple outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="p-2 rounded-lg bg-accent-purple hover:bg-accent-purple/80 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="p-4 rounded-full bg-accent-purple hover:bg-accent-purple/80 shadow-lg transition-colors"
          >
            <Bot className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-8 h-8 text-accent-purple" />
        <h3 className="text-lg font-semibold">AI Career Assistant</h3>
      </div>
      <p className="text-dark-400 text-sm mb-4">
        Ask questions about your career path, skills, or personality insights.
      </p>
      <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "assistant" && (
              <Bot className="w-5 h-5 text-accent-purple flex-shrink-0 mt-1" />
            )}
            <div
              className={`max-w-[85%] p-3 rounded-xl ${
                m.role === "user" ? "bg-accent-purple/30" : "bg-dark-700"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{m.content}</p>
            </div>
            {m.role === "user" && (
              <User className="w-5 h-5 text-dark-400 flex-shrink-0 mt-1" />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <Bot className="w-5 h-5 text-accent-purple flex-shrink-0" />
            <div className="p-3 rounded-xl bg-dark-700">
              <p className="text-sm text-dark-400">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about careers, skills, or your results..."
          className="flex-1 px-4 py-3 rounded-lg bg-dark-900 border border-dark-600 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-3 rounded-lg bg-accent-purple hover:bg-accent-purple/80 disabled:opacity-50 font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
}
