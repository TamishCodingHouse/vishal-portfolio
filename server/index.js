import express    from "express";
import cors       from "cors";
import helmet     from "helmet";
import rateLimit  from "express-rate-limit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv     from "dotenv";
import { PORTFOLIO_SYSTEM_PROMPT, SUGGESTED_QUESTIONS, PORTFOLIO_FACTS } from "./portfolioContext.js";

dotenv.config();

// ─── Config ────────────────────────────────────────────────────────────────
const PORT         = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const API_KEY      = process.env.GEMINI_API_KEY;
const AI_ENABLED   = API_KEY && API_KEY !== "your_gemini_api_key_here";

// ─── Express app ──────────────────────────────────────────────────────────
const app = express();

app.use(helmet());
app.use(cors({ origin: FRONTEND_URL, methods: ["GET","POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json({ limit: "10kb" }));

// ─── Rate limiter (20 req/min per IP) ────────────────────────────────────
const chatLimiter = rateLimit({
  windowMs: 60_000, max: 20,
  message: { error: "Too many requests. Please slow down." },
  standardHeaders: true, legacyHeaders: false,
});

// ─── Gemini setup ─────────────────────────────────────────────────────────
const genAI = AI_ENABLED ? new GoogleGenerativeAI(API_KEY) : null;

function getModel() {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 600 },
  });
}

// ─── Intelligent fallback (keyword-based from PORTFOLIO_FACTS) ───────────
function smartFallback(message) {
  const m = message.toLowerCase();

  for (const { keywords, answer } of PORTFOLIO_FACTS) {
    if (keywords.some(k => m.includes(k))) return answer;
  }

  return "I'm Vishal's Portfolio AI. Add a GEMINI_API_KEY to the server .env to enable full AI responses. Meanwhile, explore the sections on this page to learn about Vishal's work!";
}

// ─── Routes ───────────────────────────────────────────────────────────────

app.get("/api/health", (_req, res) => res.json({
  status: "ok",
  ai    : AI_ENABLED ? "gemini-1.5-flash" : "fallback",
}));

app.get("/api/chat/suggestions", (_req, res) =>
  res.json({ suggestions: SUGGESTED_QUESTIONS })
);

/**
 * POST /api/chat
 * body: { message: string, history?: [{role:"user"|"bot", text:string}] }
 */
app.post("/api/chat", chatLimiter, async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string")
      return res.status(400).json({ error: "message is required." });
    if (!message.trim())
      return res.status(400).json({ error: "message cannot be empty." });
    if (message.length > 1000)
      return res.status(400).json({ error: "message too long (max 1000 chars)." });

    // ── Fallback mode ───────────────────────────────────────────────
    if (!AI_ENABLED) {
      return res.json({ reply: smartFallback(message), model: "fallback" });
    }

    // ── Gemini AI mode ──────────────────────────────────────────────
    const model = getModel();

    // System prompt injected as first exchange in history
    const systemHistory = [
      { role: "user",  parts: [{ text: PORTFOLIO_SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood. I am Vishal's Portfolio AI. I will only answer questions about Vishal Deep based on the provided knowledge base." }] },
    ];

    const priorHistory = history.slice(-10).map(item => ({
      role : item.role === "bot" ? "model" : "user",
      parts: [{ text: item.text }],
    }));

    const chat  = model.startChat({ history: [...systemHistory, ...priorHistory] });
    const result = await chat.sendMessage(message.trim());
    const reply  = result.response.text();

    return res.json({ reply, model: "gemini-1.5-flash" });

  } catch (err) {
    const msg = err?.message || String(err);
    console.error("Chat error:", msg);

    if (msg.includes("429") || msg.includes("quota") || msg.includes("rate"))
      return res.status(429).json({ error: "AI rate limit reached. Please wait a moment." });

    if (msg.includes("400") || msg.includes("API_KEY_INVALID") || msg.includes("invalid"))
      return res.status(400).json({ error: "Invalid Gemini API key. Check your .env file." });

    // Graceful fallback — still return a useful answer
    return res.json({
      reply: smartFallback(req.body?.message || ""),
      model: "fallback",
      note : "AI temporarily unavailable — using knowledge base.",
    });
  }
});

app.use((_req, res) => res.status(404).json({ error: "Route not found." }));

// ─── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API  →  http://localhost:${PORT}`);
  console.log(`🤖 AI mode        →  ${AI_ENABLED ? "Gemini 1.5 Flash ✓" : "Smart Fallback (add GEMINI_API_KEY)"}`);
  console.log(`🔒 CORS origin    →  ${FRONTEND_URL}`);
  console.log(`\n   GET  /api/health`);
  console.log(`   GET  /api/chat/suggestions`);
  console.log(`   POST /api/chat\n`);
});
