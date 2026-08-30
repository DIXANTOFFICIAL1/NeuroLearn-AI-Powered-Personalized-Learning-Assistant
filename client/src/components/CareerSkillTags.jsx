function CareerSkillTags({ role }) {
  const skills = {
    "Software Engineer": ["Programming", "DSA", "Git", "System Design"],
    "Frontend Developer": ["HTML", "CSS", "JavaScript", "React"],
    "Backend Developer": ["Node.js", "APIs", "Databases", "System Design"],
    "Data Scientist": ["Python", "Statistics", "Pandas", "Machine Learning"],
    "Machine Learning Engineer": [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "Data",
    ],
    "DevOps Engineer": ["Linux", "Docker", "Cloud", "CI/CD"],
    "Cyber Security": ["Networking", "Linux", "Cryptography", "Security"],
    "Android Developer": ["Kotlin", "Android", "APIs", "UI"],
  };

  const tags = skills[role] || ["Programming", "Problem Solving", "Tools"];

  return (
    <div style={box}>
      {tags.map((skill) => (
        <span key={skill} style={tag}>
          {skill}
        </span>
      ))}
    </div>
  );
}

const box = {
  display: "flex",
  flexWrap: "wrap",
  gap: "7px",
  margin: "10px 0",
};

const tag = {
  padding: "5px 9px",
  borderRadius: "15px",
  background: "#1e293b",
  color: "#cbd5e1",
  border: "1px solid #334155",
  fontSize: "10px",
};

export default CareerSkillTags;