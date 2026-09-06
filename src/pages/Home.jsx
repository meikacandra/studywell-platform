import { Link } from "react-router-dom";

import studywellLogo from "../assets/STUDYWELL.png";
import homeImage from "../assets/home.png";

function Home() {
  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        {/* Logo */}
        <Link to="/" className="logo">
          <img
            src={studywellLogo}
            alt="StudyWell Logo"
            className="logo-image"
          />

          <span>StudyWell</span>
        </Link>

        {/* Navigation */}
        <div className="nav-links">
          <Link to="/how-it-works">
            How It Works
          </Link>

          <Link to="/features">
            Features
          </Link>

          <Link to="/">
            About Us
          </Link>
        </div>

        {/* Buttons */}
        <div className="nav-buttons">

          <Link to="/login" className="login-btn">
            Log In
          </Link>

          <Link to="/register" className="start-btn">
            Get Started
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}
      <section className="hero">

        {/* Left Side */}
        <div className="hero-content">

          <h1>
            Know what to{" "}
            <span className="blue-text">
              learn.
            </span>

            <br />

            Know when to{" "}
            <span className="green-text">
              rest.
            </span>
          </h1>

          <p>
            StudyWell membantu memahami kekuatan dan kelemahan
            belajarmu, mengelola stres, dan berkembang setiap hari.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">

            <Link to="/register">
              <button className="primary-button">
                Get Started
              </button>
            </Link>

            <Link to="/how-it-works">
              <button className="secondary-button">
                Learn More
                <span>›</span>
              </button>
            </Link>

          </div>

          {/* Benefits */}
          <div className="benefits">

            <span>Fokus</span>
            <span>Personalized</span>
            <span>Data Driven</span>
            <span>Privacy First</span>

          </div>

        </div>


        {/* Right Side - Student */}
        <div className="hero-image">

          <img
            src={homeImage}
            alt="Student studying"
          />

        </div>

      </section>


      {/* ================= ABOUT US ================= */}
      <section className="about" id="about">

        <h2>
          About StudyWell
        </h2>

        <p>
          StudyWell adalah platform pembelajaran yang membantu
          pelajar memahami kebutuhan belajar mereka, menemukan
          learning gap, dan menjaga keseimbangan antara belajar
          dan beristirahat.
        </p>

      </section>

    </div>
  );
}

export default Home;