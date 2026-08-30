function QuestionProgress({ current, total }) {
  return (
    <div style={box}>
      <span>
        Question {current} of {total}
      </span>

      <div style={track}>
        <div
          style={{
            ...fill,
            width: `${(current / total) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

const box = {
  marginBottom: "12px",
  color: "#94a3b8",
  fontSize: "12px",
};

const track = {
  height: "5px",
  marginTop: "6px",
  background: "#1e293b",
  borderRadius: "10px",
  overflow: "hidden",
};

const fill = {
  height: "100%",
  background: "#2563eb",
  transition: "width 0.3s ease",
};

export default QuestionProgress;