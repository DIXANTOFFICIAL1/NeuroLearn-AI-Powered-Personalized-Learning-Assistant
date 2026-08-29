function LoadingState({ message = "Loading..." }) {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <span style={styles.message}>{message}</span>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    padding: "10px",
  },

  spinner: {
    width: "18px",
    height: "18px",
    border: "3px solid #334155",
    borderTop: "3px solid #2563eb",
    borderRadius: "50%",
    animation: "neurolearn-spin 0.8s linear infinite",
  },

  message: {
    color: "#94a3b8",
    fontSize: "14px",
  },
};

export default LoadingState;
