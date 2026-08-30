import { useState, useRef, useEffect } from "react";
import { generateQuiz } from "../services/api";
import SuggestionChips from "../components/SuggestionChips";
import LoadingState from "../components/LoadingState";
import ErrorMessage from "../components/ErrorMessage";
import QuizScoreCard from "../components/QuizScoreCard";
import AnswerReveal from "../components/AnswerReveal";
import QuestionProgress from "../components/QuestionProgress";
import DifficultyBadge from "../components/DifficultyBadge";


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
    } catch (err) {
      console.error("Quiz generation failed:", err);
      setError("Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
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

      if (selectedLetter === q.answer) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelected({});
    setScore(null);
    setSubmitted(false);
    setError("");
    handleGenerate();
  };

  return (
    <div style={container}>
      <h2 style={title}>Quiz Generator</h2>

      {/* SUGGESTIONS */}
      <SuggestionChips
        suggestions={suggestions}
        onSelect={setTopic}
      />
  
  
   {/* INPUT */} 
<div style={inputWrapper}> 
  <input 
    value={topic} 
    onChange={(e) => setTopic(e.target.value)} 
    placeholder="Enter topic..." 
    style={input} 
    onKeyDown={(e) => { 
      if (e.key === "Enter") handleGenerate(); 
    }} 
  />

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            ...button,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <LoadingState message="Generating quiz..." />
      )}

      {/* ERROR */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={handleGenerate}
        />
      )}



   {/* QUIZ */}
{quizData.length > 0 && (
  <div style={quizWrapper}>
   {!submitted && (
  <QuestionProgress
    current={Object.keys(selected).length}
    total={quizData.length}
  />
)}

    {quizData.map((q, i) => (
      <div key={i} style={questionBox}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h3>
            {i + 1}. {q.question}
          </h3>



         <DifficultyBadge
            difficulty={
          i < 2 ? "Easy" : i < 4 ? "Medium" : "Hard"
                 }
            />
                  </div>

              {q.options.map((opt, idx) => {
                const selectedLetter = getOptionLetter(selected[i]);
                const optionLetter = getOptionLetter(opt);

                const isSelected =
                  selectedLetter === optionLetter;

                const isCorrect =
                  q.answer === optionLetter;

                let bg = "#1e293b";

                if (submitted) {
                  if (isCorrect) {
                    bg = "#16a34a";
                  } else if (isSelected) {
                    bg = "#dc2626";
                  }
                } else if (isSelected) {
                  bg = "#2563eb";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelect(i, opt)}
                    style={{
                      ...optionStyle,
                      background: bg,
                      cursor: submitted
                        ? "default"
                        : "pointer",
                      opacity:
                        submitted &&
                        !isSelected &&
                        !isCorrect
                          ? 0.6
                          : 1,
                    }}
                  >
                    {opt}
                  </div>
                );
              })}

              {submitted && <AnswerReveal answer={q.answer} />}
            </div>
          ))}

          {/* SUBMIT */}
          {!submitted && (
            <button
              onClick={calculateScore}
              style={submitBtn}
            >
              Submit
            </button>
          )}

          {/* SCORE COMPONENT */}
          <QuizScoreCard
            score={score}
            total={quizData.length}
            onRetry={handleRetry}
          />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

const container = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
};

const title = {
  marginBottom: "10px",
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

const submitBtn = {
  width: "100%",
  marginTop: "10px",
  padding: "12px",
  background: "#16a34a",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};

export default Quiz;



