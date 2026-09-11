import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hourglass, CheckCircle2 } from "lucide-react";
import { mockMonthlyEvaluationQuestions } from "../data/assessmentData";
import "./MonthlyEvaluation.css";

const MonthlyEvaluation = () => {
  const navigate = useNavigate();

  const questions = mockMonthlyEvaluationQuestions;
  const [currentIndex, setCurrentIndex] = useState(4); // Default index 4 = Soal 5
  const [userAnswers, setUserAnswers] = useState({ 1: "B", 2: "A", 3: "A", 4: "B" });
  const [timeLeft, setTimeLeft] = useState(322); // 05:22 in seconds
  const [isCompleted, setIsCompleted] = useState(false);

  // Active Timer Countdown
  useEffect(() => {
    if (timeLeft <= 0 || isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isCompleted]);

  // Format Time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getButtonStatusClass = (questionId, index) => {
    if (index === currentIndex) return "btn-active";
    if (userAnswers[questionId]) return "btn-answered";
    return "btn-unanswered";
  };

  return (
    <div className="evaluation-wrapper">
      {/* Top Header Bar */}
      <header className="evaluation-topbar">
        <div className="topbar-logo-box" onClick={() => navigate("/dashboard")}>
          <div className="logo-icon-bg">
            <Hourglass size={18} className="hourglass-icon" />
          </div>
          <span className="topbar-brand">StudyWell</span>
        </div>

        <div className="timer-badge-box">
          <span className="timer-label">Waktu Tersisa</span>
          <span className="timer-value">{formatTime(timeLeft)}</span>
        </div>
      </header>

      {/* Main Workspace Layout (Sidebar + Evaluation Quiz Area) */}
      <main className="evaluation-main-content">
        {/* Left Sidebar Navigator */}
        <aside className="quiz-sidebar">
          <div className="sidebar-header-box">
            <h2 className="sidebar-title">Evaluation</h2>
            <p className="sidebar-subtitle">
              Soal {currentIndex + 1} dari {totalQuestions}
            </p>
          </div>

          {/* Question Grid 1 - 20 */}
          <div className="question-number-grid">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`number-btn ${getButtonStatusClass(q.id, idx)}`}
              >
                {q.number}
              </button>
            ))}
          </div>

          {/* Status Legend */}
          <div className="sidebar-legend-box">
            <div className="legend-row">
              <span className="status-dot dot-green" />
              <span className="legend-text">Sudah Dijawab</span>
            </div>
            <div className="legend-row">
              <span className="status-dot dot-yellow" />
              <span className="legend-text">Sedang Dijawab</span>
            </div>
            <div className="legend-row">
              <span className="status-dot dot-gray" />
              <span className="legend-text">Belum Dikerjakan</span>
            </div>
          </div>
        </aside>

        {/* Main Quiz Area */}
        <section className="quiz-content-area">
          <div className="quiz-content-card">
            {/* Category & Progress */}
            <div className="quiz-meta-row">
              <span className="category-tag">Kategori: <strong>{currentQuestion.category}</strong></span>

              <div className="progress-bar-wrapper">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="progress-text">{progressPercent}%</span>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="question-text">{currentQuestion.questionText}</h3>

            {/* Multiple Choice Options */}
            <div className="options-list">
              {currentQuestion.options.map((opt) => {
                const isSelected = userAnswers[currentQuestion.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`option-card ${isSelected ? "option-selected" : ""}`}
                  >
                    <span className="option-badge">{opt.id}</span>
                    <span className="option-text">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="quiz-action-footer">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="quiz-btn btn-secondary"
              >
                Previous
              </button>

              <button onClick={handleNext} className="quiz-btn btn-primary">
                {currentIndex === totalQuestions - 1 ? "Selesai" : "Next"}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Completion Modal */}
      {isCompleted && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icon-circle">
              <CheckCircle2 size={36} className="text-green" />
            </div>
            <h2>Evaluasi Bulanan Selesai!</h2>
            <p>
              Hasil evaluasi perkembangan belajarmu bulan ini telah diperbarui di sistem.
            </p>
            <button onClick={() => navigate("/study-mapping")} className="quiz-btn btn-primary full-width">
              Lihat Peta Belajar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyEvaluation;