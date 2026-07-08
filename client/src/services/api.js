import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ================= CHAT ================= */
export const sendMessageToAI = async (message, rawInput) => {
  try {
    const res = await API.post("/chat", {
      message,
      rawInput, 
    });
    return res.data.reply;
  } catch (err) {
    console.error("CHAT ERROR:", err);
    return "Error connecting to AI";
  }
};

/* ================= EXPLAIN ================= */
export const explainTopic = async (topic, rawInput) => {
  try {
    const res = await API.post("/explain", {
      topic,
      rawInput, 
    });
    return res.data.reply;
  } catch (err) {
    console.error("EXPLAIN ERROR:", err);
    return "Error generating explanation";
  }
};

/* ================= QUIZ ================= */
export const generateQuiz = async (topic, rawInput) => {
  try {
    const res = await API.post("/quiz", {
      topic,
      rawInput, 
    });
    return res.data.reply;
  } catch (err) {
    console.error("QUIZ ERROR:", err);
    return "Error generating quiz";
  }
};

/* ================= ROADMAP ================= */
export const generateRoadmap = async (topic, rawInput) => {
  try {
    const res = await API.post("/roadmap", {
      topic,
      rawInput, 
    });
    return res.data.reply;
  } catch (err) {
    console.error("ROADMAP ERROR:", err);
    return "Error generating roadmap";
  }
};

/* ================= CAREER ================= */
export const generateCareer = async (role, rawInput) => {
  try {
    const res = await API.post("/career", {
      role,
      rawInput, 
    });
    return res.data.reply;
  } catch (err) {
    console.error("CAREER ERROR:", err);
    return "Error generating career guide";
  }
};

/* ================= STATS ================= */
export const getStats = async () => {
  try {
    const res = await API.get("/stats", {
      params: {
        t: Date.now(), 
      },
    });
    return res.data;
  } catch (err) {
    console.error("STATS ERROR:", err);
    return null;
  }
};