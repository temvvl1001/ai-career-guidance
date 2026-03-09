"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

const MAX_HISTORY_MESSAGES = 50;
const SHARED_HISTORY_STORAGE_KEY = "ai-helper:history:v2:global";
const SHARED_OPEN_STATE_KEY = "ai-helper:open:v2:global";
const LEGACY_HISTORY_PREFIX = "ai-helper:history:v1:";
const HISTORY_SYNC_EVENT = "ai-helper:history-sync";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIHelperProps {
  personalityType?: string;
  career?: string;
  compact?: boolean;
}

const isValidMessage = (value: unknown): value is Message => {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<Message>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
};

const parseStoredMessages = (raw: string | null): Message[] => {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(isValidMessage).slice(-MAX_HISTORY_MESSAGES)
      : [];
  } catch {
    return [];
  }
};

const areMessagesEqual = (left: Message[], right: Message[]) => {
  if (left.length !== right.length) return false;

  for (let i = 0; i < left.length; i += 1) {
    if (
      left[i].role !== right[i].role ||
      left[i].content !== right[i].content
    ) {
      return false;
    }
  }

  return true;
};

const migrateLegacyHistory = (): Message[] => {
  if (typeof window === "undefined") return [];

  let migrated: Message[] = [];
  const legacyKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith(LEGACY_HISTORY_PREFIX)
  );

  for (const key of legacyKeys) {
    const candidate = parseStoredMessages(localStorage.getItem(key));
    if (candidate.length > migrated.length) {
      migrated = candidate;
    }
  }

  if (migrated.length > 0) {
    localStorage.setItem(
      SHARED_HISTORY_STORAGE_KEY,
      JSON.stringify(migrated)
    );
  }

  return migrated;
};

export default function AIHelper({
  personalityType,
  career,
  compact = false,
}: AIHelperProps) {
  const historyStorageKey = SHARED_HISTORY_STORAGE_KEY;
  const openStateStorageKey = SHARED_OPEN_STATE_KEY;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [historyReady, setHistoryReady] = useState(false);
  const [openStateReady, setOpenStateReady] = useState(!compact);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setHistoryReady(false);
    setOpenStateReady(!compact);

    try {
      const rawHistory = localStorage.getItem(historyStorageKey);
      const restoredMessages = rawHistory
        ? parseStoredMessages(rawHistory)
        : migrateLegacyHistory();
      setMessages(restoredMessages);

      if (compact) {
        setIsOpen(localStorage.getItem(openStateStorageKey) === "1");
      }
    } catch {
      setMessages([]);
      if (compact) {
        setIsOpen(false);
      }
    } finally {
      setHistoryReady(true);
      if (compact) {
        setOpenStateReady(true);
      }
    }
  }, [compact, historyStorageKey, openStateStorageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncMessages = () => {
      const nextMessages = parseStoredMessages(localStorage.getItem(historyStorageKey));
      setMessages((prev) => (areMessagesEqual(prev, nextMessages) ? prev : nextMessages));
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key && event.key !== historyStorageKey) return;
      syncMessages();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(HISTORY_SYNC_EVENT, syncMessages);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(HISTORY_SYNC_EVENT, syncMessages);
    };
  }, [historyStorageKey]);

  useEffect(() => {
    if (!historyReady || typeof window === "undefined") return;

    const serialized = JSON.stringify(messages.slice(-MAX_HISTORY_MESSAGES));
    if (localStorage.getItem(historyStorageKey) === serialized) return;

    localStorage.setItem(historyStorageKey, serialized);
    window.dispatchEvent(new Event(HISTORY_SYNC_EVENT));
  }, [messages, historyStorageKey, historyReady]);

  useEffect(() => {
    if (!compact || !openStateReady || typeof window === "undefined") return;

    localStorage.setItem(openStateStorageKey, isOpen ? "1" : "0");
  }, [compact, isOpen, openStateStorageKey, openStateReady]);

  const clearHistory = () => {
    setMessages([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(historyStorageKey);
      window.dispatchEvent(new Event(HISTORY_SYNC_EVENT));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const userEntry: Message = { role: "user", content: userMessage };
    const nextMessages: Message[] = [
      ...messages,
      userEntry,
    ].slice(-MAX_HISTORY_MESSAGES);
    setInput("");
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          context: { personalityType, career },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to get AI response.");
      }

      if (typeof data?.response !== "string" || data.response.trim().length === 0) {
        throw new Error("Empty AI response. Please try again.");
      }

      const assistantEntry: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantEntry].slice(-MAX_HISTORY_MESSAGES));
    } catch (error) {
      const errorEntry: Message = {
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorEntry].slice(-MAX_HISTORY_MESSAGES));
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
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs text-dark-300 hover:text-white"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-dark-400 hover:text-white"
                >
                  X
                </button>
              </div>
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-accent-purple" />
          <h3 className="text-lg font-semibold">AI Career Assistant</h3>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs text-dark-300 hover:text-white"
          >
            Clear history
          </button>
        )}
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
