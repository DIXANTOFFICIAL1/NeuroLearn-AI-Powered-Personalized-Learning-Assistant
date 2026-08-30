function InputClearButton({ onClick, visible }) {
  if (!visible) return null;

  return (
    <button onClick={onClick} style={button}>
      ✕
    </button>
  );
}

const button = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  border: "none",
  background: "transparent",
  color: "#94a3b8",
  cursor: "pointer",
  fontSize: "16px",
  padding: "2px",
};

export default InputClearButton;