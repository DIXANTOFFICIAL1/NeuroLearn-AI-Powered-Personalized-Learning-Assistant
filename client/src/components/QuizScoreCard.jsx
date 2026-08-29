function QuizScoreCard({ score, total, onRetry }) {
  if (score === null || !total) return null;

  const percentage = Math.round((score / total) * 100);

  let feedback = "Keep practicing! 💪";

  if (percentage >= 90) {
    feedback = "Excellent work! 🏆";
  } else if (percentage >= 70) {
    feedback = "Great job! 🌟";
  } else if (percentage >= 50) {
    feedback = "Good effort! 👍";
  }

  return (
    <div style={styles.container}>
      <div style={styles.heading}>🎯 Quiz Completed</div>

      <div style={styles.score}>
        {score} / {total}
      </div>

      <div style={styles.percentage}>
        {percentage}%
      </div>

      <div style={styles.feedback}>
        {feedback}
      </div>

      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${percentage}%`,
          }}
        />
      </div>

      <button
        type="button"
        onClick={onRetry}
        style={styles.retryButton}
      >
        Retry Quiz
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "15px",
    padding: "20px",
    background: "#0f172a",
    borderRadius: "12px",
    border: "1px solid #334155",
    textAlign: "center",
  },

  heading: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  score: {
    fontSize: "30px",
    fontWeight: "700",
    marginTop: "5px",
  },

  percentage: {
    marginTop: "4px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#22c55e",
  },

  feedback: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#cbd5f5",
  },

  progressTrack: {
    width: "100%",
    height: "10px",
    marginTop: "15px",
    background: "#1e293b",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#22c55e",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  retryButton: {
    marginTop: "15px",
    padding: "9px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default QuizScoreCard;
