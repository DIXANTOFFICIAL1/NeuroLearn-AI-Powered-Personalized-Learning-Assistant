import { useState, useRef, useEffect } from "react";
import { explainTopic } from "../services/api"; 
import ReactMarkdown from "react-markdown";

function Explain() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const resultRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleExplain = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setResult("");

    const prompt = `
You are a world-class AI tutor who explains concepts better than textbooks.

Teach the topic: "${topic}"

Follow this structure strictly:

# 1. Simple Explanation
Explain in the simplest possible way (like teaching a beginner).

# 2. Intuition (Why it matters)
Explain the idea behind it in plain English.

# 3. Real-World Analogy
Give a relatable real-life example.

# 4. Step-by-Step Breakdown
Explain how it works step-by-step.

# 5. Code Example (if applicable)
Provide a clean and simple code example.

# 6. Common Mistakes
List mistakes beginners usually make.

# 7. Interview Insight
Explain how this is asked in interviews.

# 8. Summary
Give a short recap in 4-5 bullet points.

Rules:
- Use headings and bullet points
- Keep it beginner-friendly but detailed
- Avoid unnecessary jargon
- Format nicely for readability
`;

    try {

   const response = await explainTopic(prompt, topic);

      setResult(response);
    } catch (err) {
      setResult("⚠️ Error generating explanation");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleExplain();
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div style={container}>

      <h2 style={title}>Explain Concept</h2>

      <div style={inputWrapper}>
        <input
          ref={inputRef}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter topic (e.g. Binary Search)"
          style={input}
        />

        <button onClick={handleExplain} style={button}>
          Explain
        </button>
      </div>

      {loading && (
        <div style={loadingStyle}>
          AI is explaining...
        </div>
      )}

      {result && (
        <div style={resultWrapper}>
          <button onClick={copyText} style={copyBtn}>
            Copy
          </button>

          <div style={resultBox}>
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </div>
      )}

      <div ref={resultRef} />

    </div>
  );
}

export default Explain;


/* 🔥 STYLES */

const container = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  overflow: "hidden",
};

const title = {
  marginBottom: "20px",
};

const inputWrapper = {
  display: "flex",
  gap: "10px",
  width: "100%",
  maxWidth: "700px",
};

const input = {
  flex: 1,
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "#1e293b",
  color: "white",
};

const button = {
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const loadingStyle = {
  marginTop: "20px",
  color: "#94a3b8",
};

const resultWrapper = {
  marginTop: "25px",
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const resultBox = {
  width: "100%",
  maxHeight: "60vh",   
  overflowY: "auto",  
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  lineHeight: "1.6",
};

const copyBtn = {
  alignSelf: "flex-end",
  background: "transparent",
  border: "none",
  color: "#94a3b8",
  cursor: "pointer",
  fontSize: "12px",
};