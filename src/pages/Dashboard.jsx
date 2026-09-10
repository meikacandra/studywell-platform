import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReassessmentCard from "../components/ReassessmentCard";
import { CheckCircle2, Lock, ArrowRight, RefreshCw, Flame, Calendar } from "lucide-react";
import { useUser } from "../context/UserContext";
import { getUserMaterials, getPriorityMaterial } from "../data/studyWellData";
import { getUserStudyMapData } from "../data/studyMapData";
import { getUserReadinessProfile } from "../data/userLearningData";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  // Dynamic User-Specific Data
  const materials = getUserMaterials(currentUser?.id);
  const userStudyMap = getUserStudyMapData(currentUser?.id);
  const readiness = getUserReadinessProfile(currentUser?.id);

  const priorityMaterial = getPriorityMaterial(materials);
  const { subjectName } = userStudyMap;

  // Calculate dynamic mastery metrics for Donut Chart & Breakdown
  const validMaterials = materials.filter(m => m.status !== "terkunci");
  const totalCount = materials.length;

  const avgMastery = Math.round(
    validMaterials.reduce((acc, curr) => acc + curr.mastery, 0) / (validMaterials.length || 1)
  );

  const gapCount = materials.filter(m => m.status === "learning_gap" || m.status === "perlu_penguatan").length;
  const lockedCount = materials.filter(m => m.status === "terkunci").length;

  const gapPercentage = Math.round((gapCount / totalCount) * 30);
  const lockedPercentage = Math.round((lockedCount / totalCount) * 20);
  const masteredPercentage = 100 - gapPercentage - lockedPercentage;

  const circumference = 238.76;
  const masteredDash = (masteredPercentage / 100) * circumference;
  const gapDash = (gapPercentage / 100) * circumference;

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="dashboard-container">
        <div className="dashboard-content">
          {/* Header Sapaan */}
          <div className="dashboard-header">
            <h1 className="greeting-title">Halo, {currentUser.name}!</h1>
            <p className="greeting-subtitle">
              Fokus harianmu sudah siap. Mari tuntaskan learning gap dengan ritme yang seimbang.
            </p>
          </div>

          {/* Grid Layout Main vs Sidebar */}
          <div className="dashboard-grid">
            {/* Main Left Column */}
            <div className="main-column">
              {/* Target Belajar Hari Ini Card */}
              <div className="dashboard-card target-card">
                <div className="card-top-tags">
                  <span className="tag-pill tag-blue">Target Belajar Hari Ini</span>
                  <span className="tag-pill tag-green">
                    <CheckCircle2 size={14} />
                    Rekomendasi Adaptif Aktif
                  </span>
                </div>

                <div className="target-subject-info">
                  <div className="fx-icon-badge">{priorityMaterial.code || "fx"}</div>
                  <div className="subject-details">
                    <h2 className="subject-title">Konsep Dasar {priorityMaterial.name}</h2>
                    <p className="subject-desc">
                      {readiness.inhibitorText || "Dideteksi sebagai materi prioritas penguatan."}
                    </p>
                  </div>
                </div>

                <div className="duration-pills">
                  <span className="duration-chip chip-gray">{readiness.focusDuration} Menit Sesi Fokus</span>
                  <span className="duration-chip chip-mint">{readiness.breakDuration} Menit Jeda Pemulihan</span>
                </div>

                <button
                  onClick={() => navigate("/wellbeing")}
                  className="primary-action-btn"
                >
                  <span>Mulai Belajar Sekarang ({readiness.focusDuration} Menit)</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Card Evaluasi Berkala Mendatang (Re-assessment) */}
              <ReassessmentCard />

              {/* Alur Belajar Prioritas Card */}
              <div className="dashboard-card priority-card">
                <h3 className="section-title">Alur Belajar Prioritas</h3>

                <div className="priority-list">
                  {materials.slice(0, 3).map((item, idx) => {
                    const isLocked = item.status === "terkunci";
                    const isGap = item.status === "learning_gap" || item.status === "perlu_penguatan";

                    return (
                      <div
                        key={item.id || idx}
                        className={`priority-item ${idx === 0 ? "active-item" : ""} ${isLocked ? "locked-item" : ""}`}
                        onClick={() => !isLocked && navigate("/study-mapping")}
                      >
                        <div className="item-left">
                          <span className="item-number">{idx + 1}</span>
                          <div className={`item-icon ${isLocked ? "icon-lock-gray" : isGap ? "icon-fx-red" : "icon-check-green"}`}>
                            {isLocked ? <Lock size={16} /> : isGap ? (item.code || "fx") : <CheckCircle2 size={16} />}
                          </div>
                          <div className="item-info">
                            <h4 className="item-title">{item.name}</h4>
                            <p className="item-desc">
                              {isLocked
                                ? "Selesaikan materi sebelumnya untuk membuka"
                                : isGap
                                ? "Sedang menjadi fokus utama belajarmu."
                                : "Dasar telah dikuasai dengan baik!"}
                            </p>
                          </div>
                        </div>
                        <div className="item-right">
                          <span className={`status-badge ${isLocked ? "badge-locked" : isGap ? "badge-gap" : "badge-mastered"}`}>
                            {isLocked ? "Terkunci" : isGap ? `Learning Gap (${item.mastery}%)` : `Penguasaan (${item.mastery}%)`}
                          </span>
                          <ArrowRight size={16} className={`arrow-icon ${isLocked ? "gray" : ""}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link to="/study-mapping" className="card-footer-link">
                  <span>Lihat Semua Materi</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Sidebar Right Column */}
            <div className="sidebar-column">
              {/* Card 1: Kesiapan Belajar Hari Ini */}
              <div className="dashboard-card readiness-card">
                <div className="card-header-flex">
                  <h3 className="card-small-title">Kesiapan Belajar Hari Ini</h3>
                  <button onClick={() => navigate("/wellbeing")} className="refresh-link">
                    <RefreshCw size={13} />
                    <span>Perbarui</span>
                  </button>
                </div>

                <div className="alert-strain-box">
                  <div className="strain-badge">
                    <span className="moon-emoji">🌙</span>
                    <strong>{readiness.readinessLabel}</strong>
                  </div>
                  <span className="strain-subtext">{readiness.readinessSubtext}</span>
                </div>

                <p className="readiness-desc">
                  {readiness.readinessDesc}
                </p>
              </div>

              {/* Card 2: Penguasaan Subject */}
              <div className="dashboard-card mastery-card">
                <h3 className="card-small-title">Penguasaan {subjectName || "Matematika"}</h3>

                <div className="donut-chart-wrapper">
                  <svg className="donut-svg" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                    {/* Mastered Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray={`${masteredDash} ${circumference}`}
                      strokeDashoffset="60"
                      strokeLinecap="round"
                    />
                    {/* Learning Gap Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="12"
                      strokeDasharray={`${gapDash} ${circumference}`}
                      strokeDashoffset={`-${masteredDash}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="donut-center-text">
                    <span className="donut-score">{avgMastery}%</span>
                    <span className="donut-label">Mastered</span>
                  </div>
                </div>

                <div className="legend-list">
                  <div className="legend-item">
                    <div className="legend-info">
                      <span className="dot dot-green" />
                      <span>Penguasaan</span>
                    </div>
                    <strong>{masteredPercentage}%</strong>
                  </div>
                  <div className="legend-item">
                    <div className="legend-info">
                      <span className="dot dot-red" />
                      <span>Learning Gap</span>
                    </div>
                    <strong>{gapPercentage}%</strong>
                  </div>
                  <div className="legend-item">
                    <div className="legend-info">
                      <span className="dot dot-gray" />
                      <span>Terkunci</span>
                    </div>
                    <strong>{lockedPercentage}%</strong>
                  </div>
                </div>

                <div className="donut-bottom-bar">
                  <div className="bar-segment seg-green" style={{ width: `${masteredPercentage}%` }} />
                  <div className="bar-segment seg-red" style={{ width: `${gapPercentage}%` }} />
                  <div className="bar-segment seg-gray" style={{ width: `${lockedPercentage}%` }} />
                </div>

                <Link to="/study-mapping" className="card-footer-link">
                  <span>Lihat Peta Pengetahuan Lengkap</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Card 3: Streak & Assessment */}
              <div className="dashboard-card streak-card">
                <div className="streak-row">
                  <div className="streak-icon-box flame-bg">
                    <Flame size={20} className="flame-color" />
                  </div>
                  <div className="streak-text">
                    <h4>{readiness.streakDays} Hari Konsisten Belajar</h4>
                    <p>Terus pertahankan momentum hebat ini!</p>
                  </div>
                </div>

                <hr className="divider" />

                <div className="streak-row">
                  <div className="streak-icon-box calendar-bg">
                    <Calendar size={20} className="calendar-color" />
                  </div>
                  <div className="streak-text">
                    <span className="schedule-sub">Jadwal Re-assessment:</span>
                    <h4 className="schedule-days">{readiness.reassessmentDays} hari lagi</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
