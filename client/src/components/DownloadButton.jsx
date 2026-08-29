
function DownloadButton({
  content,
  filename = "download.txt",
  label = "Download",
}) {
  const handleDownload = () => {
    if (!content) return;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      style={styles.button}
      disabled={!content}
    >
      {label}
    </button>
  );
}

const styles = {
  button: {
    padding: "6px 12px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "6px",
    color: "#cbd5f5",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default DownloadButton;
