import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  Target, 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Settings, 
  FileText,
  Trash2,
  AlertTriangle,
  X,
  User,
  Mail,
  GraduationCap,
  Save
} from "lucide-react";
import { useUser } from "../context/UserContext";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, updateUserProfile } = useUser();
  
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Editable Form States
  const [editName, setEditName] = useState(currentUser.name);
  const [editEmail, setEditEmail] = useState(currentUser.email || "");
  const [editRole, setEditRole] = useState(currentUser.role || "Siswa SMA / Persiapan UTBK");
  const [editTarget, setEditTarget] = useState(currentUser.academicTarget || "SNBT 2026 / UTBK PTN");
  const [editFocus, setEditFocus] = useState(currentUser.studyFocus || "Sains (SAINTEK)");

  const handleOpenSettings = () => {
    setEditName(currentUser.name);
    setEditEmail(currentUser.email || "");
    setEditRole(currentUser.role || "Siswa SMA / Persiapan UTBK");
    setEditTarget(currentUser.academicTarget || "SNBT 2026 / UTBK PTN");
    setEditFocus(currentUser.studyFocus || "Sains (SAINTEK)");
    setIsSettingsModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(currentUser.id, {
      name: editName,
      email: editEmail,
      role: editRole,
      academicTarget: editTarget,
      studyFocus: editFocus
    });
    setIsSettingsModalOpen(false);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="profile-container">
        <div className="profile-content">
          {/* Header Title */}
          <div className="profile-header">
            <h1 className="profile-title">Profil Akademik &amp; Evaluasi</h1>
          </div>

          {/* Two-Column Grid */}
          <div className="profile-grid">
            {/* Left Column: User Card & Activity Summary */}
            <div className="profile-left-column">
              {/* User Profile Card */}
              <div className="profile-card user-main-card">
                <div className="avatar-large-circle" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", fontWeight: 800, color: "#2563eb", background: "#eff6ff" }}>
                  {currentUser.avatar || "F"}
                </div>
                <h2 className="user-full-name">{currentUser.name}</h2>
                <p className="user-grade">{currentUser.role || "Siswa SMA / Persiapan UTBK"}</p>

                <div className="id-badge-pill">{currentUser.email || "fahri@email.com"}</div>

                <div className="user-meta-list">
                  <div className="meta-item">
                    <div className="meta-label">
                      <Target size={15} className="meta-icon" />
                      <span>Target Akademik</span>
                    </div>
                    <strong className="meta-value">{currentUser.academicTarget || "SNBT 2026 / UTBK PTN"}</strong>
                  </div>

                  <div className="meta-item">
                    <div className="meta-label">
                      <BookOpen size={15} className="meta-icon" />
                      <span>Fokus Belajar</span>
                    </div>
                    <strong className="meta-value">{currentUser.studyFocus || "Sains (SAINTEK)"}</strong>
                  </div>
                </div>

                <div className="user-action-buttons">
                  <button 
                    className="btn-account-settings"
                    onClick={handleOpenSettings}
                  >
                    <Settings size={15} />
                    <span>Pengaturan Akun</span>
                  </button>
                </div>
              </div>

              {/* Ringkasan Aktivitas Belajar */}
              <div className="profile-card activity-summary-card">
                <h3 className="card-sub-heading">Ringkasan Aktivitas Belajar</h3>

                <div className="activity-list">
                  <div className="activity-row">
                    <div className="activity-left">
                      <Target size={16} className="act-icon-blue" />
                      <span>Total Sesi Fokus</span>
                    </div>
                    <strong className="act-val">28 Sesi</strong>
                  </div>

                  <div className="activity-row">
                    <div className="activity-left">
                      <BookOpen size={16} className="act-icon-blue" />
                      <span>Total Waktu Belajar</span>
                    </div>
                    <strong className="act-val">14,2 Jam</strong>
                  </div>

                  <div className="activity-row">
                    <div className="activity-left">
                      <Clock size={16} className="act-icon-blue" />
                      <span>Materi Sedang Aktif</span>
                    </div>
                    <strong className="act-val">1 Modul</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Re-assessment & Diagnostic History */}
            <div className="profile-right-column">
              {/* Card 1: Evaluasi Berkala Mendatang (Re-assessment) */}
              <div className="profile-card reassessment-card">
                <h3 className="section-title">Evaluasi Berkala Mendatang (Re-assessment)</h3>
                <p className="section-desc">Persiapkan diri untuk asesmen berikutnya.</p>

                <div className="reassessment-flex-content">
                  {/* Left Countdown Box */}
                  <div className="countdown-box">
                    <div className="countdown-top">
                      <Calendar size={16} className="blue-icon" />
                      <span>Hitung Mundur</span>
                    </div>
                    <div className="countdown-big-number">
                      18 <span className="countdown-unit">Hari Lagi</span>
                    </div>
                  </div>

                  {/* Right Detail List */}
                  <div className="reassessment-details">
                    <div className="re-detail-row">
                      <div className="re-label">
                        <Calendar size={15} className="re-icon" />
                        <span>Jadwal Evaluasi</span>
                      </div>
                      <strong className="re-val text-blue">29 Agustus 2026</strong>
                    </div>

                    <div className="re-detail-row">
                      <div className="re-label">
                        <Award size={15} className="re-icon" />
                        <span>Target Skor Evaluasi</span>
                      </div>
                      <strong className="re-val text-blue">75%</strong>
                    </div>

                    <div className="re-detail-row">
                      <div className="re-label">
                        <FileText size={15} className="re-icon" />
                        <span>Status Materi target</span>
                      </div>
                      <strong className="re-val text-blue">2 Sub-Topik Perlu Ditingkatkan</strong>
                    </div>

                    <button onClick={() => navigate("/monthly-evaluation")} className="kisi-btn">
                      <span>Kisi-kisi Evaluasi</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Riwayat Asesmen & Diagnostik */}
              <div className="profile-card diagnostics-card">
                <h3 className="section-title">Riwayat Asesmen &amp; Diagnostik</h3>
                <p className="section-desc">Catatan hasil asesmen dan latihan adaptif sebelumnya</p>

                <div className="diagnostics-list">
                  {/* Test Item 1 */}
                  <div className="diag-item">
                    <div className="diag-left">
                      <div className="diag-icon-box icon-mint-bg">
                        <FileText size={18} className="text-mint" />
                      </div>
                      <div className="diag-info">
                        <h4 className="diag-name">Diagnostic Assessment Awal</h4>
                        <span className="diag-date">12 Agustus 2026</span>
                        <p className="diag-result-text">
                          Hasil: Gap terdeteksi pada konsep prasyarat, terutama Fungsi &amp; Relasi
                        </p>
                      </div>
                    </div>
                    <div className="diag-right">
                      <span className="diag-score-label">Skor</span>
                      <div className="diag-score-value">52%</div>
                      <span className="diag-badge badge-mint-bg">Tuntas</span>
                    </div>
                  </div>

                  {/* Test Item 2 */}
                  <div className="diag-item">
                    <div className="diag-left">
                      <div className="diag-icon-box icon-blue-bg">
                        <Award size={18} className="text-blue" />
                      </div>
                      <div className="diag-info">
                        <h4 className="diag-name">Latihan Adaptif Mandiri</h4>
                        <span className="diag-date">2 September 2026</span>
                        <p className="diag-result-text">
                          Hasil: Sistem Persamaan sudah dikuasai dengan baik.
                        </p>
                      </div>
                    </div>
                    <div className="diag-right">
                      <span className="diag-score-label">Skor</span>
                      <div className="diag-score-value">78%</div>
                      <span className="diag-badge badge-blue-bg">Meningkat</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => navigate("/assessment")} className="view-all-tests-btn">
                  <span>Lihat Semua Hasil Tes</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal: Pengaturan Akun (Clean Profil & Target Akademik Only) */}
      {isSettingsModalOpen && (
        <div className="account-modal-overlay">
          <div className="settings-modal-card">
            {/* Header */}
            <div className="settings-modal-header">
              <div>
                <h3 className="settings-modal-title">Pengaturan Akun</h3>
                <p className="settings-modal-subtitle">Kelola profil akademik dan informasi akunmu</p>
              </div>
              <button className="modal-close-btn" onClick={() => setIsSettingsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Form Profil & Target Akademik */}
            <form onSubmit={handleSaveProfile} className="settings-form-layout">
              <div className="settings-field-group">
                <label className="settings-field-label">
                  <User size={14} className="settings-label-icon" />
                  <span>Nama Lengkap</span>
                </label>
                <div className="input-icon-container">
                  <input
                    type="text"
                    className="settings-input-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                  <User size={16} className="input-leading-icon" />
                </div>
              </div>

              <div className="settings-field-group">
                <label className="settings-field-label">
                  <Mail size={14} className="settings-label-icon" />
                  <span>Alamat Email</span>
                </label>
                <div className="input-icon-container">
                  <input
                    type="email"
                    className="settings-input-control"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                  />
                  <Mail size={16} className="input-leading-icon" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div className="settings-field-group">
                  <label className="settings-field-label">
                    <Target size={14} className="settings-label-icon" />
                    <span>Target Akademik</span>
                  </label>
                  <div className="input-icon-container">
                    <select
                      className="settings-select-control"
                      value={editTarget}
                      onChange={(e) => setEditTarget(e.target.value)}
                    >
                      <option value="SNBT 2026 / UTBK PTN">SNBT 2026 / UTBK PTN</option>
                      <option value="SNBP 2026 (Prestasi)">SNBP 2026 (Prestasi)</option>
                      <option value="Ujian Mandiri PTN">Ujian Mandiri PTN</option>
                      <option value="Olimpiade Sains (OSN)">Olimpiade Sains (OSN)</option>
                    </select>
                    <Target size={16} className="input-leading-icon" />
                  </div>
                </div>

                <div className="settings-field-group">
                  <label className="settings-field-label">
                    <BookOpen size={14} className="settings-label-icon" />
                    <span>Fokus Belajar</span>
                  </label>
                  <div className="input-icon-container">
                    <select
                      className="settings-select-control"
                      value={editFocus}
                      onChange={(e) => setEditFocus(e.target.value)}
                    >
                      <option value="Sains (SAINTEK)">Sains (SAINTEK)</option>
                      <option value="Soshum (IPS)">Soshum (IPS)</option>
                      <option value="Campuran (IPC)">Campuran (IPC)</option>
                    </select>
                    <BookOpen size={16} className="input-leading-icon" />
                  </div>
                </div>
              </div>

              <div className="settings-field-group">
                <label className="settings-field-label">
                  <GraduationCap size={14} className="settings-label-icon" />
                  <span>Jenjang / Peminatan</span>
                </label>
                <div className="input-icon-container">
                  <input
                    type="text"
                    className="settings-input-control"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    placeholder="Contoh: SMA Kelas 11 / Persiapan UTBK"
                  />
                  <GraduationCap size={16} className="input-leading-icon" />
                </div>
              </div>

              <div className="settings-footer-row">
                <button 
                  type="button" 
                  className="btn-settings-cancel" 
                  onClick={() => setIsSettingsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-settings-save">
                  <Save size={16} />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
