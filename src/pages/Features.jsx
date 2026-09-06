import { Link } from "react-router-dom";
import studywellLogo from "../assets/STUDYWELL.png";
import featureImage from "../assets/feature.png";

function Features() {
  const features = [
    {
      title: "Pemetaan Materi",
      text: "Pemetaan materi yang akan dikuasai sesuai dengan yang perlu diperkuat.",
      icon: 1
    },
    {
      title: "Rekomendasi Personal",
      text: "Rencana belajar yang disesuaikan dengan level dan kondisi dirimu.",
      icon: 2
    },
    {
      title: "Prediksi Risiko Burnout",
      text: "Prediksi risiko burnout melalui tingkat stres, durasi belajar, dan kebiasaan.",
      icon: 3
    },
    {
      title: "Monitoring Well-Being",
      text: "Pantauan dan evaluasi kondisi belajar melalui waktu ke waktu.",
      icon: 4
    },
    {
      title: "Evaluasi Berkala",
      text: "Hasil perkembangan yang dapat membantu melihat progres belajarmu.",
      icon: 5
    },
    {
      title: "Aman & Terpercaya",
      text: "Perlindungan data pengguna dan keamanan informasi.",
      icon: 6
    }
  ];

  return (
    <div className="page">

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

          <Link to="/how-it-works">
            How It Works
          </Link>

          <Link
            to="/features"
            className="active"
          >
            Features
          </Link>

          <Link to="/">
            About Us
          </Link>

        </div>


        <div className="nav-buttons">

          <Link
            to="/login"
            className="login-btn"
          >
            Log In
          </Link>

          <Link
            to="/register"
            className="start-btn"
          >
            Get Started
          </Link>

        </div>

      </nav>


      {/* FEATURES */}
      <section className="features-section">

        <h1>
          Features
        </h1>

        <p className="section-subtitle">
          Semua yang kamu butuhkan untuk belajar efektif
          <br />
          dan menjaga well-being.
        </p>


        <div className="features-grid">

          {features.map((feature) => (

            <div
              className="feature-card"
              key={feature.title}
            >

              {/* ICON */}
              <div
                className={`feature-icon feature-icon-${feature.icon}`}
              >

                <img
                  src={featureImage}
                  alt=""
                  className="feature-icon-image"
                />

              </div>


              {/* TEXT */}
              <div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>

              </div>

            </div>

          ))}

        </div>


        {/* BOTTOM */}
        <div className="feature-bottom">

          StudyWell hadir untuk membantu kamu belajar lebih efektif,
          seimbang, dan berkelanjutan.

        </div>

      </section>

    </div>
  );
}

export default Features;