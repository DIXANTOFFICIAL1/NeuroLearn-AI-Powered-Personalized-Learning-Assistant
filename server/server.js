import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateAIResponse } from "./services/aiService.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* =======================
   🔥 IN-MEMORY STATS
   ======================= */
let stats = {
  aiTutor: 0,
  explain: 0,
  quiz: 0,
  roadmap: 0,
  career: 0,
};

/* =======================
   🔥 ACTIVITY STORAGE
   ======================= */
let activity = [];

const addActivity = (text) => {
  activity.unshift(text);
  activity = activity.slice(0, 10);
};

/* =======================
   🔥 HELPER: CLEAN LABEL
   ======================= */
const cleanLabel = (input, fallback) => {
  if (!input) return fallback;

  // extract shorter meaningful part if prompt is long
  if (input.length > 60) {
    return fallback;
  }

  return input.replace(/\n/g, " ").trim();
};

/* =======================
   🔥 HELPER: RANDOM PICK
   ======================= */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* =======================
   ROOT
   ======================= */
app.get("/", (req, res) => {
  res.send("NeuroLearn AI Backend Running 🚀");
});

/* =======================
   🔥 CHAT
   ======================= */
app.post("/api/chat", async (req, res) => {
  try {
    const { message, rawInput } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    stats.aiTutor++;

    const label = cleanLabel(rawInput, "a topic");

    const actions = [
      `💬 Asked AI about "${label}"`,
      `💬 Clarified doubts on "${label}"`,
      `💬 Explored "${label}"`,
      `💬 Investigated "${label}"`,
    ];

    addActivity(actions[Math.floor(Math.random() * actions.length)]);

    const reply = await generateAIResponse(message);

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error" });
  }
});
/* =======================
   🔥 EXPLAIN
   ======================= */
app.post("/api/explain", async (req, res) => {
  try {
    const { topic } = req.body;

    stats.explain++;

    const label = cleanLabel(topic, "a concept");

    const actions = [
      `🧠 Learned "${label}"`,
      `🧠 Built understanding of "${label}"`,
      `🧠 Broke down "${label}"`,
      `🧠 Strengthened concept "${label}"`,
    ];

    addActivity(pick(actions));

    const reply = await generateAIResponse(topic); // ✅ KEEP PROMPT

    res.json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "Server error" });
  }
});

/* =======================
   🔥 QUIZ
   ======================= */
app.post("/api/quiz", async (req, res) => {
  try {
    const { topic } = req.body;

    stats.quiz++;

    const label = cleanLabel(topic, "a topic");

    const actions = [
      `🎯 Practiced quiz on "${label}"`,
      `🎯 Tested knowledge in "${label}"`,
      `🎯 Attempted quiz on "${label}"`,
      `🎯 Evaluated skills in "${label}"`,
    ];

    addActivity(pick(actions));

    const reply = await generateAIResponse(topic); // ✅ KEEP PROMPT

    res.json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "Server error" });
  }
});

/* =======================
   🔥 ROADMAP
   ======================= */
app.post("/api/roadmap", async (req, res) => {
  try {
    const { topic } = req.body;

    stats.roadmap++;

    const label = cleanLabel(topic, "a field");

    const actions = [
      `🗺 Explored roadmap for "${label}"`,
      `🗺 Planned path for "${label}"`,
      `🗺 Navigated learning journey in "${label}"`,
      `🗺 Structured roadmap for "${label}"`,
    ];

    addActivity(pick(actions));

    const reply = await generateAIResponse(topic);

    res.json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "Server error" });
  }
});

/* =======================
   🔥 CAREER
   ======================= */
app.post("/api/career", async (req, res) => {
  try {
    const { role } = req.body;

    stats.career++;

    const label = cleanLabel(role, "a role");

    const actions = [
      `💼 Explored career: "${label}"`,
      `💼 Analyzed role "${label}"`,
      `💼 Reviewed opportunities in "${label}"`,
      `💼 Planned future in "${label}"`,
    ];

    addActivity(pick(actions));

    const reply = await generateAIResponse(role);

    res.json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "Server error" });
  }
});

/* =======================
   📊 STATS API
   ======================= */
app.get("/api/stats", (req, res) => {
  res.set("Cache-Control", "no-store"); // 🔥 IMPORTANT FIX FOR REFRESH
  res.json({
    ...stats,
    activity,
  });
});

/* =======================
   SERVER
   ======================= */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});