import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    { name: "AI Tutor", path: "/" },
    { name: "Explain", path: "/explain" },
    { name: "Quiz", path: "/quiz" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "Career", path: "/career" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <div style={styles.sidebar}>
      
      {/* LOGO */}
      <div style={styles.logo}>
        <span style={styles.logoIcon}>🧠</span>
        <span style={styles.logoText}>NeuroLearn</span>
      </div>

      {/* MENU */}
      <div style={styles.menu}>
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.active : {}),
            })}
          >
            <div style={styles.card}>
              <span style={styles.icon}>⚡</span>
              <span>{item.name}</span>
            </div>
          </NavLink>
        ))}
      </div>

    </div>
  );
}

export default Sidebar;

const styles = {
  sidebar: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "20px 15px",
    background: "linear-gradient(180deg, #020617, #020617)",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
    padding: "10px",
  },

  logoIcon: {
    fontSize: "26px",
  },

  logoText: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#e2e8f0",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  link: {
    textDecoration: "none",
    color: "#94a3b8",
    borderRadius: "12px",
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.25s ease",
    background: "transparent",
  },

  icon: {
    fontSize: "16px",
  },

  active: {
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "white",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
  },
};