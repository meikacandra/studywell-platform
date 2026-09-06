import { Link } from "react-router-dom";

import howItWorksImage from "../assets/How It work.png";
import targetIcon from "../assets/how it work 2.png";
import studywellLogo from "../assets/STUDYWELL.png";

function HowItWorks() {
  return (
    <div className="how-it-works">

      {/* NAVBAR */}
      <nav className="navbar">

        <Link to="/" className="logo">
  <img
    src={studywellLogo}
    alt="StudyWell"
  />
  <span>StudyWell</span>
</Link>

        <div className="nav-links">
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/features">Features</Link>
          <Link to="/">About Us</Link>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">
            Log In
          </Link>

          <Link to="/register" className="start-btn">
            Get Started
          </Link>
        </div>

      </nav>


      {/* MAIN */}
      <section className="how-section">

        <h1>How It Works</h1>

        <p className="how-subtitle">
          4 langkah sederhana untuk belajar lebih cerdas
          <br />
          dan seimbang setiap hari.
        </p>


        {/* FOUR ICONS */}
        <div className="four-icons">

          <img
            src={howItWorksImage}
            alt="StudyWell steps"
          />

        </div>


        {/* TEXT */}
        <div className="steps-text">

          <div className="step-text">
            <h3>Asesmen Awal</h3>
            <p>
              Kerjakan asesmen singkat untuk memetakan
              pemahaman dan menemukan learning gap-mu.
            </p>
          </div>

          <div className="step-text">
            <h3>Peta Belajarmu</h3>
            <p>
              Dapatkan peta materi yang dipersonalisasi
              sesuai kekuatan dan kelemahanmu.
            </p>
          </div>

          <div className="step-text">
            <h3>Cek Kondisimu</h3>
            <p>
              Jawab micro check-in untuk memantau stres,
              tidur, dan beban belajar.
            </p>
          </div>

          <div className="step-text">
            <h3>Rekomendasi</h3>
            <p>
              Terima rekomendasi durasi belajar dan istirahat
              yang paling pas untukmu hari ini.
            </p>
          </div>

        </div>


        {/* INFORMATION BOX */}
        <div className="how-info">

          <img
            src={targetIcon}
            alt="StudyWell goal"
            className="how-info-icon"
          />

          <div className="how-info-content">

            <h3>
              Belajar terarah, istirahat cukup, hasil meningkat.
            </h3>

            <p>
              StudyWell menyesuaikan rencana belajarmu agar kamu
              tetap produktif tanpa burnout.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default HowItWorks;