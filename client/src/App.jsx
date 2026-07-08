import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Chat from "./pages/Chat";
import Explain from "./pages/Explain";
import Quiz from "./pages/Quiz";
import Roadmap from "./pages/Roadmap";
import Career from "./pages/Career";
import Dashboard from "./pages/Dashboard";

function Layout() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "AI Tutor";
      case "/explain":
        return "Explain Concepts";
      case "/quiz":
        return "Quiz Generator";
      case "/roadmap":
        return "Learning Roadmap";
      case "/career":
        return "Career Guidance";
      case "/dashboard":
        return "Dashboard";
      default:
        return "NeuroLearn";
    }
  };

  return (
    <div style={styles.app}>
      
      <div style={styles.sidebar}>
        <Sidebar />
      </div>

      <div style={styles.main}>
        
        <div style={styles.header}>
          <h2 style={styles.title}>{getTitle()}</h2>

          <div style={styles.status}>
            <span style={styles.dot}></span>
            <span>AI Online</span>
          </div>
        </div>

        <div style={styles.page}>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/explain" element={<Explain />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/career" element={<Career />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;


/* STYLES */
const styles = {
  app: {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: "#020617",
  },

  sidebar: {
    width: "240px",
    minWidth: "240px",
    background: "#020617",
    borderRight: "1px solid #1e293b",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 25px",
    borderBottom: "1px solid #1e293b",
    background: "#020617",
  },

  title: {
    color: "#e2e8f0",
    fontSize: "20px",
  },

  status: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#94a3b8",
    fontSize: "13px",
  },

  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  page: {
    flex: 1,
    overflow: "hidden", 
    display: "flex",
    flexDirection: "column",
  },
};