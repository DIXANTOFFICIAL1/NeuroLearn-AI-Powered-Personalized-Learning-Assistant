function RegenerateButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={button}
    >
      {loading ? "Generating..." : "🔄 Regenerate"}
    </button>
  );
}

const button = {
  padding: "7px 12px",
  border: "none",
  borderRadius: "7px",
  background: "#1e293b",
  color: "#cbd5e1",
  cursor: "pointer",
  fontSize: "12px",
};

export default RegenerateButton;