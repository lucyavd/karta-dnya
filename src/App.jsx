import React, { useState } from "react";
import { cards } from "./cards";

function App() {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 1 || num > 50) {
      setError("Пожалуйста, введите число от 1 до 50");
      return;
    }
    setSelectedCard(cards[num - 1]);
    setStep(2);
  };

  const handleRestart = () => {
    setStep(1);
    setInput("");
    setSelectedCard(null);
    setError("");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f5f6fa" }}>
      {step === 1 && (
        <div style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 2px 8px #e1e1e1", maxWidth: 400, width: "100%" }}>
          <h2>Карта дня</h2>
          <p>Сделайте вдох и выдох, расслабьтесь.<br/>Сформулируйте свой вопрос и введите число от 1 до 50.</p>
          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <input
              type="number"
              min={1}
              max={50}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ваше число"
              style={{ padding: 8, fontSize: 16, width: "100%", borderRadius: 8, border: "1px solid #ccc" }}
            />
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            <button type="submit" style={{ marginTop: 16, padding: "10px 24px", fontSize: 16, borderRadius: 8, background: "#4f8cff", color: "#fff", border: "none", cursor: "pointer" }}>
              Получить карту
            </button>
          </form>
        </div>
      )}
      {step === 2 && selectedCard && (
        <div style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 2px 8px #e1e1e1", maxWidth: 400, width: "100%" }}>
          <h2>{selectedCard.title}</h2>
          <p style={{ fontStyle: "italic" }}>{selectedCard.description}</p>
          <ul style={{ marginTop: 16 }}>
            {selectedCard.questions.map((q, i) => (
              <li key={i} style={{ marginBottom: 8 }}>{q}</li>
            ))}
          </ul>
          <button onClick={handleRestart} style={{ marginTop: 24, padding: "8px 20px", fontSize: 15, borderRadius: 8, background: "#eee", border: "none", cursor: "pointer" }}>
            Попробовать ещё раз
          </button>
        </div>
      )}
    </div>
  );
}

export default App; 