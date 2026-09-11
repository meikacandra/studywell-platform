import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Moon, ListTodo, Zap, Info, ArrowRight, Clock, RotateCcw, Smartphone, HeartPulse, Sparkles, Activity } from "lucide-react";
import {
  calculateStudyStrain,
  formatDuration,
  getWorkloadLabel,
  getEnergyLabel
} from "../utils/studyStrainEngine";
import { generateIntegratedRecommendation } from "../data/studyWellData";
import { saveCheckinToHistory } from "../data/userLearningData";
import { useUser } from "../context/UserContext";
import "./Wellbeing.css";

const Wellbeing = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  // Form states matching single source of truth specification
  const [sleepHours, setSleepHours] = useState(6.5);
  const [workloadPercentage, setWorkloadPercentage] = useState(72);
  const [energyPercentage, setEnergyPercentage] = useState(35);
  const [screenTimeHours, setScreenTimeHours] = useState(6.5);
  const [isStressed, setIsStressed] = useState(true);

  // Active dragging states for real-time visual feedback
  const [activeSlider, setActiveSlider] = useState(null);

  // View state: 'checkin' | 'result'
  const [viewState, setViewState] = useState("checkin");

  // Compute adaptive study strain calculation dynamically
  const strainAnalysis = calculateStudyStrain({
    sleepHours,
    workloadPercentage,
    energyPercentage,
    screenTime: screenTimeHours,
    isStressed
  });

  const { score, level, profile, explanation } = strainAnalysis;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Save checkin dynamically to active user dataset
    saveCheckinToHistory(currentUser.id, {
      sleepHours,
      workloadPercentage,
      energyPercentage,
      isStressed
    });
    setViewState("result");
  };

  const workloadBadge = getWorkloadLabel(workloadPercentage);
  const energyBadge = getEnergyLabel(energyPercentage);

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="wellbeing-container">
        <div className="wellbeing-content">

          {/* VIEW 1: EXACT WELL-BEING CHECK-IN UI/UX FORM */}
          {viewState === "checkin" && (
            <div className="wellbeing-card exact-checkin-card">
              {/* Top Pill Badge */}
              <div className="card-top-center">
                <span className="daily-micro-badge">Daily Micro Check-in</span>
              </div>

              {/* Main Title & Subtitle */}
              <div className="card-heading-center">
                <h1 className="checkin-title">Bagaimana Kondisi Belajarmu Hari Ini?</h1>
                <p className="checkin-subtitle">
                  Bantu StudyWell menyesuaikan intensitas belajar yang aman agar kamu tidak mudah lelah.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="exact-checkin-form">
                {/* Metric 1: Tidur Semalam (0-12 Jam, Step 30 Min) */}
                <div className="metric-row-group">
                  <div className="metric-row-header">
                    <div className="metric-row-title">
                      <div className="metric-icon-box icon-dark-box">
                        <Moon size={20} className="icon-dark" />
                      </div>
                      <span className="metric-title-text">Tidur Semalam</span>
                    </div>
                    <div className="metric-value-badge chip-blue header-realtime-value">
                      {formatDuration(sleepHours)}
                    </div>
                  </div>

                  <div className={`slider-container ${activeSlider === "sleep" ? "is-dragging" : ""}`}>
                    <div className="slider-wrapper">
                      <input
                        type="range"
                        min="0"
                        max="12"
                        step="0.5"
                        value={sleepHours}
                        onMouseDown={() => setActiveSlider("sleep")}
                        onMouseUp={() => setActiveSlider(null)}
                        onTouchStart={() => setActiveSlider("sleep")}
                        onTouchEnd={() => setActiveSlider(null)}
                        onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                        className="custom-slider slider-blue"
                        style={{
                          backgroundSize: `${(sleepHours / 12) * 100}% 100%`,
                        }}
                        aria-label="Tidur Semalam"
                        aria-valuetext={formatDuration(sleepHours)}
                      />
                      {activeSlider === "sleep" && (
                        <div
                          className="slider-tooltip-bubble"
                          style={{ left: `${(sleepHours / 12) * 100}%` }}
                        >
                          {formatDuration(sleepHours)}
                        </div>
                      )}
                    </div>
                    <div className="slider-sub-labels">
                      <span>Kurang (&lt; 4 jam)</span>
                      <span>Cukup (7–9 jam)</span>
                    </div>
                  </div>
                </div>

                {/* Metric 2: Beban Tugas & Deadline (0-100%) */}
                <div className="metric-row-group">
                  <div className="metric-row-header">
                    <div className="metric-row-title">
                      <div className="metric-icon-box icon-amber-box">
                        <ListTodo size={20} className="icon-amber" />
                      </div>
                      <span className="metric-title-text">Beban Tugas &amp; Deadline</span>
                    </div>
                    <div className="metric-badge-group">
                      <span className={`metric-value-badge ${workloadBadge.colorClass}`}>
                        {workloadBadge.label}
                      </span>
                      <span className="metric-value-badge chip-orange">
                        {workloadPercentage}%
                      </span>
                    </div>
                  </div>

                  <div className={`slider-container ${activeSlider === "workload" ? "is-dragging" : ""}`}>
                    <div className="slider-wrapper">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={workloadPercentage}
                        onMouseDown={() => setActiveSlider("workload")}
                        onMouseUp={() => setActiveSlider(null)}
                        onTouchStart={() => setActiveSlider("workload")}
                        onTouchEnd={() => setActiveSlider(null)}
                        onChange={(e) => setWorkloadPercentage(parseInt(e.target.value, 10))}
                        className="custom-slider slider-orange"
                        style={{
                          backgroundSize: `${workloadPercentage}% 100%`,
                        }}
                        aria-label="Beban Tugas & Deadline"
                        aria-valuetext={`${workloadPercentage}% - ${workloadBadge.label}`}
                      />
                      {activeSlider === "workload" && (
                        <div
                          className="slider-tooltip-bubble bubble-orange"
                          style={{ left: `${workloadPercentage}%` }}
                        >
                          {workloadPercentage}% ({workloadBadge.label})
                        </div>
                      )}
                    </div>
                    <div className="slider-sub-labels three-cols">
                      <span>Santai (0–30%)</span>
                      <span>Sedang (31–60%)</span>
                      <span>Menumpuk / Mendesak (&gt; 80%)</span>
                    </div>
                  </div>
                </div>

                {/* Metric 3: Tingkat Energi Belajar (0-100%) */}
                <div className="metric-row-group">
                  <div className="metric-row-header">
                    <div className="metric-row-title">
                      <div className="metric-icon-box icon-mint-box">
                        <Zap size={20} className="icon-mint" />
                      </div>
                      <span className="metric-title-text">Tingkat Energi Belajar</span>
                    </div>
                    <div className="metric-badge-group">
                      <span className={`metric-value-badge ${energyBadge.colorClass}`}>
                        {energyBadge.label}
                      </span>
                      <span className="metric-value-badge chip-mint">
                        {energyPercentage}%
                      </span>
                    </div>
                  </div>

                  <div className={`slider-container ${activeSlider === "energy" ? "is-dragging" : ""}`}>
                    <div className="slider-wrapper">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={energyPercentage}
                        onMouseDown={() => setActiveSlider("energy")}
                        onMouseUp={() => setActiveSlider(null)}
                        onTouchStart={() => setActiveSlider("energy")}
                        onTouchEnd={() => setActiveSlider(null)}
                        onChange={(e) => setEnergyPercentage(parseInt(e.target.value, 10))}
                        className="custom-slider slider-mint"
                        style={{
                          backgroundSize: `${energyPercentage}% 100%`,
                        }}
                        aria-label="Tingkat Energi Belajar"
                        aria-valuetext={`${energyPercentage}% - ${energyBadge.label}`}
                      />
                      {activeSlider === "energy" && (
                        <div
                          className="slider-tooltip-bubble bubble-mint"
                          style={{ left: `${energyPercentage}%` }}
                        >
                          {energyPercentage}% ({energyBadge.label})
                        </div>
                      )}
                    </div>
                    <div className="slider-sub-labels three-cols">
                      <span>Lemah (0–20%)</span>
                      <span>Cukup (41–60%)</span>
                      <span>Segar &amp; Siap Fokus (&gt; 80%)</span>
                    </div>
                  </div>
                </div>

                {/* Metric 4: Screen Time Harian (0-12 Jam, Step 30 Min) */}
                <div className="metric-row-group">
                  <div className="metric-row-header">
                    <div className="metric-row-title">
                      <div className="metric-icon-box icon-purple-box">
                        <Smartphone size={20} className="icon-purple" />
                      </div>
                      <span className="metric-title-text">Screen Time Harian</span>
                    </div>
                    <div className="metric-value-badge chip-purple header-realtime-value">
                      {formatDuration(screenTimeHours)}
                    </div>
                  </div>

                  <div className={`slider-container ${activeSlider === "screentime" ? "is-dragging" : ""}`}>
                    <div className="slider-wrapper">
                      <input
                        type="range"
                        min="0"
                        max="12"
                        step="0.5"
                        value={screenTimeHours}
                        onMouseDown={() => setActiveSlider("screentime")}
                        onMouseUp={() => setActiveSlider(null)}
                        onTouchStart={() => setActiveSlider("screentime")}
                        onTouchEnd={() => setActiveSlider(null)}
                        onChange={(e) => setScreenTimeHours(parseFloat(e.target.value))}
                        className="custom-slider slider-purple"
                        style={{
                          backgroundSize: `${(screenTimeHours / 12) * 100}% 100%`,
                        }}
                        aria-label="Screen Time Harian"
                        aria-valuetext={formatDuration(screenTimeHours)}
                      />
                      {activeSlider === "screentime" && (
                        <div
                          className="slider-tooltip-bubble bubble-purple"
                          style={{ left: `${(screenTimeHours / 12) * 100}%` }}
                        >
                          {formatDuration(screenTimeHours)}
                        </div>
                      )}
                    </div>
                    <div className="slider-sub-labels">
                      <span>Rendah (&lt; 3 jam)</span>
                      <span>Tinggi (&gt; 8 jam)</span>
                    </div>
                  </div>
                </div>

                {/* Metric 5: Mengalami Stress Belajar? */}
                <div className="metric-row-group">
                  <div className="metric-row-header">
                    <div className="metric-row-title">
                      <div className="metric-icon-box icon-pink-box">
                        <HeartPulse size={20} className="icon-pink" />
                      </div>
                      <span className="metric-title-text">Mengalami Stress Belajar?</span>
                    </div>
                    <div className={`metric-value-badge ${isStressed ? "badge-red" : "badge-green"}`}>
                      {isStressed ? "Ya, Terasa Stress" : "Tidak Stress"}
                    </div>
                  </div>

                  <div className="stress-toggle-row">
                    <button
                      type="button"
                      onClick={() => setIsStressed(true)}
                      className={`stress-btn-chip ${isStressed ? "active-red" : ""}`}
                    >
                      Ya, Stress
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsStressed(false)}
                      className={`stress-btn-chip ${!isStressed ? "active-green" : ""}`}
                    >
                      Tidak
                    </button>
                  </div>
                </div>

                {/* Info Banner */}
                <div className="exact-info-box">
                  <Info size={18} className="exact-info-icon" />
                  <span>
                    Estimasi pengisian: 20 detik. Data dienkripsi dan hanya dipakai untuk rekomendasi belajar harian.
                  </span>
                </div>

                {/* Submit Button */}
                <button type="submit" className="exact-submit-button">
                  <span>Simpan &amp; Lihat Rekomendasi Belajar</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          )}

          {/* VIEW 2: ADAPTIVE STRAIN ANALYSIS RESULT */}
          {viewState === "result" && (
            <div className="wellbeing-card recommendation-card-mode">
              {/* Strain Header Banner Dynamic per Level */}
              <div className={`strain-header-banner banner-${profile.color}`}>
                <div className="banner-top-title-row">
                  <h2 className="strain-banner-title">Hasil Analisis Kondisi Belajar</h2>
                  <div className="score-badge-inline">
                    <Activity size={15} />
                    <span>Score: <strong>{score}</strong> / 100</span>
                  </div>
                </div>

                <div className="white-strain-pill">
                  <span>{profile.emoji} {profile.label}</span>
                </div>

                <p className="strain-banner-desc">
                  "{explanation}"
                </p>
              </div>

              {/* Body Content */}
              <div className="ritme-body-content">

                {/* Score & Intensity Metric Bar */}
                <div className="adaptive-score-metric-box">
                  <div className="score-left-col">
                    <span className="score-caption">Study Strain Score</span>
                    <div className="score-big-display">
                      <span className="big-number">{score}</span>
                      <span className="max-number">/ 100</span>
                    </div>
                  </div>

                  <div className="intensity-right-col">
                    <span className="score-caption">Learning Intensity</span>
                    <div className="intensity-badge-val">
                      {profile.learningIntensity}
                    </div>
                  </div>
                </div>

                <div className="ritme-header">
                  <h3 className="ritme-title">Rekomendasi Ritme Belajarmu Hari Ini</h3>
                  <p className="ritme-subtitle">
                    Intensitas disesuaikan secara otomatis agar target materi tetap tercapai tanpa membebani mental.
                  </p>
                </div>

                {/* 2 Side-by-Side Ritme Cards */}
                <div className="ritme-cards-grid">
                  {/* Focus Card */}
                  <div className="ritme-card focus-card">
                    <div className="big-time-wrapper">
                      <span className="big-time-number text-blue-dark">{profile.focusDuration}</span>
                      <span className="big-time-unit text-blue-dark">Menit</span>
                    </div>
                    <div className="ritme-chip chip-light-blue">
                      Sesi Fokus Belajar
                    </div>
                    <p className="ritme-card-desc">Fokus pada materi rekomendasi AI</p>
                  </div>

                  {/* Rest Card */}
                  <div className="ritme-card rest-card">
                    <div className="big-time-wrapper">
                      <span className="big-time-number text-green-dark">{profile.breakDuration}</span>
                      <span className="big-time-unit text-green-dark">Menit</span>
                    </div>
                    <div className="ritme-chip chip-light-mint">
                      {level === "HIGH STRAIN" ? "Recovery / Jeda Istirahat" : "Jeda Istirahat"}
                    </div>
                    <p className="ritme-card-desc">Peregangan ringan atau minum air</p>
                  </div>
                </div>

                {/* Target Focus Material Box */}
                <div className="material-target-box">
                  <div className="target-box-header">
                    <Sparkles size={16} className="sparkles-icon" />
                    <strong>Fokus Materi &amp; Rekomendasi Terintegrasi:</strong>
                  </div>
                  <p className="target-box-text">"{generateIntegratedRecommendation(profile).recommendationText}"</p>
                </div>

                {/* Total Waktu Sesi Hari Ini Banner */}
                <div className="total-time-bar">
                  <div className="total-time-left">
                    <Clock size={18} className="clock-blue-icon" />
                    <span>Total Waktu Sesi Hari Ini</span>
                  </div>
                  <div className="total-time-right">
                    <strong className="total-minutes">{profile.totalDuration} Menit</strong>
                    <span className="sub-jeda">(Termasuk Jeda Istirahat)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons-row">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="secondary-gray-btn"
                  >
                    Kembali ke Dashboard
                  </button>
                  <button
                    onClick={() => navigate("/study-mapping")}
                    className="primary-blue-btn"
                  >
                    <span>Mulai Sesi Belajar ({profile.focusDuration} Menit)</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* Reset Link */}
                <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                  <button
                    onClick={() => setViewState("checkin")}
                    className="reset-checkin-link"
                  >
                    <RotateCcw size={14} />
                    <span>Ubah Check-in Hari Ini</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Wellbeing;
