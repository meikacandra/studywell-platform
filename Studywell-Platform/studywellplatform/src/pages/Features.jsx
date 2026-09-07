import { Link } from "react-router-dom";
import studywellLogo from "../assets/STUDYWELL.png";
import featureImage from "../assets/feature.png";

function Features() {
  const features = [
    {
      title: "Pemetaan Materi",
      description:
        "Pemetaan materi yang akan dikuasai sesuai dengan yang perlu diperkuat.",
      icon: "feature-1",
    },
    {
      title: "Rekomendasi Personal",
      description:
        "Rencana belajar yang disesuaikan dengan level dan kondisi dirimu.",
      icon: "feature-2",
    },
    {
      title: "Prediksi Risiko Burnout",
      description:
        "Prediksi risiko burnout melalui tingkat stres, durasi belajar, dan kebiasaan.",
      icon: "feature-3",
    },
    {
      title: "Monitoring Well-Being",
      description:
        "Pantauan dan evaluasi kondisi belajar melalui waktu ke waktu.",
      icon: "feature-4",
    },
    {
      title: "Evaluasi Berkala",
      description:
        "Hasil perkembangan yang dapat membantu melihat progres belajarmu.",
      icon: "feature-5",
    },
    {
      title: "Aman & Terpercaya",
      description:
        "Perlindungan data pengguna dan keamanan informasi.",
      icon: "feature-6",
    },
  ];

  return (
    <div className="features-page">

      {/* NAVBAR */}
      <nav className="features-navbar">
        <Link to="/" className="features-brand">
          <img src={studywellLogo} alt="StudyWell" />
          <span>StudyWell</span>
        </Link>

        <div className="features-nav-menu">
          <Link to="/how-it-works">How It Works</Link>

          <Link to="/features" className="active-nav">
            Features
          </Link>

          <Link to="/">About Us</Link>
        </div>

        <div className="features-nav-buttons">
          <Link to="/login" className="login-nav-btn">
            Log In
          </Link>

          <Link to="/register" className="get-started-btn">
            Get Started
          </Link>
        </div>
      </nav>


      {/* HEADER */}
      <section className="features-header">
        <h1>Features</h1>

        <p>
          Semua yang kamu butuhkan untuk belajar efektif
          <br />
          dan menjaga well-being.
        </p>
      </section>


      {/* FEATURE CARDS */}
      <main className="features-container">

        <div className="features-grid">

          {features.map((feature, index) => (
            <div className="feature-card" key={index}>

              {/* SATU ICON DARI feature.png */}
              <div className="feature-icon-box">

                <div
                  className={`feature-sprite ${feature.icon}`}
                  style={{
                    backgroundImage: `url(${featureImage})`,
                  }}
                />

              </div>

              <div className="feature-content">
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>

            </div>
          ))}

        </div>


        {/* BOTTOM MESSAGE */}
        <div className="features-bottom-message">
          <span className="bottom-heart"></span>

          <p>
            StudyWell hadir untuk membantu kamu belajar lebih efektif,
            seimbang, dan berkelanjutan.
          </p>
        </div>

      </main>
    </div>
  );
}

export default Features;