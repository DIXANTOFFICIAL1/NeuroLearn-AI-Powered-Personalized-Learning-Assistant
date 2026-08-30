import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { generateAIResponse } from "./services/aiService.js";
import Stats from "./models/Stats.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// In-memory state used by the existing application logic
let stats = {
  aiTutor: 0,
  explain: 0,
  quiz: 0,
  roadmap: 0,
  career: 0,
};

let activity = [];

const addActivity = (text) => {
  activity.unshift(text);
  activity = activity.slice(0, 10);
};

// MongoDB persistence
const saveToMongoDB = async () => {
  try {
    await Stats.findOneAndUpdate(
      {},
      {
        aiTutor: stats.aiTutor,
        explain: stats.explain,
        quiz: stats.quiz,
        roadmap: stats.roadmap,
        career: stats.career,
        activity,
      },
      {
        upsert: true,
        new: true,
      }
    );
  } catch (error) {
    console.error("MongoDB save error:", error);
  }
};

const loadFromMongoDB = async () => {
  try {
    const data = await Stats.findOne();

    if (data) {
      stats = {
        aiTutor: data.aiTutor || 0,
        explain: data.explain || 0,
        quiz: data.quiz || 0,
        roadmap: data.roadmap || 0,
        career: data.career || 0,
      };

      activity = data.activity || [];

      console.log("Stats restored from MongoDB ✅");
    } else {
      await saveToMongoDB();
      console.log("Initial stats created in MongoDB ✅");
    }
  } catch (error) {
    console.error("MongoDB load error:", error);
  }
};

// Helpers
const cleanLabel = (input, fallback) => {
  if (!input) return fallback;
  if (input.length > 60) return fallback;

  return input.replace(/\n/g, " ").trim();
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Root
app.get("/", (req, res) => {
  res.send("NeuroLearn AI Backend Running 🚀");
});

// Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, rawInput } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    stats.aiTutor++;

    const label = cleanLabel(rawInput, "a topic");

    const actions = [
      `💬 Asked AI about "${label}"`,
      `💬 Clarified doubts on "${label}"`,
      `💬 Explored "${label}"`,
      `💬 Investigated "${label}"`,
    ];

    addActivity(pick(actions));
    await saveToMongoDB();

    const reply = await generateAIResponse(message);

    res.json({ reply });
  } catch (error) {
    console.error("CHAT ERROR:", error);
    res.status(500).json({
      reply: "Server error",
    });
  }
});

// Explain
app.post("/api/explain", async (req, res) => {
  try {
    const { topic, rawInput } = req.body;

    stats.explain++;

    const label = cleanLabel(topic, "a concept");

    const actions = [
      `🧠 Learned "${label}"`,
      `🧠 Built understanding of "${label}"`,
      `🧠 Broke down "${label}"`,
      `🧠 Strengthened concept "${label}"`,
    ];

    addActivity(pick(actions));
    await saveToMongoDB();

    const reply = await generateAIResponse(rawInput);

    res.json({ reply });
  } catch (error) {
    console.error("EXPLAIN ERROR:", error);
    res.status(500).json({
      reply: "Server error",
    });
  }
});

// Quiz
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
    await saveToMongoDB();

    const reply = await generateAIResponse(topic);

    res.json({ reply });
  } catch (error) {
    console.error("QUIZ ERROR:", error);
    res.status(500).json({
      reply: "Server error",
    });
  }
});

// Roadmap
app.post("/api/roadmap", async (req, res) => {
  try {
    const { topic, rawInput } = req.body;

    stats.roadmap++;

    const label = cleanLabel(topic, "a field");

    const actions = [
      `🗺 Explored roadmap for "${label}"`,
      `🗺 Planned path for "${label}"`,
      `🗺 Navigated learning journey in "${label}"`,
      `🗺 Structured roadmap for "${label}"`,
    ];

    addActivity(pick(actions));
    await saveToMongoDB();

    const reply = await generateAIResponse(rawInput);

    res.json({ reply });
  } catch (error) {
    console.error("ROADMAP ERROR:", error);
    res.status(500).json({
      reply: "Server error",
    });
  }
});

// Career
app.post("/api/career", async (req, res) => {
  try {
    const { role, rawInput } = req.body;

    stats.career++;

    const label = cleanLabel(role, "a role");

    const actions = [
      `💼 Explored career: "${label}"`,
      `💼 Analyzed role "${label}"`,
      `💼 Reviewed opportunities in "${label}"`,
      `💼 Planned future in "${label}"`,
    ];

    addActivity(pick(actions));
    await saveToMongoDB();

    const reply = await generateAIResponse(rawInput);

    res.json({ reply });
  } catch (error) {
    console.error("CAREER ERROR:", error);
    res.status(500).json({
      reply: "Server error",
    });
  }
});

// Reset stats
app.delete("/api/stats/reset", async (req, res) => {
  try {
    stats = {
      aiTutor: 0,
      explain: 0,
      quiz: 0,
      roadmap: 0,
      career: 0,
    };

    activity = [];

    await saveToMongoDB();

    res.json({
      message: "Stats reset successfully",
    });
  } catch (error) {
    console.error("RESET ERROR:", error);
    res.status(500).json({
      message: "Failed to reset stats",
    });
  }
});

// Stats
app.get("/api/stats", (req, res) => {
  res.set("Cache-Control", "no-store");

  res.json({
    ...stats,
    activity,
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected ✅");

    await loadFromMongoDB();

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);

    // Keep existing application available if MongoDB is unavailable
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
      console.log("Running without MongoDB persistence ⚠️");
    });
  });