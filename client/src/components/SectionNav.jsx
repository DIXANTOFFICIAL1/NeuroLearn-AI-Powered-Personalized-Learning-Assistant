function SectionNav() {
  const sections = [
    ["Beginner", "beginner"],
    ["Intermediate", "intermediate"],
    ["Advanced", "advanced"],
    ["Resources", "resources"],
  ];

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div style={nav}>
      {sections.map(([name, id]) => (
        <button key={id} onClick={() => jumpTo(id)} style={button}>
          {name}
        </button>
      ))}
    </div>
  );
}

const nav = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  margin: "10px 0",
};

const button = {
  padding: "6px 10px",
  border: "1px solid #334155",
  borderRadius: "6px",
  background: "#1e293b",
  color: "#cbd5e1",
  cursor: "pointer",
  fontSize: "11px",
};

export default SectionNav;