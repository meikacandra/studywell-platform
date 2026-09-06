import { useNavigate } from "react-router-dom";

function StudyMapping() {
  const navigate = useNavigate();

  return (
    <div className="study-mapping-page">

      <div className="auth-topbar">
        <button onClick={() => navigate("/")}>‹</button>
      </div>

      <div className="mapping-content">

        <h1>Study Mapping</h1>

        <p>
          See your learning progress and identify what you need to learn.
        </p>

        <div className="mapping-placeholder">
          <h2>Your Learning Map</h2>

          <p>
            Learning map akan ditampilkan di sini setelah assessment.
          </p>

          <button
            className="auth-button"
            onClick={() => navigate("/monthly-evaluation")}
          >
            Monthly Evaluation
          </button>
        </div>

      </div>

    </div>
  );
}

export default StudyMapping;