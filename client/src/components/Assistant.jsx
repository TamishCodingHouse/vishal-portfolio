import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { MessageCircle, X, Send, Sparkles, User, Bot, ChevronRight, RefreshCw, Wifi, WifiOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── Default suggestions (used before backend responds) ──────────────
const DEFAULT_SUGGESTIONS = [
  "Who is Vishal Deep?",
  "What technologies does he work with?",
  "Tell me about his projects",
  "What is his work experience?",
  "Why should we hire Vishal?",
  "How can I contact Vishal?",
];

const WELCOME_MSG = "Hi! I'm Vishal's Portfolio AI, powered by Gemini. Ask me anything about Vishal's skills, projects, experience, or how to get in touch.";

// ─── Typing indicator ─────────────────────────────────────────────────
const TypingDots = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 14px" }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{
        width: 7, height: 7, borderRadius: "50%", background: "#60A5FA",
        animation: "bounce 1.2s ease-in-out infinite",
        animationDelay: `${i * 0.18}s`,
      }} />
    ))}
  </div>
);

// ─── Message bubble ───────────────────────────────────────────────────
const Bubble = ({ msg }) => (
  <div style={{
    display: "flex", gap: 10,
    flexDirection: msg.role === "user" ? "row-reverse" : "row",
  }}>
    {/* Avatar */}
    <div style={{
      width: 28, height: 28, borderRadius: 10, flexShrink: 0,
      background: msg.role === "bot" ? "#2563EB" : "#E2E8F0",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {msg.role === "bot"
        ? <Bot size={14} color="#fff" />
        : <User size={14} color="#475569" />
      }
    </div>

    {/* Bubble + time */}
    <div style={{
      display: "flex", flexDirection: "column", gap: 3,
      maxWidth: "82%", alignItems: msg.role === "user" ? "flex-end" : "flex-start",
    }}>
      <div style={{
        padding: "10px 14px",
        fontSize: 13, lineHeight: 1.65,
        background: msg.role === "bot" ? "#fff" : "#2563EB",
        color: msg.role === "bot" ? "#334155" : "#fff",
        border: msg.role === "bot" ? "1px solid #EFF6FF" : "none",
        borderRadius: msg.role === "bot" ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
        boxShadow: msg.role === "bot" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
        whiteSpace: "pre-wrap",
      }}>
        {msg.text}
      </div>
      <span style={{ fontSize: 10, color: "#94A3B8", padding: "0 4px" }}>{msg.time}</span>

      {/* Error retry */}
      {msg.error && msg.retryFn && (
        <button onClick={msg.retryFn} style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 11, color: "#EF4444", background: "none",
          border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", padding: 0,
        }}>
          <RefreshCw size={11} /> Retry
        </button>
      )}
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────
export default function Assistant({ isOpen, onClose }) {
  const panelRef       = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  const [messages,    setMessages]    = useState([{
    id: 1, role: "bot", text: WELCOME_MSG,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }]);
  const [input,       setInput]       = useState("");
  const [isTyping,    setIsTyping]    = useState(false);
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);
  const [showSuggest, setShowSuggest] = useState(true);
  const [backendOk,   setBackendOk]   = useState(null); // null=unknown, true, false

  // Conversation history for context-aware multi-turn chat
  const historyRef = useRef([]);

  // ── Check backend health on mount ──────────────────────────────────
  useEffect(() => {
    fetch(`${API_URL}/api/health`, { signal: AbortSignal.timeout(3000) })
      .then((r) => r.json())
      .then(() => setBackendOk(true))
      .catch(() => setBackendOk(false));

    // Also fetch dynamic suggestions from backend
    fetch(`${API_URL}/api/chat/suggestions`, { signal: AbortSignal.timeout(3000) })
      .then((r) => r.json())
      .then((d) => { if (d.suggestions?.length) setSuggestions(d.suggestions); })
      .catch(() => {});
  }, []);

  // ── Panel open animation ────────────────────────────────────────────
  useEffect(() => {
    if (!panelRef.current || !isOpen) return;
    gsap.fromTo(panelRef.current,
      { opacity: 0, scale: 0.88, y: 24, transformOrigin: "bottom right" },
      { opacity: 1, scale: 1,    y: 0,  duration: 0.32, ease: "back.out(1.5)" }
    );
    setTimeout(() => inputRef.current?.focus(), 340);
  }, [isOpen]);

  // ── Auto-scroll ─────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Send message ────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const t = text.trim();
    if (!t || isTyping) return;

    const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Add user message
    const userMsg = { id: Date.now(), role: "user", text: t, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowSuggest(false);
    setIsTyping(true);

    // Store in history for multi-turn context
    historyRef.current = [...historyRef.current, { role: "user", text: t }].slice(-20);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: t,
          history: historyRef.current.slice(0, -1), // exclude the message we just sent
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || "I couldn't generate a response. Please try again.";

      // Store bot reply in history
      historyRef.current = [...historyRef.current, { role: "bot", text: reply }].slice(-20);

      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1, role: "bot", text: reply, time: now(),
      }]);

    } catch (err) {
      setIsTyping(false);

      const isTimeout = err.name === "TimeoutError" || err.message?.includes("timeout");
      const errText   = isTimeout
        ? "Request timed out. Check your connection and try again."
        : err.message || "Something went wrong. Please try again.";

      const retryFn = () => {
        setMessages((prev) => prev.filter((m) => m.id !== errMsgId));
        sendMessage(t);
      };
      const errMsgId = Date.now() + 2;

      setMessages((prev) => [...prev, {
        id: errMsgId, role: "bot", text: errText, time: now(),
        error: true, retryFn,
      }]);
    }
  }, [isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (q) => sendMessage(q);

  // ── Panel width (responsive) ─────────────────────────────────────────
  const panelWidth = typeof window !== "undefined"
    ? Math.min(380, window.innerWidth - 32)
    : 360;

  return (
    <>
      {/* ── Floating button ────────────────────────────────────────── */}
      <button
        onClick={isOpen ? onClose : () => {}}
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 100,
          width: 56, height: 56, borderRadius: 18,
          background: isOpen
            ? "#334155"
            : "linear-gradient(135deg,#3B82F6,#1D4ED8)",
          border: "none", cursor: "pointer", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: isOpen ? "none" : "0 8px 32px rgba(37,99,235,0.38)",
          transform: isOpen ? "scale(0.9)" : "scale(1)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        {!isOpen && (
          <span style={{
            position: "absolute", inset: 0, borderRadius: 18,
            border: "2px solid #60A5FA",
            animation: "pulseRing 2s ease-out infinite",
          }} />
        )}
      </button>

      {/* ── Chat panel ─────────────────────────────────────────────── */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Vishal's Portfolio AI Assistant"
          aria-modal="true"
          style={{
            position: "fixed", bottom: 96, right: 24, zIndex: 99,
            width: panelWidth, maxHeight: 560,
            display: "flex", flexDirection: "column",
            borderRadius: 28, overflow: "hidden",
            background: "#fff", border: "1px solid #DBEAFE",
            boxShadow: "0 24px 64px rgba(15,23,42,0.18), 0 4px 16px rgba(37,99,235,0.1)",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 18px",
            background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: "rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Sparkles size={18} color="#fff" />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#fff", fontSize: 14, margin: 0 }}>
                  Vishal's Portfolio AI
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  {backendOk === null && (
                    <span style={{ color: "#BFDBFE", fontSize: 11 }}>Connecting...</span>
                  )}
                  {backendOk === true && (
                    <>
                      <Wifi size={10} color="#4ADE80" />
                      <span style={{ color: "#86EFAC", fontSize: 11 }}>Gemini AI • Connected</span>
                    </>
                  )}
                  {backendOk === false && (
                    <>
                      <WifiOff size={10} color="#FCA5A5" />
                      <span style={{ color: "#FCA5A5", fontSize: 11 }}>Fallback mode</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close assistant"
              style={{
                width: 30, height: 30, borderRadius: 10,
                background: "rgba(255,255,255,0.14)",
                border: "none", cursor: "pointer", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages area */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "16px",
            display: "flex", flexDirection: "column", gap: 14,
            background: "#F8FAFF", minHeight: 0,
          }}>
            {messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 10,
                  background: "#2563EB", display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Bot size={14} color="#fff" />
                </div>
                <div style={{
                  background: "#fff", border: "1px solid #EFF6FF",
                  borderRadius: "4px 18px 18px 18px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Suggested questions (shown only at start) */}
            {showSuggest && messages.length <= 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }}>
                <p style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600,
                  paddingLeft: 2, margin: 0 }}>
                  Quick questions:
                </p>
                {suggestions.map((q, i) => (
                  <button key={i} onClick={() => handleSuggestion(q)}
                    style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: 8,
                      padding: "9px 13px", borderRadius: 12,
                      background: "#fff", border: "1px solid #DBEAFE",
                      fontSize: 12, color: "#334155", fontWeight: 500,
                      cursor: "pointer", textAlign: "left",
                      transition: "all 0.18s",
                      fontFamily: "'Inter',sans-serif",
                    }}
                  >
                    <span>{q}</span>
                    <ChevronRight size={12} color="#60A5FA" style={{ flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex", gap: 8, padding: "12px 14px",
              borderTop: "1px solid #EFF6FF", background: "#fff",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Vishal's skills, projects..."
              disabled={isTyping}
              aria-label="Your message"
              style={{
                flex: 1, padding: "9px 14px", borderRadius: 12, fontSize: 13,
                border: "1.5px solid #E2E8F0", background: "#F8FAFC",
                color: "#1E293B", outline: "none",
                transition: "border 0.2s",
                fontFamily: "'Inter',sans-serif",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              style={{
                width: 38, height: 38, borderRadius: 12,
                background: !input.trim() || isTyping ? "#E2E8F0" : "#2563EB",
                border: "none",
                cursor: !input.trim() || isTyping ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
              }}
            >
              <Send size={16} color={!input.trim() || isTyping ? "#94A3B8" : "#fff"} />
            </button>
          </form>

          {/* Footer */}
          <div style={{ padding: "0 14px 10px", background: "#fff" }}>
            <p style={{ fontSize: 10, color: "#94A3B8", textAlign: "center", margin: 0 }}>
              Powered by Google Gemini · Portfolio knowledge base
            </p>
          </div>
        </div>
      )}
    </>
  );
}
