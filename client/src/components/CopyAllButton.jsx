import { useState } from "react";

function CopyAllButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={handleCopy} style={button}>
      {copied ? "✓ Copied" : "📋 Copy Guide"}
    </button>
  );
}

const button = {
  padding: "7px 12px",
  background: "#1e293b",
  border: "none",
  borderRadius: "6px",
  color: "#cbd5e1",
  cursor: "pointer",
  fontSize: "11px",
};

export default CopyAllButton;