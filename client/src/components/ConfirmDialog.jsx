function ConfirmDialog({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={dialog}>
        <h3>Reset learning progress?</h3>

        <p>
          Stats and recent activity will be cleared permanently.
        </p>

        <div style={actions}>
          <button onClick={onCancel} style={cancel}>
            Cancel
          </button>

          <button onClick={onConfirm} style={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.6)",
  zIndex: 1000,
};

const dialog = {
  width: "320px",
  padding: "20px",
  borderRadius: "10px",
  background: "#0f172a",
  border: "1px solid #334155",
  color: "white",
  boxSizing: "border-box",
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  marginTop: "18px",
};

const cancel = {
  padding: "7px 12px",
  border: "1px solid #334155",
  borderRadius: "6px",
  background: "#1e293b",
  color: "#cbd5e1",
  cursor: "pointer",
};

const reset = {
  padding: "7px 12px",
  border: "none",
  borderRadius: "6px",
  background: "#dc2626",
  color: "white",
  cursor: "pointer",
};

export default ConfirmDialog;