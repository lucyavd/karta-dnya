import React, { useState } from "react";
import { cards } from "./cards";

const cardBackSVG = (
  <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="180" rx="16" fill="url(#paint0_linear)"/>
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="120" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7F7FD5"/>
        <stop offset="0.5" stopColor="#86A8E7"/>
        <stop offset="1" stopColor="#91EAE4"/>
      </linearGradient>
    </defs>
    <circle cx="60" cy="90" r="38" fill="#fff" fillOpacity="0.15"/>
    <text x="60" y="100" textAnchor="middle" fontSize="32" fill="#fff" fontWeight="bold" fontFamily="Arial">?</text>
  </svg>
);

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
    <div style={{
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)",
      transition: "background 0.5s"
    }}>
      <style>{`
        @media (max-width: 600px) {
          .card-container, .card-result {
            padding: 16px !important;
            border-radius: 14px !important;
            max-width: 98vw !important;
            box-shadow: 0 2px 12px #7F7FD522 !important;
          }
          .card-svg {
            width: 70px !important;
            height: 105px !important;
            margin-bottom: 12px !important;
          }
          .card-number {
            width: 70px !important;
            height: 105px !important;
            font-size: 28px !important;
            border-radius: 12px !important;
          }
          .card-title {
            font-size: 20px !important;
            margin-top: 8px !important;
          }
          .card-desc {
            font-size: 14px !important;
          }
          .card-questions {
            font-size: 14px !important;
          }
          .consult-btn {
            font-size: 14px !important;
            padding: 10px 12px !important;
          }
        }
      `}</style>
      {step === 1 && (
        <div className="card-container" style={{ background: "rgba(255,255,255,0.85)", padding: 32, borderRadius: 24, boxShadow: "0 4px 24px #7F7FD533", maxWidth: 420, width: "100%", textAlign: "center", position: "relative" }}>
          <div className="card-svg" style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            {cardBackSVG}
          </div>
          <h2 className="card-title" style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 28, color: '#4f4f4f' }}>Карта дня</h2>
          <p style={{ color: '#555', fontSize: 17 }}>Сделайте вдох и выдох, расслабьтесь.<br/>Сформулируйте свой вопрос и введите число от 1 до 50.</p>
          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <input
              type="number"
              min={1}
              max={50}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ваше число"
              style={{ padding: 10, fontSize: 18, width: "100%", borderRadius: 10, border: "1.5px solid #7F7FD5", outline: "none", marginBottom: 8, boxSizing: "border-box" }}
            />
            {error && <div style={{ color: "#d7263d", marginTop: 8 }}>{error}</div>}
            <button type="submit" style={{ marginTop: 16, padding: "12px 32px", fontSize: 18, borderRadius: 10, background: "linear-gradient(90deg, #7F7FD5, #86A8E7)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, boxShadow: "0 2px 8px #7F7FD522" }}>
              Получить карту
            </button>
          </form>
        </div>
      )}
      {step === 2 && selectedCard && (
        <div className="card-result" style={{ background: "rgba(255,255,255,0.95)", padding: 36, borderRadius: 28, boxShadow: "0 6px 32px #7F7FD544", maxWidth: 440, width: "100%", textAlign: "center", position: "relative", animation: "fadeIn 0.7s" }}>
          <div className="card-number" style={{
            margin: "0 auto 18px auto",
            width: 120,
            height: 180,
            borderRadius: 16,
            boxShadow: "0 4px 16px #7F7FD522",
            background: "linear-gradient(135deg, #fff 60%, #e3eaff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            fontWeight: 700,
            color: "#7F7FD5",
            letterSpacing: 2,
            fontFamily: 'Georgia, serif',
            position: "relative"
          }}>
            <span style={{ fontSize: 44, fontWeight: 700, color: "#7F7FD5", fontFamily: 'Georgia, serif' }}>{selectedCard.number}</span>
          </div>
          <h2 className="card-title" style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 26, color: '#4f4f4f', marginTop: 12 }}>{selectedCard.title}</h2>
          <p className="card-desc" style={{ fontStyle: "italic", color: '#555', fontSize: 17, margin: '12px 0 18px 0' }}>{selectedCard.description}</p>
          <div style={{ margin: '18px 0 8px 0', fontWeight: 600, color: '#7F7FD5', fontSize: 17, letterSpacing: 0.2 }}>Вопросы для самостоятельного размышления:</div>
          <ul className="card-questions" style={{ marginTop: 10, textAlign: "left", paddingLeft: 0, listStyle: "none" }}>
            {selectedCard.questions.map((q, i) => (
              <li key={i} style={{ marginBottom: 10, background: "#f5f6fa", borderRadius: 8, padding: "8px 14px", color: "#333", fontSize: 16, boxShadow: "0 1px 4px #7F7FD511" }}>{q}</li>
            ))}
          </ul>
          <div style={{ marginTop: 22, color: '#888', fontSize: 15, background: '#f8fafd', borderRadius: 10, padding: '14px 16px', boxShadow: '0 1px 6px #7F7FD511', textAlign: 'left' }}>
            После ответа на вопросы <b>запиши 3 простых шага, которые ты сделаешь прямо сейчас для решения своей проблемы.</b><br/><br/>
            Ведь что поменяется, если этого не менять?.. <br/><br/>
            <span style={{ color: '#7F7FD5', fontWeight: 500 }}>Не получается до конца понять послание своего подсознания?<br/>
            Хочется решить свой запрос максимально эффективно?</span><br/><br/>
            Оставь заявку и мы вместе найдем лучшее решение
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              <a className="consult-btn" href="#consult" style={{
                padding: '12px 28px',
                background: 'linear-gradient(90deg, #7F7FD5, #86A8E7)',
                color: '#fff',
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 16,
                textDecoration: 'none',
                boxShadow: '0 2px 8px #7F7FD522',
                transition: 'background 0.2s',
                border: 'none',
                cursor: 'pointer'
              }}>Записаться на консультацию</a>
            </div>
          </div>
          <button onClick={handleRestart} style={{ marginTop: 28, padding: "10px 28px", fontSize: 16, borderRadius: 10, background: "#eee", border: "none", cursor: "pointer", fontWeight: 500, color: "#7F7FD5", boxShadow: "0 2px 8px #7F7FD511" }}>
            Попробовать ещё раз
          </button>
        </div>
      )}
    </div>
  );
}

export default App; 
