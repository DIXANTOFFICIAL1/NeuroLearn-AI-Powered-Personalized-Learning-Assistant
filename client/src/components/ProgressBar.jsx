function ProgressBar({ value = 0, label = "", showPercentage = true }) {
  const percentage = Math.min(100, Math.max(0, Number(value) || 0));

  return (
    <div style={styles.container}>
      {(label || showPercentage) && (
        <div style={styles.header}>
          {label && <span>{label}</span>}

          {showPercentage && (
            <span style={styles.percentage}>{percentage}%</span>
          )}
        </div>
      )}

      <div style={styles.track}>
        <div
          style={{
            ...styles.fill,
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    fontSize: "13px",
  },

  percentage: {
    fontWeight: "600",
    color: "#cbd5f5",
  },

  track: {
    width: "100%",
    height: "10px",
    background: "#1e293b",
    borderRadius: "10px",
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    background: "#2563eb",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },
};

export default ProgressBar;
