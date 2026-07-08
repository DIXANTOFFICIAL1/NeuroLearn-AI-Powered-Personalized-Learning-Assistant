import { useState, useRef, useEffect } from "react";
import { sendMessageToAI } from "../services/api";
import ReactMarkdown from "react-markdown";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input; 
    const userMsg = { text: userInput, sender: "user" };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const prompt = `
You are a professional AI tutor.

Explain the topic clearly and naturally, like a good teacher.

Guidelines:
- Keep the tone natural and conversational (not robotic)
- Structure the answer neatly
- Use short paragraphs
- Use bullet points where helpful
- Avoid over-formatting
- Highlight important terms
- Keep it clean and readable

If the question is conceptual:
- Start with a simple explanation
- Then add key points
- Then give examples (if useful)

If the question is "how to":
- Give step-by-step explanation

User Question:
"${userInput}"
`;

      const reply = await sendMessageToAI(prompt, userInput);

      setMessages((prev) => [...prev, { text: reply, sender: "ai" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error getting response", sender: "ai" },
      ]);
    }

    setLoading(false);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div style={container}>
     
 <div style={header}>
  <div style={{ flex: 1 }} />

  <h1 style={{ ...title, textAlign: "center" }}>AI Tutor</h1>

  <div style={{ flex: 1, textAlign: "right" }}>
    <button onClick={clearChat} style={clearBtn}>
      Clear
    </button>
  </div>
</div>

      <div style={chatArea}>
        {messages.length === 0 && (
          <div style={empty}>
            <h3>Start chatting 🚀</h3>
            <p>Ask doubts, concepts, or anything</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                ...bubble,
                ...(msg.sender === "user" ? userBubble : aiBubble),
              }}
            >
              {msg.sender === "ai" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}

              {msg.sender === "ai" && (
                <div style={copyWrapper}>
                  <button
                    onClick={() => copyText(msg.text)}
                    style={copyBtn}
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={typingBox}>
            <span style={typingText}>AI is typing...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div style={inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything..."
          style={inputStyle}
        />

        <button onClick={handleSend} style={sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;

/* ================= STYLES ================= */

const container = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "#020617",
  color: "white",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 20px",
  borderBottom: "1px solid #1e293b",

  position: "sticky",   
  top: 0,               
  zIndex: 10,          
  background: "#020617" 
};

const title = {
  margin: 0,
  fontSize: "20px",
};

const clearBtn = {
  background: "#1e293b",
  border: "1px solid #334155",
  color: "#cbd5f5",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const chatArea = {
  flex: 1,
  overflowY: "auto",
  padding: "80px 20px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const empty = {
  textAlign: "center",
  marginTop: "80px",
  color: "#64748b",
};

const bubble = {
  padding: "12px 16px",
  borderRadius: "12px",
  maxWidth: "70%",
  lineHeight: "1.6",
  fontSize: "14px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
};

const userBubble = {
  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
};

const aiBubble = {
  background: "#1e293b",
  border: "1px solid #334155",
};

const copyWrapper = {
  marginTop: "6px",
  textAlign: "right",
};

const copyBtn = {
  fontSize: "11px",
  padding: "4px 10px",
  borderRadius: "999px",
  background: "#334155",
  color: "#cbd5f5",
  border: "none",
  cursor: "pointer",
};

const typingBox = {
  alignSelf: "flex-start",
  background: "#1e293b",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #334155",
};

const typingText = {
  color: "#94a3b8",
};

const inputBox = {
  display: "flex",
  padding: "15px",
  borderTop: "1px solid #1e293b",
};

const inputStyle = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #334155",
  outline: "none",
  background: "#0f172a",
  color: "white",
};

const sendBtn = {
  marginLeft: "10px",
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};