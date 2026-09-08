import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Lock, Info, ArrowRight, ChevronDown, Map, LineChart } from "lucide-react";
import { useUser } from "../context/UserContext";
import { getUserMaterials } from "../data/studyWellData";
import { getUserStudyMapData } from "../data/studyMapData";
import "./StudyMapping.css";

const StudyMapping = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  // Mode tab view: 'progress' (Peta Pemahaman & Progres) | 'tree' (Peta Belajarmu / Asesmen Awal)
  const [activeTab, setActiveTab] = useState("progress");

  // Single Source of Truth Materials & Study Map per User
  const materials = getUserMaterials(currentUser?.id);
  const userStudyMap = getUserStudyMapData(currentUser?.id);
  const { stats, topics, subjectName } = userStudyMap;

  // Compute Weekly Mastery Averages for Dynamic Line Chart
  const weeklyAvgs = [0, 1, 2, 3].map((weekIdx) => {
    const validMats = materials.filter(m => m.history && m.history[weekIdx]);
    if (validMats.length === 0) return 0;
    const sum = validMats.reduce((acc, curr) => acc + curr.history[weekIdx].mastery, 0);
    return Math.round(sum / validMats.length);
  });

  const chartPoints = [
    { x: 50, y: Math.max(20, Math.min(140, 140 - (weeklyAvgs[0] / 100) * 120)) },
    { x: 170, y: Math.max(20, Math.min(140, 140 - (weeklyAvgs[1] / 100) * 120)) },
    { x: 290, y: Math.max(20, Math.min(140, 140 - (weeklyAvgs[2] / 100) * 120)) },
    { x: 410, y: Math.max(20, Math.min(140, 140 - (weeklyAvgs[3] / 100) * 120)) }
  ];

  const svgPathD = `M ${chartPoints[0].x} ${chartPoints[0].y} L ${chartPoints[1].x} ${chartPoints[1].y} L ${chartPoints[2].x} ${chartPoints[2].y} L ${chartPoints[3].x} ${chartPoints[3].y}`;

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="study-mapping-container">
        <div className="study-mapping-content">
          {/* Sub Navigation Bar for Switching Views */}
          <div className="mapping-sub-tabs">
            <button
              onClick={() => setActiveTab("progress")}
              className={`tab-btn ${activeTab === "progress" ? "active-tab" : ""}`}
            >
              <LineChart size={16} />
              <span>Peta Pemahaman &amp; Progres Belajar</span>
            </button>
            <button
              onClick={() => setActiveTab("tree")}
              className={`tab-btn ${activeTab === "tree" ? "active-tab" : ""}`}
            >
              <Map size={16} />
              <span>Peta Belajarmu (Asesmen Awal)</span>
            </button>
          </div>

          {/* VIEW 1: PETA PEMAHAMAN & PROGRES BELAJAR (PERKEMBANGAN & PRASYARAT) */}
          {activeTab === "progress" && (
            <div className="progress-view-wrapper">
              {/* Header Section */}
              <div className="mapping-header-row">
                <div>
                  <h1 className="mapping-title">Peta Pemahaman &amp; Progres Belajar</h1>
                  <p className="mapping-subtitle">
                    Visualisasi hubungan antar-materi dan identifikasi konsep prasyarat yang perlu diperbaiki.
                  </p>
                </div>

                <div className="subject-selector-dropdown">
                  <span className="dropdown-label">🎓 Mata Pelajaran: <strong>{subjectName || "Matematika"}</strong></span>
                  <ChevronDown size={16} />
                </div>
              </div>

              {/* MAIN CARD: Pohon Prasyarat Kompetensi (Study Map) */}
              <div className="mapping-card study-tree-card">
                <div className="tree-card-header">
                  <h2 className="card-section-title">Pohon Prasyarat Kompetensi (Study Map)</h2>

                  <div className="legend-row">
                    <span className="legend-item"><span className="dot dot-green" /> Tuntas (&gt;75%)</span>
                    <span className="legend-item"><span className="dot dot-red" /> Learning Gap (&lt;50%)</span>
                    <span className="legend-item"><span className="dot dot-gray" /> Terkunci (Prasyarat Belum Lengkap)</span>
                  </div>
                </div>

                {/* Dynamic Tree Network Nodes Horizontal Flow */}
                <div className="tree-network-container">
                  {materials.map((mat, index) => {
                    const isLast = index === materials.length - 1;
                    const isLocked = mat.status === "terkunci";
                    const isGap = mat.status === "learning_gap" || mat.status === "perlu_penguatan";

                    let connectorClass = "line-green";
                    if (mat.status === "learning_gap") connectorClass = "line-red";
                    else if (isLocked) connectorClass = "line-gray";

                    return (
                      <React.Fragment key={mat.id}>
                        <div className={`tree-node ${isLocked ? "node-gray-locked" : isGap ? "node-red-gap highlight-gap" : "node-green"}`}>
                          <div className={`node-icon-circle ${isLocked ? "icon-gray-bg" : isGap ? "icon-red-bg" : "icon-green-bg"}`}>
                            {isLocked ? <Lock size={18} /> : mat.code}
                          </div>
                          <h3 className={`node-title ${isLocked ? "gray-text" : ""}`}>{mat.name}</h3>
                          {isLocked ? (
                            <span className="node-locked-text">Terkunci</span>
                          ) : isGap ? (
                            <>
                              <span className="node-score-text text-red">Penguasaan: {mat.mastery}%</span>
                              <button onClick={() => navigate("/assessment")} className="learn-topic-btn">
                                <span>Pelajari Topik</span>
                                <ArrowRight size={14} />
                              </button>
                            </>
                          ) : (
                            <span className="node-badge badge-green-border">Penguasaan ({mat.mastery}%)</span>
                          )}
                        </div>

                        {!isLast && <div className={`connector-line ${connectorClass}`} />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM TWO COLUMNS */}
              <div className="bottom-two-columns">
                {/* Left Column: Perkembangan Penguasaan Materi (Line Chart) */}
                <div className="mapping-card chart-column-card">
                  <div className="column-card-header">
                    <div className="header-title-info">
                      <h3 className="column-title">Perkembangan Penguasaan Materi</h3>
                      <Info size={15} className="info-gray" />
                    </div>
                    <div className="mini-dropdown">
                      <span>4 Minggu Terakhir</span>
                      <ChevronDown size={13} />
                    </div>
                  </div>
                  <p className="column-subtitle">Rata-rata pemahaman dari hasil asesmen dan latihan soal.</p>

                  <div className="line-chart-wrapper">
                    <svg className="line-svg" viewBox="0 0 450 180">
                      <line x1="30" y1="20" x2="430" y2="20" stroke="#f1f5f9" />
                      <line x1="30" y1="60" x2="430" y2="60" stroke="#f1f5f9" />
                      <line x1="30" y1="100" x2="430" y2="100" stroke="#f1f5f9" />
                      <line x1="30" y1="140" x2="430" y2="140" stroke="#e2e8f0" />

                      <text x="15" y="24" fill="#94a3b8" fontSize="10">60</text>
                      <text x="15" y="64" fill="#94a3b8" fontSize="10">45</text>
                      <text x="15" y="104" fill="#94a3b8" fontSize="10">30</text>
                      <text x="15" y="144" fill="#94a3b8" fontSize="10">15</text>
                      <text x="15" y="174" fill="#94a3b8" fontSize="10">0</text>

                      <text x="50" y="174" fill="#64748b" fontSize="10">0</text>
                      <text x="170" y="174" fill="#64748b" fontSize="10">1</text>
                      <text x="290" y="174" fill="#64748b" fontSize="10">2</text>
                      <text x="410" y="174" fill="#64748b" fontSize="10">3</text>

                      <path
                        d={svgPathD}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />

                      {chartPoints.map((pt, idx) => (
                        <circle key={idx} cx={pt.x} cy={pt.y} r="4.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Right Column: Rincian Pemahaman Sub-Topik */}
                <div className="mapping-card subtopics-column-card">
                  <div className="column-card-header">
                    <div className="header-title-info">
                      <h3 className="column-title">Rincian Pemahaman Sub-Topik</h3>
                      <Info size={15} className="info-gray" />
                    </div>
                  </div>

                  <div className="subtopic-progress-list">
                    {materials.map((mat) => (
                      <div key={mat.id} className="subtopic-progress-item">
                        <div className="subtopic-item-header">
                          <div className="subtopic-name-group">
                            <span className="subtopic-code-badge" style={{ backgroundColor: `${mat.color}15`, color: mat.color }}>
                              {mat.code}
                            </span>
                            <span className="subtopic-title-text">{mat.name}</span>
                          </div>

                          <div className="subtopic-score-group">
                            <span className="subtopic-val" style={{ color: mat.color }}>{mat.mastery}%</span>
                            <span className="subtopic-status-label" style={{ color: mat.color }}>{mat.statusLabel}</span>
                          </div>
                        </div>

                        <div className="subtopic-track-bg">
                          <div
                            className="subtopic-fill-bar"
                            style={{ width: `${mat.mastery}%`, backgroundColor: mat.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: PETA BELAJARMU (HIRARKI MATERI MATEMATIKA) */}
          {activeTab === "tree" && (
            <div className="tree-view-wrapper">
              <div className="mapping-header">
                <h1 className="mapping-title">Peta Belajarmu</h1>
                <p className="mapping-subtitle">
                  Berikut adalah hasil pemetaan materi berdasarkan asesmen awalmu.
                </p>
              </div>

              {/* 3 Summary Stat Cards */}
              <div className="stats-cards-grid">
                <div className="stat-card">
                  <span className="stat-label">Total Materi</span>
                  <span className="stat-number text-dark">{stats.totalMaterials}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label text-green-label">Dikuasai</span>
                  <span className="stat-number text-green">{stats.masteredCount}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label text-red-label">Perlu Diperkuat</span>
                  <span className="stat-number text-red">{stats.needsImprovementCount}</span>
                </div>
              </div>

              {/* Hierarchical Tree Map Layout */}
              <div className="tree-map-card">
                <div className="tree-root-wrapper">
                  <div className="tree-node subject-root-node">
                    <span className="node-subject-title">{subjectName || "Matematika"}</span>
                  </div>
                </div>

                <div className="tree-trunk-line" />

                <div className="tree-level-topics">
                  {topics.map((topic) => (
                    <div key={topic.id} className="topic-branch-group">
                      <div className="tree-node topic-node">
                        <h3 className="topic-name">{topic.name}</h3>
                        <span className={`mastery-percentage ${topic.masteryPercentage >= 70 ? "text-green" : "text-red"}`}>
                          {topic.masteryPercentage}%
                        </span>
                      </div>

                      <div className="topic-branch-line" />

                      <div className="subtopics-row">
                        {topic.subtopics.map((sub) => (
                          <div key={sub.id} className="tree-node subtopic-node">
                            <h4 className="subtopic-name">{sub.name}</h4>
                            <span className={`mastery-percentage ${sub.masteryPercentage >= 70 ? "text-green" : "text-red"}`}>
                              {sub.masteryPercentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default StudyMapping;