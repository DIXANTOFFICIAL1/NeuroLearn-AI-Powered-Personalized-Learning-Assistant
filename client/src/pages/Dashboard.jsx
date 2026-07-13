import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStats } from "../services/api";

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

  const [loading, setLoading] = useState(false);


  const [refreshKey, setRefreshKey] = useState(0);

  const fetchStats = async () => {
    setLoading(true);

    const data = await getStats();

    if (data) {
      setStats({
        aiTutor: data.aiTutor || 0,
        explain: data.explain || 0,
        quiz: data.quiz || 0,
        roadmap: data.roadmap || 0,
        career: data.career || 0,
        activity: [...(data.activity || [])], 
      });

      setRefreshKey((prev) => prev + 1); 
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

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
        stats.career * 2) / 2
    )
  );


  const getTips = () => {
    const tips = [];

    if (stats.quiz === 0) {
      tips.push("Start taking quizzes to test your understanding");
    } else if (stats.quiz < 3) {
      tips.push("Practice more quizzes to improve retention");
    }

    if (stats.explain < 2) {
      tips.push("Focus on understanding concepts deeply");
    }

    if (stats.aiTutor < 2) {
      tips.push("Ask more doubts to strengthen clarity");
    }

    if (stats.roadmap === 0) {
      tips.push("Explore roadmap to structure your learning");
    }

    if (stats.career === 0) {
      tips.push("Check career guidance to set your direction");
    }

    if (tips.length === 0) {
      return [
        "You're doing great 🚀",
        "Stay consistent and keep building",
        "Start working on real-world projects",
      ];
    }

    return tips;
  };

  return (
    <div style={container}>
     
      <div style={cardGrid}>
        <StatCard title="AI Tutor" value={stats.aiTutor} color="#2563eb" />
        <StatCard title="Explain" value={stats.explain} color="#16a34a" />
        <StatCard title="Quiz" value={stats.quiz} color="#f59e0b" />
        <StatCard title="Roadmap" value={stats.roadmap} color="#ec4899" />
        <StatCard title="Career" value={stats.career} color="#8b5cf6" />
      </div>

      <div style={section}>
        <h3>📈 Learning Progress</h3>

        <div style={progressWrapper}>
          <div style={progressBox}>
            <div
              style={{
                ...progressFill,
                width: `${progress}%`,
              }}
            />
          </div>
          <span style={progressText}>{progress}%</span>
        </div>

        <p style={subText}>Based on your activity</p>
      </div>

      <div style={section}>
        <h3>⚡ Quick Actions</h3>

        <div style={actionGrid}>
          <ActionCard title="AI Tutor" onClick={() => navigate("/")} />
          <ActionCard title="Explain" onClick={() => navigate("/explain")} />
          <ActionCard title="Quiz" onClick={() => navigate("/quiz")} />
          <ActionCard title="Roadmap" onClick={() => navigate("/roadmap")} />
          <ActionCard title="Career" onClick={() => navigate("/career")} />
        </div>
      </div>

      <div style={section}>
        <h3>🧠 AI Tips</h3>

        <div style={tipBox}>
          {getTips().map((tip, i) => (
            <div key={i} style={tipItem}>
              💡 {tip}
            </div>
          ))}
        </div>
      </div>

      <div style={section}>
        <h3>📌 Recent Activity</h3>

        <div style={activityBox} key={refreshKey}>
          {stats.activity && stats.activity.length > 0 ? (
            stats.activity.map((item, i) => (
              <p key={i} style={activityItem}>
                ✔ {item.length > 60 ? item.slice(0, 60) + "..." : item}
              </p>
            ))
          ) : (
            <p style={{ color: "#94a3b8" }}>No activity yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

/* ================= COMPONENTS ================= */

function StatCard({ title, value, color }) {
  return (
    <div style={{ ...statCard, borderTop: `3px solid ${color}` }}>
      <h4 style={{ margin: 0 }}>{title}</h4>
      <h1 style={statNumber}>{value}</h1>
    </div>
  );
}

function ActionCard({ title, onClick }) {
  return (
    <div onClick={onClick} style={actionCard}>
      {title}
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "25px",
  height: "100vh",
  overflowY: "auto",
  background: "#020617",
  color: "white",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const rightHeader = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const status = {
  color: "#22c55e",
  fontSize: "13px",
};

const refreshBtn = {
  padding: "6px 12px",
  background: "#2563eb",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
};

const subText = {
  color: "#94a3b8",
  marginTop: "5px",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "12px",
};

const statCard = {
  background: "#1e293b",
  padding: "16px",
  borderRadius: "12px",
  textAlign: "center",
};

const statNumber = {
  fontSize: "28px",
  marginTop: "6px",
};

const section = {
  marginTop: "30px",
};

const progressWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const progressBox = {
  flex: 1,
  height: "10px",
  background: "#1e293b",
  borderRadius: "10px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  background: "#2563eb",
};

const progressText = {
  fontWeight: "bold",
};

const actionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "10px",
};

const actionCard = {
  background: "#1e293b",
  padding: "14px",
  borderRadius: "10px",
  textAlign: "center",
  cursor: "pointer",
};

const tipBox = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px",
};

const tipItem = {
  marginBottom: "6px",
};

const activityBox = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px",
};

const activityItem = {
  marginBottom: "6px",
};
