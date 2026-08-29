import { useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("COPY ERROR:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      style={{
        ...styles.button,
        ...(copied ? styles.copied : {}),
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

const styles = {
  button: {
    padding: "6px 12px",
    borderRadius: "6px",
    background: "#334155",
    color: "#cbd5f5",
    border: "1px solid #475569",
    cursor: "pointer",
    fontSize: "12px",
    transition: "all 0.2s ease",
  },

  copied: {
    background: "#16a34a",
    color: "white",
    borderColor: "#16a34a",
  },
};

export default CopyButton;
