function PageHeader({ title, subtitle = "" }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{title}</h2>

      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: 0,
    color: "#94a3b8",
    fontSize: "14px",
  },
};

export default PageHeader;
