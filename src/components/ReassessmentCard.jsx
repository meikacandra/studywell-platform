import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Award, FileText, ArrowRight } from "lucide-react";
import "./ReassessmentCard.css";

const ReassessmentCard = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default ReassessmentCard;
