import { useState, useRef, useEffect } from "react";
import { generateQuiz } from "../services/api";


function Quiz() {
  const [topic, setTopic] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);

  const suggestions = [
    "Arrays",
    "Binary Search",
    "Graphs",
    "Dynamic Programming",
    "Operating Systems",
    "DBMS",
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [quizData, score]);

 
  const extractJSON = (text) => {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    return text.slice(start, end + 1);
  };

 
  const getOptionLetter = (opt) => {
    if (!opt) return "";
    return opt.trim().charAt(0);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setQuizData([]);
    setSelected({});
    setScore(null);
    setSubmitted(false);
    setError("");

    try {
      const prompt = `
Generate EXACTLY 5 MCQs on "${topic}".

STRICT:
- Return ONLY JSON
- Each question must have 4 options
- Answer must be A/B/C/D

FORMAT:
[
  {
    "question": "string",
    "options": ["A. text", "B. text", "C. text", "D. text"],
    "answer": "A"
  }
]
`;

      const response = await generateQuiz(prompt, topic);
      const cleaned = extractJSON(response);
      const parsed = JSON.parse(cleaned);

      const valid = parsed.filter(
        (q) =>
          q.options &&
          q.options.length === 4 &&
          ["A", "B", "C", "D"].includes(q.answer)
      );

      if (valid.length === 0) {
        setError("Invalid quiz generated. Try again.");
      } else {
        setQuizData(valid);
      }
    } catch {
      setError("Failed to generate quiz.");
    }

    setLoading(false);
  };

  const handleSelect = (qIndex, option) => {
    if (submitted) return;

    setSelected((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const calculateScore = () => {
    let correct = 0;

    quizData.forEach((q, i) => {
      const selectedLetter = getOptionLetter(selected[i]);
      if (selectedLetter === q.answer) correct++;
    });

    setScore(correct);
    setSubmitted(true);
  };

  return (
    <div style={container}>
      <h2 style={title}>Quiz Generator</h2>

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
          placeholder="Enter topic..."
          style={input}
        />
        <button onClick={handleGenerate} style={button}>
          Generate
        </button>
      </div>

      {loading && <div style={loadingStyle}>Generating quiz...</div>}
      {error && <div style={errorStyle}>{error}</div>}

      {quizData.length > 0 && (
        <div style={quizWrapper}>
          {quizData.map((q, i) => (
            <div key={i} style={questionBox}>
              <h3>
                {i + 1}. {q.question}
              </h3>

              {q.options.map((opt, idx) => {
                const selectedLetter = getOptionLetter(selected[i]);
                const optionLetter = getOptionLetter(opt);

                const isSelected = selectedLetter === optionLetter;
                const isCorrect = q.answer === optionLetter;

                let bg = "#1e293b";

                if (submitted) {
                  if (isCorrect) bg = "#16a34a"; 
                  else if (isSelected && !isCorrect) bg = "#dc2626"; 
                } else {
                  if (isSelected) bg = "#2563eb"; 
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelect(i, opt)}
                    style={{
                      ...optionStyle,
                      background: bg,
                      cursor: submitted ? "default" : "pointer",
                      opacity:
                        submitted && !isSelected && !isCorrect ? 0.6 : 1,
                    }}
                  >
                    {opt}
                  </div>
                );
              })}

              {submitted && (
                <div style={correctText}>
                  ✔ Correct Answer: {q.answer}
                </div>
              )}
            </div>
          ))}

          {!submitted && (
            <button onClick={calculateScore} style={submitBtn}>
              Submit
            </button>
          )}

          {score !== null && (
            <div style={scoreBox}>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                🎯 Score: {score} / {quizData.length}
              </div>

              <div style={progressBar}>
                <div
                  style={{
                    ...progressFill,
                    width: `${(score / quizData.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default Quiz;

/* STYLES */

const container = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
};

const title = { marginBottom: "10px" };

const suggestionsBox = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "15px",
};

const chip = {
  padding: "6px 12px",
  background: "#1e293b",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "12px",
};

const inputWrapper = {
  display: "flex",
  gap: "10px",
  width: "100%",
  maxWidth: "600px",
};

const input = {
  flex: 1,
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#1e293b",
  color: "white",
};

const button = {
  padding: "12px 20px",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const loadingStyle = { marginTop: "20px" };

const errorStyle = { color: "red", marginTop: "10px" };

const quizWrapper = {
  marginTop: "20px",
  width: "100%",
  maxWidth: "800px",
  maxHeight: "65vh",
  overflowY: "auto",
};

const questionBox = {
  background: "#020617",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
};

const optionStyle = {
  padding: "10px",
  marginTop: "8px",
  borderRadius: "6px",
};

const correctText = {
  marginTop: "8px",
  fontSize: "14px",
  color: "#22c55e",
};

const submitBtn = {
  marginTop: "10px",
  padding: "12px",
  background: "#16a34a",
  border: "none",
  borderRadius: "8px",
  color: "white",
};

const scoreBox = {
  marginTop: "15px",
  padding: "15px",
  background: "#020617",
  borderRadius: "10px",
  textAlign: "center",
};

const progressBar = {
  marginTop: "10px",
  height: "10px",
  background: "#1e293b",
  borderRadius: "10px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  background: "#22c55e",
  transition: "width 0.5s ease",
};