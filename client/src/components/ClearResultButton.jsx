function ClearResultButton({ onClick }) {
  return (
    <button onClick={onClick} style={button}>
      🗑 Clear
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
  fontSize: "11px",
};

export default ClearResultButton;