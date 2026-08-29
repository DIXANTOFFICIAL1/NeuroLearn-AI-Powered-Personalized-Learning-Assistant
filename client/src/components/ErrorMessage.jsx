function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <span style={styles.icon}>⚠️</span>

        <div style={styles.textArea}>
          <div style={styles.message}>{message}</div>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              style={styles.retryButton}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "800px",
    marginTop: "15px",
  },

  content: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    borderRadius: "10px",
    background: "#3f1d1d",
    border: "1px solid #7f1d1d",
    color: "#fecaca",
  },

  icon: {
    fontSize: "18px",
    flexShrink: 0,
  },

  textArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    width: "100%",
  },

  message: {
    fontSize: "14px",
    lineHeight: "1.4",
  },

  retryButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #ef4444",
    background: "transparent",
    color: "#fca5a5",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    flexShrink: 0,
  },
};

export default ErrorMessage;
