import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Lock, ArrowRight, ChevronDown, Map, LineChart } from "lucide-react";
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