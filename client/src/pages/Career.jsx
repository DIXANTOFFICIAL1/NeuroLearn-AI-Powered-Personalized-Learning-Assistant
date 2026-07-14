import { useState, useRef, useEffect } from "react";
import { generateCareer } from "../services/api";
import ReactMarkdown from "react-markdown";

function Career() {
  const [role, setRole] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  const suggestions = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Cyber Security",
    "Android Developer",
  ];

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  const handleGenerate = async () => {
    if (!role.trim()) return;

    setLoading(true);

    const prompt = `
You are a professional career mentor.

Create a COMPLETE career guide for "${role}".

Make response structured and practical.

FORMAT STRICTLY:

# 🚀 ${role} Career Guide

## 📌 Overview
Explain what this role does in real world.

## 🧠 Skills Required
- Technical skills
- Soft skills

## 🛠 Tools & Technologies
List important tools.

## 🗺 Roadmap (Step-by-step)
Beginner → Intermediate → Advanced

## 💼 Projects to Build
Give real project ideas.

## 💰 Salary Insights
Entry, mid, senior level (approx).

## 🎯 Interview Preparation
What to focus on.

## 🔥 Tips to Stand Out
Real advice (not generic).
`;
    
    const response = await generateCareer(prompt, role);

    setResult(response);
    setLoading(false);
  };

  return (
    <div style={container}>
      
      <div style={topSection}>
        <h2 style={title}>Career Guidance</h2>
      </div>

      <div style={inputSection}>

        <div style={suggestionsBox}>
          {suggestions.map((s, i) => (
            <span key={i} style={chip} onClick={() => setRole(s)}>
              {s}
            </span>
          ))}
        </div>

        <div style={inputWrapper}>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter career role..."
            style={input}
          />

          <button onClick={handleGenerate} style={button}>
            Generate
          </button>
        </div>
      </div>

      <div style={resultWrapper}>
        {loading && (
          <p style={loadingText}>Generating career guide...</p>
        )}

        {!loading && !result && (
          <div style={empty}>
            <h3>Explore your career path 🚀</h3>
            <p>Choose a role or type one to get started</p>
          </div>
        )}

        {result && (
          <div style={resultBox}>
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default Career;

/* ================= STYLES ================= */

const container = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  background: "#020617",
  color: "white",
};

const topSection = {
  padding: "16px",
  borderBottom: "1px solid #1e293b",
  textAlign: "center",
  background: "#020617",
  position: "sticky",
  top: 0,
  zIndex: 20,
};

const title = {
  margin: 0,
};

const inputSection = {
  padding: "15px 20px",
  borderBottom: "1px solid #1e293b",
  background: "#020617",
  position: "sticky",
  top: "60px",
  zIndex: 15,
};

const suggestionsBox = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "12px",
};

const chip = {
  padding: "6px 12px",
  background: "#1e293b",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "12px",
  border: "1px solid #334155",
};

const inputWrapper = {
  display: "flex",
  gap: "10px",
};

const input = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
};

const button = {
  padding: "12px 20px",
  borderRadius: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const resultWrapper = {
  flex: 1,
  overflowY: "auto",
  padding: "20px",
};

const resultBox = {
  maxWidth: "900px",
  margin: "0 auto",
  background: "#1e293b",
  padding: "24px",
  borderRadius: "14px",
  lineHeight: "1.7",
  border: "1px solid #334155",
};

const empty = {
  textAlign: "center",
  marginTop: "100px",
  color: "#94a3b8",
};

const loadingText = {
  textAlign: "center",
  color: "#94a3b8",
};
