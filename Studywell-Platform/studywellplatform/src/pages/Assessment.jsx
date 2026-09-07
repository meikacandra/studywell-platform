import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    category: "Persamaan Kuadrat",
    question: "Jika x = 4, maka 2x + 1 adalah...",
    options: ["7", "8", "9", "10"],
  },
];

function Assessment() {
  const navigate = useNavigate();

  // Untuk sementara mulai dari soal nomor 5
  // supaya tampilannya sesuai dengan desain Figma
  const [currentQuestion, setCurrentQuestion] = useState(4);
  const [selectedAnswer, setSelectedAnswer] = useState(1);

  const question = questions[currentQuestion];

  // Karena desain menunjukkan 20 soal
  const totalQuestions = 20;

  const progress =
    ((currentQuestion + 1) / totalQuestions) * 100;

  const goNext = () => {
    // Kalau masih ada soal dummy
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Kalau sudah selesai soal dummy,
      // langsung lanjut ke halaman Peta Belajar
      navigate("/study-mapping");
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="learning-gap-page">

      {/* ================= NAVBAR ================= */}
      <header className="learning-gap-navbar">

        <Link to="/" className="learning-gap-logo">
          <img
            src={studywellLogo}
            alt="StudyWell"
          />

          <span>StudyWell</span>
        </Link>

      </header>


      {/* ================= CONTENT ================= */}
      <div className="learning-gap-layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="learning-gap-sidebar">

          <h2>Learning Gap</h2>

          <p>
            Soal {currentQuestion + 1} dari {totalQuestions}
          </p>


          {/* NOMOR SOAL */}
          <div className="learning-gap-numbers">

            {Array.from(
              { length: totalQuestions },
              (_, index) => {

                let status = "";

                // Nomor 1-4 dianggap sudah dijawab
                if (index < 4) {
                  status = "answered";
                }

                // Nomor yang sedang dikerjakan
                if (index === currentQuestion) {
                  status = "current";
                }

                return (
                  <button
                    key={index}
                    className={`gap-number ${status}`}
                    onClick={() => {

                      // Karena kita hanya punya 5 soal dummy,
                      // hanya soal 1-5 yang bisa dibuka
                      if (index < questions.length) {

                        setCurrentQuestion(index);

                        // soal nomor 5 menampilkan jawaban B
                        if (index === 4) {
                          setSelectedAnswer(1);
                        } else {
                          setSelectedAnswer(null);
                        }

                      }

                    }}
                  >
                    {index + 1}
                  </button>
                );

              }
            )}

          </div>


          {/* LEGEND */}
          <div className="learning-gap-legend">

            <div>
              <span className="legend-circle answered"></span>
              <span>Sudah Dijawab</span>
            </div>

            <div>
              <span className="legend-circle current"></span>
              <span>Sedang Dikerjakan</span>
            </div>

            <div>
              <span className="legend-circle not-started"></span>
              <span>Belum Dikerjakan</span>
            </div>

          </div>

        </aside>


        {/* ================= MAIN ================= */}
        <main className="learning-gap-main">

          {/* KATEGORI */}
          <div className="question-top">

            <p>
              Kategori:{" "}
              <strong>
                {question.category}
              </strong>
            </p>


            {/* PROGRESS */}
            <div className="progress-container">

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>

              </div>

              <span>
                {Math.round(progress)}%
              </span>

            </div>

          </div>


          {/* PERTANYAAN */}
          <h1>
            {question.question}
          </h1>


          {/* JAWABAN */}
          <div className="answer-container">

            {question.options.map(
              (option, index) => (

                <button
                  key={index}
                  className={`answer-button ${
                    selectedAnswer === index
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedAnswer(index)
                  }
                >

                  <span className="answer-letter">
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  <span className="answer-text">
                    {option}
                  </span>

                </button>

              )
            )}

          </div>


          {/* ================= BUTTON ================= */}
          <div className="question-navigation">

            <button
              className="previous-button"
              onClick={goPrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>


            <button
              className="next-button"
              onClick={goNext}
            >

              {currentQuestion === questions.length - 1
                ? "Finish Assessment"
                : "Next"}

            </button>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Assessment;