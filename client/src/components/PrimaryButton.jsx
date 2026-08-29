function PrimaryButton({ children, onClick, disabled = false, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles.button}
    >
      {children}
    </button>
  );
}

const styles = {
  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default PrimaryButton;
