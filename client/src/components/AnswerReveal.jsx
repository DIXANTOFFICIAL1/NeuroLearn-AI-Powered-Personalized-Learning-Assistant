import { useState } from "react";

function AnswerReveal({ answer }) {
  const [show, setShow] = useState(false);

  return (
    <div style={box}>
      <button onClick={() => setShow(!show)} style={button}>
        {show ? "Hide Answer" : "Show Answer"}
      </button>

      {show && (
        <span style={answerStyle}>
          ✔ Correct Answer: {answer}
        </span>
      )}
    </div>
  );
}

const box = {
  marginTop: "8px",
};

const button = {
  padding: "6px 10px",
  border: "1px solid #334155",
  borderRadius: "6px",
  background: "#1e293b",
  color: "#cbd5e1",
  cursor: "pointer",
  fontSize: "11px",
};

const answerStyle = {
  marginLeft: "10px",
  color: "#22c55e",
  fontSize: "12px",
};

export default AnswerReveal;