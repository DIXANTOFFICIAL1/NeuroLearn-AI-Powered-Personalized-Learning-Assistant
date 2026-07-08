import { useState, useRef, useEffect } from "react";
import { generateRoadmap } from "../services/api";
import ReactMarkdown from "react-markdown";

function Roadmap() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  const suggestions = [
    "Web Development",
    "DSA",
    "Machine Learning",
    "Data Science",
    "Frontend",
    "Backend"
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setResult("");

    const prompt = `
You are an expert career mentor.

Create a COMPLETE learning roadmap for "${topic}".

FORMAT (VERY IMPORTANT):

# 🚀 ${topic} Roadmap

## 🟢 Beginner
- Topic 1
- Topic 2

## 🟡 Intermediate
- Topic 1
- Topic 2

## 🔴 Advanced
- Topic 1
- Topic 2

## 📚 Resources
- Add useful links or platforms

Make it clean, structured, and easy to follow.
`;

   const response = await generateRoadmap(prompt, topic);

    setResult(response);
    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(result);
  };

  const downloadText = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic}_roadmap.txt`;
    a.click();
  };

  return (
    <div style={container}>

      <div style={header}>
        <h2>🚀 Learning Roadmap</h2>
      </div>

      <div style={suggestionsBox}>
        {suggestions.map((s, i) => (
          <span key={i} style={chip} onClick={() => setTopic(s)}>
            {s}
          </span>
        ))}
      </div>

  
      <div style={inputWrapper}>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="Enter topic..."
          style={input}
        />

        <button onClick={handleGenerate} style={button}>
          Generate
        </button>
      </div>

   
      {loading && (
        <div style={loadingStyle}>Generating roadmap...</div>
      )}

  
      <div style={resultWrapper}>

        {result && (
          <>          
            <div style={actions}>
              <button onClick={copyText} style={actionBtn}>Copy</button>
              <button onClick={downloadText} style={actionBtn}>Download</button>
              <button onClick={() => setResult("")} style={actionBtn}>Clear</button>
            </div>

            {/* CONTENT */}
            <div style={resultBox}>
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </>
        )}

      </div>

      <div ref={bottomRef} />
    </div>
  );
}

export default Roadmap;


/* STYLES */

const container = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
};

const header = {
  marginBottom: "10px",
};

const suggestionsBox = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "15px",
  justifyContent: "center",
};

const chip = {
  padding: "6px 12px",
  background: "#1e293b",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "12px",
  transition: "0.2s",
};

const inputWrapper = {
  display: "flex",
  gap: "10px",
  width: "100%",
  maxWidth: "700px",
};

const input = {
  flex: 1,
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  fontSize: "14px",
};

const button = {
  padding: "14px 22px",
  borderRadius: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
};

const loadingStyle = {
  marginTop: "20px",
  color: "#94a3b8",
};

const resultWrapper = {
  width: "100%",
  maxWidth: "900px",
  marginTop: "20px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const actions = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

const actionBtn = {
  padding: "6px 12px",
  background: "#1e293b",
  border: "none",
  borderRadius: "6px",
  color: "#cbd5f5",
  cursor: "pointer",
};

const resultBox = {
  background: "#0f172a",
  padding: "25px",
  borderRadius: "12px",
  lineHeight: "1.7",
  overflowY: "auto",
  maxHeight: "65vh",
  border: "1px solid #334155",
};