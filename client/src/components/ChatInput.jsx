import { useState } from "react";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #1e293b" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything..."
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          marginLeft: "10px",
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;