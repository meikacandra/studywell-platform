import { Link } from "react-router-dom";
import studywellLogo from "../assets/STUDYWELL.png";

const studyData = [
  {
    name: "Aljabar Linear",
    progress: 70,
    className: "algebra",
    subtopics: [
      { name: "Pers. Linear", progress: 90 },
      { name: "Pers. Kuadrat", progress: 30 },
    ],
  },
  {
    name: "Trigonometri",
    progress: 40,
    className: "trigonometry",
    subtopics: [
      { name: "Perbandingan", progress: 40 },
      { name: "Identitas", progress: 40 },
    ],
  },
  {
    name: "Geometri",
    progress: 80,
    className: "geometry",
    subtopics: [
      { name: "Bgn. Datar", progress: 80 },
      { name: "Bgn. Ruang", progress: 70 },
    ],
  },
];

function StudyMapping() {
  return (
    <div className="mapping-page">
      {/* NAVBAR */}
      <nav className="mapping-navbar">
        <Link to="/" className="mapping-brand">
          <img src={studywellLogo} alt="StudyWell" />
          <span>StudyWell</span>
        </Link>

        <div className="mapping-menu">
          <Link to="/">Dashboard</Link>
          <Link to="/study-mapping" className="active">
            Learning Mapping & Progress
          </Link>
          <Link to="/monthly-evaluation">Well-being</Link>
          <Link to="/">Profile</Link>
        </div>

      
      </nav>

      {/* CONTENT */}
      <main className="mapping-content">
        <h1>Peta Belajarmu</h1>

        <p className="mapping-subtitle">
          Berikut adalah hasil pemetaan materi berdasarkan asesmen awalmu.
        </p>

        {/* SUMMARY */}
        <section className="mapping-summary">
          <div className="summary-card">
            <p>Total Materi</p>
            <strong>6</strong>
          </div>

          <div className="summary-card mastered">
            <p>Dikuasai</p>
            <strong>3</strong>
          </div>

          <div className="summary-card improve">
            <p>Perlu Diperkuat</p>
            <strong>3</strong>
          </div>
        </section>

        {/* MAP */}
        <section className="study-map">
          <div className="main-subject">
            Matematika
          </div>

          <div className="map-line"></div>

          <div className="subject-row">
            {studyData.map((subject) => (
              <div className="subject-column" key={subject.name}>
                <div className={`subject-card ${subject.className}`}>
                  <h3>{subject.name}</h3>
                  <strong>{subject.progress}%</strong>
                </div>

                <div className="subtopic-line"></div>

                <div className="subtopic-row">
                  {subject.subtopics.map((subtopic) => (
                    <div className="subtopic-card" key={subtopic.name}>
                      <p>{subtopic.name}</p>
                      <strong>{subtopic.progress}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudyMapping;