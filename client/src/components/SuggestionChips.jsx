function SuggestionChips({ suggestions, onSelect }) {
  return (
    <div style={styles.container}>
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(suggestion)}
          style={styles.chip}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "15px",
  },

  chip: {
    padding: "6px 12px",
    background: "#1e293b",
    color: "white",
    border: "1px solid #334155",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    transition: "0.2s",
  },
};

export default SuggestionChips;
