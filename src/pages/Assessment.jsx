import { useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();

  return (
    <div className="assessment-page">

      <div className="auth-topbar">
        <button onClick={() => navigate("/")}>‹</button>
      </div>

      <div className="assessment-content">

        <h1>Assessment</h1>

        <p>
          Complete your assessment to understand your learning needs.
        </p>

        <div className="assessment-placeholder">
          <h2>Assessment</h2>
          <p>
            Soal assessment akan ditambahkan nanti.
          </p>

          <button
            className="auth-button"
            onClick={() => navigate("/study-mapping")}
          >
            Continue
          </button>
        </div>

      </div>

    </div>
  );
}

export default Assessment;