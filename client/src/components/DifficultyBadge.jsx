function DifficultyBadge({ difficulty = "Medium" }) {
  const style =
    difficulty === "Easy"
      ? { background: "#14532d", color: "#86efac" }
      : difficulty === "Hard"
      ? { background: "#7f1d1d", color: "#fca5a5" }
      : { background: "#78350f", color: "#fcd34d" };

  return (
    <span style={{ ...badge, ...style }}>
      {difficulty}
    </span>
  );
}

const badge = {
  display: "inline-block",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "10px",
  fontWeight: "600",
};

export default DifficultyBadge;