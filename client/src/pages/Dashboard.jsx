import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStats } from "../services/api";
import ProgressBar from "../components/ProgressBar";
import LoadingState from "../components/LoadingState";
import ConfirmDialog from "../components/ConfirmDialog";

const modules = [
  ["🤖", "AI Tutor", "/", "#2563eb", "aiTutor"],
  ["💡", "Explain", "/explain", "#16a34a", "explain"],
  ["📝", "Quiz", "/quiz", "#f59e0b", "quiz"],
  ["🗺️", "Roadmap", "/roadmap", "#ec4899", "roadmap"],
  ["💼", "Career", "/career", "#8b5cf6", "career"],
];

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    aiTutor: 0,
    explain: 0,
    quiz: 0,
    roadmap: 0,
    career: 0,
    activity: [],
  });

  const [loading, setLoading] = useState(true);
  const [showReset, setShowReset] = useState(false);

  const fetchStats = async () => {
    setLoading(true);

    try {
      const data = await getStats();

      if (data) {
        setStats({
          aiTutor: data.aiTutor || 0,
          explain: data.explain || 0,
          quiz: data.quiz || 0,
          roadmap: data.roadmap || 0,
          career: data.career || 0,
          activity: data.activity || [],
        });
      }
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const resetData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/stats/reset",
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Reset failed");
      }

      setShowReset(false);
      await fetchStats();
    } catch (error) {
      console.error("Reset failed:", error);
    }
  };

  const total =
    stats.aiTutor +
    stats.explain +
    stats.quiz +
    stats.roadmap +
    stats.career;

  const progress = Math.min(
    100,
    Math.round(
      (stats.aiTutor * 2 +
        stats.explain * 3 +
        stats.quiz * 5 +
        stats.roadmap * 4 +
        stats.career * 2) /
        2
    )
  );

  const tips = [];

  if (stats.quiz === 0) {
    tips.push("Take a quiz to test your understanding.");
  } else if (stats.quiz < 3) {
    tips.push("Practice more quizzes to improve retention.");
  }

  if (stats.explain < 2) {
    tips.push("Use Explain to understand difficult concepts.");
  }

  if (stats.aiTutor < 2) {
    tips.push("Ask the AI Tutor whenever you get stuck.");
  }

  if (stats.roadmap === 0) {
    tips.push("Generate a roadmap to structure your learning.");
  }

  if (stats.career === 0) {
    tips.push("Explore Career Guidance to plan your direction.");
  }

  if (!tips.length) {
    tips.push(
      "You're doing great 🚀",
      "Stay consistent with your learning.",
      "Keep building real-world projects."
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <span style={styles.overline}>NEUROLEARN</span>

          <h2 style={styles.title}>
            Learning Dashboard
          </h2>

          <p style={styles.muted}>
            Track your learning activity and progress.
          </p>
        </div>

        <button
          onClick={() => setShowReset(true)}
          style={styles.resetButton}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#1d4ed8")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#2563eb")
          }
        >
          Reset
        </button>
      </header>

      <div style={styles.summary}>
        <div>
          <span style={styles.label}>
            TOTAL INTERACTIONS
          </span>

          <strong style={styles.total}>
            {total}
          </strong>

          <p style={styles.muted}>
            Across all modules
          </p>
        </div>

        <div style={styles.progressInfo}>
          <strong>{progress}%</strong>
          <span>Progress</span>
        </div>
      </div>

      <h3 style={styles.heading}>
        Your Modules
      </h3>

      <div style={styles.moduleGrid}>
        {modules.map(([icon, name, path, color, key]) => (
          <button
            key={name}
            onClick={() => navigate(path)}
            style={{
              ...styles.module,
              borderTop: `3px solid ${color}`,
            }}
          >
            <div style={styles.moduleTop}>
              <span style={styles.icon}>
                {icon}
              </span>

              <strong style={{ color }}>
                {stats[key]}
              </strong>
            </div>

            <strong>{name}</strong>

            <small style={styles.small}>
              {name === "AI Tutor"
                ? "Ask questions"
                : name === "Explain"
                ? "Understand concepts"
                : name === "Quiz"
                ? "Test knowledge"
                : name === "Roadmap"
                ? "Plan learning"
                : "Explore careers"}
            </small>

            <span style={styles.open}>
              Open →
            </span>
          </button>
        ))}
      </div>

      <div style={styles.progressHead}>
        <div>
          <h3 style={styles.heading}>
            📈 Learning Progress
          </h3>

          <p style={styles.muted}>
            Based on your activity.
          </p>
        </div>

        <strong style={styles.percent}>
          {progress}%
        </strong>
      </div>

      <div style={styles.progressCard}>
        <ProgressBar
          value={progress}
          showPercentage={false}
        />
      </div>

      <div style={styles.bottom}>
        <section style={styles.panel}>
          <h3 style={styles.heading}>
            🧠 AI Tips
          </h3>

          <p style={styles.muted}>
            Suggestions based on your activity.
          </p>

          <div style={styles.list}>
            {tips.map((tip, i) => (
              <div key={i} style={styles.item}>
                💡 {tip}
              </div>
            ))}
          </div>
        </section>

        <section style={styles.panel}>
          <div style={styles.activityHead}>
            <div>
              <h3 style={styles.heading}>
                📌 Recent Activity
              </h3>

              <p style={styles.muted}>
                Your latest learning actions.
              </p>
            </div>

            <span style={styles.badge}>
              {stats.activity.length}
            </span>
          </div>

          <div style={styles.activityList}>
            {loading ? (
              <LoadingState message="Loading activity..." />
            ) : stats.activity.length ? (
              stats.activity.map((item, i) => (
                <div
                  key={i}
                  style={styles.item}
                >
                  <span style={styles.check}>
                    ✔
                  </span>

                  {item.length > 70
                    ? `${item.slice(0, 70)}...`
                    : item}
                </div>
              ))
            ) : (
              <div style={styles.empty}>
                📚
                <p style={styles.muted}>
                  No activity yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={showReset}
        onCancel={() => setShowReset(false)}
        onConfirm={resetData}
      />
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100%",
    padding: "20px",
    boxSizing: "border-box",
    overflowY: "auto",
    overflowX: "hidden",
    background: "#020617",
    color: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  resetButton: {
    padding: "9px 16px",
    border: "1px solid #3b82f6",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    boxShadow:
      "0 3px 10px rgba(37, 99, 235, 0.25)",
  },

  overline: {
    color: "#64748b",
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: "700",
  },

  title: {
    margin: "4px 0",
    fontSize: "25px",
  },

  heading: {
    margin: 0,
    fontSize: "16px",
  },

  muted: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "12px",
  },

  summary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px",
    marginBottom: "22px",
    background: "#1e293b",
    borderRadius: "12px",
  },

  label: {
    color: "#64748b",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  total: {
    display: "block",
    margin: "3px 0",
    fontSize: "32px",
  },

  progressInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    color: "#60a5fa",
    fontSize: "19px",
  },

  moduleGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginTop: "10px",
  },

  module: {
    padding: "14px",
    background: "#1e293b",
    color: "#fff",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "none",
    borderRadius: "10px",
    textAlign: "left",
    cursor: "pointer",
  },

  moduleTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "9px",
  },

  icon: {
    fontSize: "20px",
  },

  small: {
    display: "block",
    marginTop: "4px",
    color: "#94a3b8",
    fontSize: "10px",
  },

  open: {
    display: "block",
    marginTop: "9px",
    color: "#60a5fa",
    fontSize: "10px",
    fontWeight: "600",
  },

  progressHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "25px",
    marginBottom: "9px",
  },

  percent: {
    color: "#60a5fa",
    fontSize: "19px",
  },

  progressCard: {
    padding: "14px",
    background: "#1e293b",
    borderRadius: "9px",
  },

  bottom: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    alignItems: "start",
    marginTop: "24px",
  },

  panel: {
    padding: "15px",
    background: "#1e293b",
    borderRadius: "10px",
    minWidth: 0,
  },

  list: {
    marginTop: "10px",
  },

  item: {
    padding: "8px",
    marginBottom: "6px",
    background: "#020617",
    borderRadius: "7px",
    color: "#cbd5e1",
    fontSize: "11px",
    lineHeight: "1.4",
  },

  activityHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  badge: {
    padding: "4px 7px",
    background: "#020617",
    borderRadius: "15px",
    color: "#94a3b8",
    fontSize: "10px",
  },

  activityList: {
    maxHeight: "220px",
    overflowY: "auto",
    marginTop: "10px",
  },

  check: {
    color: "#22c55e",
    marginRight: "5px",
  },

  empty: {
    padding: "20px",
    textAlign: "center",
  },
};

export default Dashboard;
