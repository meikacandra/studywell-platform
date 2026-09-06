import { useNavigate } from "react-router-dom";

function MonthlyEvaluation() {
  const navigate = useNavigate();

  return (
    <div className="monthly-evaluation-page">

      <div className="auth-topbar">
        <button onClick={() => navigate("/")}>‹</button>
      </div>

      <div className="evaluation-content">

        <h1>Monthly Evaluation</h1>

        <p>
          Review your learning progress and study condition every month.
        </p>

        <div className="evaluation-placeholder">
          <h2>Monthly Evaluation</h2>

          <p>
            Monthly evaluation akan ditampilkan di sini.
          </p>

          <button
            className="auth-button"
            onClick={() => navigate("/study-mapping")}
          >
            Back to Study Mapping
          </button>
        </div>

      </div>

    </div>
  );
}

export default MonthlyEvaluation;