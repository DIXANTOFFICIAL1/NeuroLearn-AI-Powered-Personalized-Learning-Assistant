import { useState, useRef, useEffect } from "react";
import { generateRoadmap } from "../services/api";
import ReactMarkdown from "react-markdown";
import SuggestionChips from "../components/SuggestionChips";
import LoadingState from "../components/LoadingState";
import CopyButton from "../components/CopyButton";
import ErrorMessage from "../components/ErrorMessage";
import DownloadButton from "../components/DownloadButton";
import SectionNav from "../components/SectionNav";

function Roadmap() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    setError("");
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

    try {
    const response = await generateRoadmap(topic, prompt);

    setResult(response);
  } catch (err) {
    setError("Failed to generate roadmap");
  } finally {
    setLoading(false);
  }
};

  
  return (
    <div style={container}>

      <div style={header}>
        <h2>🚀 Learning Roadmap</h2>
      </div>

      <SuggestionChips
  suggestions={suggestions}
  onSelect={setTopic}
/>

  
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

   
      {loading && <LoadingState message="Generating roadmap..." />}

     <ErrorMessage
    message={error}
     onRetry={handleGenerate}
    />
  
      <div style={resultWrapper}>
  

{result && <SectionNav />}

{result && (
  <>          
    <div style={actions}>
         <CopyButton text={result} />
             <DownloadButton
           content={result}
           filename={`${topic}_roadmap.txt`}
           label="Download"
            />
              <button onClick={() => setResult("")} style={actionBtn}>Clear</button>
      
            </div>

            {/* CONTENT */}
            <div style={resultBox}>
              <ReactMarkdown
  components={{
    h2: ({ children }) => {
      const text = String(children).toLowerCase();

      const id = text.includes("beginner")
        ? "beginner"
        : text.includes("intermediate")
        ? "intermediate"
        : text.includes("advanced")
        ? "advanced"
        : text.includes("resources")
        ? "resources"
        : undefined;

      return (
        <h2 id={id} style={{ scrollMarginTop: "20px" }}>
          {children}
        </h2>
      );
    },
  }}
   >
  {result}
  </ReactMarkdown>
            </div>
          </>
        )}

      </div>

      <div ref={bottomRef} />
    </div>
  );
}

export default Roadmap;

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