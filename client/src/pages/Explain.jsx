import { useState, useRef, useEffect } from "react";
import { explainTopic } from "../services/api";
import ReactMarkdown from "react-markdown";
import PageHeader from "../components/PageHeader";
import PrimaryButton from "../components/PrimaryButton";
import LoadingState from "../components/LoadingState";
import CopyButton from "../components/CopyButton";
import ErrorMessage from "../components/ErrorMessage";
import RegenerateButton from "../components/RegenerateButton";
import ClearResultButton from "../components/ClearResultButton";
import InputClearButton from "../components/InputClearButton";

function Explain() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resultRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [result, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleExplain = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
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
      const response = await explainTopic(topic, prompt);

      setResult(response);
    } catch (err) {
      setError("⚠️ Failed to generate explanation");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleExplain();
    }
  };

  return (
    <div style={container}>
      <PageHeader
        title="Explain Concept"
        subtitle="Understand difficult topics in a simple and structured way"
      />

      <div style={inputWrapper}>
        <div style={inputBox}>
          <input
            ref={inputRef}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter topic (e.g. Binary Search)"
            style={input}
          />

          <InputClearButton
            visible={!!topic}
            onClick={() => setTopic("")}
          />
        </div>

        <PrimaryButton onClick={handleExplain}>
          Explain
        </PrimaryButton>
      </div>

      {loading && (
        <LoadingState message="AI is explaining..." />
      )}

      <ErrorMessage
        message={error}
        onRetry={handleExplain}
      />

      {result && (
        <div style={resultWrapper}>
          <div style={actionWrapper}>
            <CopyButton text={result} />

            <RegenerateButton
              onClick={handleExplain}
              loading={loading}
            />

            <ClearResultButton
              onClick={() => setResult("")}
            />
          </div>

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

/* ================= STYLES ================= */

const container = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  overflow: "hidden",
};

const inputWrapper = {
  display: "flex",
  gap: "10px",
  width: "100%",
  maxWidth: "700px",
};

const inputBox = {
  position: "relative",
  flex: 1,
  minWidth: 0,
};

const input = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  paddingRight: "35px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "#1e293b",
  color: "white",
};

const resultWrapper = {
  marginTop: "25px",
  width: "100%",
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const actionWrapper = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
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
