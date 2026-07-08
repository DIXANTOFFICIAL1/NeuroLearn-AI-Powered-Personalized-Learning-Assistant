function MessageBubble({ text, type }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: type === "user" ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          maxWidth: "60%",
          padding: "12px",
          borderRadius: "12px",
          background: type === "user" ? "#2563eb" : "#1e293b",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;