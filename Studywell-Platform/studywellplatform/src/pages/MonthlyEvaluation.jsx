import { useState } from "react";
import { Link } from "react-router-dom";
import studywellLogo from "../assets/STUDYWELL.png";

const questions = [
  {
    category: "Aljabar Linear",
    question: "Jika 5x + 3 = 11, maka nilai dari 4x - 5 adalah...",
    options: ["1,6", "1,4", "2,1", "4,5"],
  },
  {
    category: "Aljabar Linear",
    question: "Jika 2x + 4 = 10, maka nilai x adalah...",
    options: ["2", "3", "4", "5"],
  },
  {
    category: "Aljabar Linear",
    question: "Hasil dari 3x + 2x adalah...",
    options: ["5x", "6x", "5", "x"],
  },
  {
    category: "Persamaan Kuadrat",
    question: "Bentuk sederhana dari x + x + x adalah...",
    options: ["x", "2x", "3x", "x³"],
  },
  {
    category: "Aljabar Linear",
    question: "Jika x = 4, maka 2x + 1 adalah...",
    options: ["7", "8", "9", "10"],
  },
];

function MonthlyEvaluation() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const totalQuestions = 20;
  const question = questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="monthly-evaluation-page">

      {/* NAVBAR */}
      <nav className="monthly-navbar">
        <Link to="/" className="monthly-logo">
          <img src={studywellLogo} alt="StudyWell" />
          <span>StudyWell</span>
        </Link>
      </nav>

      {/* TIMER */}
      <div className="monthly-timer">
        <span>Waktu Tersisa</span>
        <strong>05:22</strong>
      </div>

      {/* CONTENT */}
      <div className="monthly-layout">

        {/* SIDEBAR */}
        <aside className="monthly-sidebar">

          <h2>Evaluation</h2>

          <p>
            Soal {currentQuestion + 1} dari {totalQuestions}
          </p>

          <div className="monthly-question-grid">
            {Array.from(
              { length: totalQuestions },
              (_, index) => (
                <button
                  key={index}
                  className={`monthly-number ${
                    index === currentQuestion
                      ? "current"
                      : index < currentQuestion
                      ? "answered"
                      : ""
                  }`}
                  onClick={() => {
                    if (index < questions.length) {
                      setCurrentQuestion(index);
                      setSelectedAnswer(null);
                    }
                  }}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>

          {/* LEGEND */}
          <div className="monthly-legend">

            <div>
              <span className="dot green"></span>
              <span>Sudah Dijawab</span>
            </div>

            <div>
              <span className="dot yellow"></span>
              <span>Sedang Dikerjakan</span>
            </div>

            <div>
              <span className="dot white"></span>
              <span>Belum Dikerjakan</span>
            </div>

          </div>

        </aside>

        {/* MAIN */}
        <main className="monthly-main">

          {/* CATEGORY */}
          <div className="monthly-category">
            Kategori:{" "}
            <strong>{question.category}</strong>
          </div>

          {/* PROGRESS */}
          <div className="monthly-progress-row">

            <div className="monthly-progress">
              <div
                className="monthly-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>

            <span>{Math.round(progress)}%</span>

          </div>

          {/* QUESTION */}
          <h1 className="monthly-question">
            {question.question}
          </h1>

          {/* OPTIONS */}
          <div className="monthly-options">

            {question.options.map((option, index) => (
              <button
                key={index}
                className={`monthly-option ${
                  selectedAnswer === index
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                <span className="monthly-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>
            ))}

          </div>

          {/* BUTTON */}
          <div className="monthly-buttons">

            <button
              className="monthly-previous"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            <button
              className="monthly-next"
              onClick={handleNext}
            >
              {currentQuestion === questions.length - 1
                ? "Finish"
                : "Next"}
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}

export default MonthlyEvaluation;