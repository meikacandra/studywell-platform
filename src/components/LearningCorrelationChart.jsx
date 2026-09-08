import React, { useState } from "react";

/**
 * LearningCorrelationChart Component
 * Pure SVG data-driven chart visualizing sleep, study duration, and burnout correlations.
 * Accepts dynamic history data array without hardcoded coordinates.
 */
const LearningCorrelationChart = ({ data = [], title = "Korelasi Jam Tidur vs Durasi Belajar" }) => {
  const [activeHover, setActiveHover] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="hist-chart-card">
        <h3 className="chart-card-title">{title}</h3>
        <p className="no-data-msg" style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>
          Tidak ada data riwayat tersedia.
        </p>
      </div>
    );
  }

  // SVG Dimension & Grid Parameters (Matches existing StudyWell SVG Spec)
  const svgWidth = 700;
  const svgHeight = 220;
  const zeroY = 180;
  const topY = 30;
  const availableHeight = zeroY - topY; // 150px range for 0-10 scale
  const scaleUnit = availableHeight / 10; // 15px per unit

  // Dynamic Horizontal Spacing
  const minX = 80;
  const maxX = 590;
  const itemCount = data.length;
  const stepX = itemCount > 1 ? (maxX - minX) / (itemCount - 1) : 0;

  // Process data points into SVG coordinates
  const chartPoints = data.map((item, idx) => {
    const cx = itemCount === 1 ? (minX + maxX) / 2 : minX + idx * stepX;
    
    // Scale Values (Clamped to 0-10 for SVG rendering)
    const sleepVal = Math.min(Math.max(item.sleepHours || 0, 0), 10);
    const studyVal = Math.min(Math.max(item.studyDuration || 0, 0), 10);
    const burnoutVal = Math.min(Math.max(item.burnout || 0, 0), 10);

    const sleepY = zeroY - sleepVal * scaleUnit;
    const studyHeight = Math.max(studyVal * scaleUnit, 4); // Min 4px height for visibility
    const burnoutHeight = Math.max(burnoutVal * scaleUnit, 4);

    return {
      raw: item,
      day: item.day || `Hari ${idx + 1}`,
      x: cx,
      sleepY,
      studyHeight,
      burnoutHeight,
      sleepVal: item.sleepHours,
      studyVal: item.studyDuration,
      burnoutVal: item.burnout
    };
  });

  // Dynamic Line Path for Sleep Hours
  const pathD = chartPoints.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.sleepY}` : `${acc} L ${pt.x} ${pt.sleepY}`;
  }, "");

  return (
    <div className="hist-chart-card">
      <div className="chart-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="chart-card-title">{title}</h3>
      </div>

      <div className="chart-svg-container" style={{ position: "relative" }}>
        <svg className="hist-svg" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          {/* Horizontal Axis Grid Lines */}
          <line x1="40" y1="30" x2="670" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="40" y1="80" x2="670" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="40" y1="130" x2="670" y2="130" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="40" y1="180" x2="670" y2="180" stroke="#e2e8f0" />

          {/* Y-Axis Left Labels */}
          <text x="20" y="34" fill="#94a3b8" fontSize="11">10</text>
          <text x="20" y="84" fill="#94a3b8" fontSize="11">8</text>
          <text x="20" y="134" fill="#94a3b8" fontSize="11">6</text>
          <text x="20" y="184" fill="#94a3b8" fontSize="11">0</text>

          {/* Y-Axis Right Labels */}
          <text x="680" y="34" fill="#94a3b8" fontSize="11">10</text>
          <text x="680" y="84" fill="#94a3b8" fontSize="11">8</text>
          <text x="680" y="134" fill="#94a3b8" fontSize="11">3</text>
          <text x="680" y="184" fill="#94a3b8" fontSize="11">0</text>

          {/* Dynamic Dual Bar Chart (Durasi Belajar + Burnout) */}
          {chartPoints.map((pt, idx) => (
            <g 
              key={`group-${idx}`}
              onMouseEnter={() => setActiveHover(pt)}
              onMouseLeave={() => setActiveHover(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Study Duration Bar (Purple) */}
              <rect
                x={pt.x - 22}
                y={zeroY - pt.studyHeight}
                width="20"
                height={pt.studyHeight}
                fill="#a78bfa"
                rx="4"
                style={{ transition: "all 0.2s ease" }}
              />
              
              {/* Burnout Bar (Coral/Red Soft) */}
              <rect
                x={pt.x + 2}
                y={zeroY - pt.burnoutHeight}
                width="20"
                height={pt.burnoutHeight}
                fill="#fca5a5"
                rx="4"
                style={{ transition: "all 0.2s ease" }}
              />

              {/* Day Label */}
              <text 
                x={pt.x} 
                y="205" 
                fill={activeHover?.day === pt.day ? "#0f172a" : "#64748b"} 
                fontSize="11" 
                fontWeight={activeHover?.day === pt.day ? "700" : "500"}
                textAnchor="middle"
              >
                {pt.day}
              </text>
            </g>
          ))}

          {/* Dynamic Sleep Line Path (Cyan) */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              style={{ transition: "d 0.3s ease" }}
            />
          )}

          {/* Sleep Dots / Points */}
          {chartPoints.map((pt, idx) => (
            <circle
              key={`dot-${idx}`}
              cx={pt.x}
              cy={pt.sleepY}
              r={activeHover?.day === pt.day ? "6" : "4"}
              fill="#ffffff"
              stroke="#06b6d4"
              strokeWidth={activeHover?.day === pt.day ? "3" : "2"}
              onMouseEnter={() => setActiveHover(pt)}
              onMouseLeave={() => setActiveHover(null)}
              style={{ cursor: "pointer", transition: "all 0.15s ease" }}
            />
          ))}
        </svg>

        {/* Dynamic Tooltip Popup on Hover */}
        {activeHover && (
          <div 
            className="chart-tooltip-popup"
            style={{
              position: "absolute",
              left: `${(activeHover.x / svgWidth) * 100}%`,
              top: "10px",
              transform: "translateX(-50%)",
              backgroundColor: "#0f172a",
              color: "#ffffff",
              padding: "8px 14px",
              borderRadius: "10px",
              fontSize: "0.78rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              pointerEvents: "none",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              whiteSpace: "nowrap"
            }}
          >
            <div style={{ fontWeight: 700, color: "#38bdf8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "3px" }}>
              {activeHover.day} ({activeHover.raw.date || "Riwayat"})
            </div>
            <div>💤 Tidur: <strong>{activeHover.sleepVal} Jam</strong></div>
            <div>📚 Belajar: <strong>{activeHover.studyVal} Jam</strong></div>
            <div>🔥 Burnout: <strong>{activeHover.burnoutVal} / 10</strong></div>
          </div>
        )}

        {/* Chart Legend Row */}
        <div className="chart-legend-row">
          <span className="chart-legend-item">
            <span className="legend-box box-purple" /> Durasi Belajar
          </span>
          <span className="chart-legend-item">
            <span className="legend-box box-coral" /> Burnout
          </span>
          <span className="chart-legend-item">
            <span className="legend-circle dot-cyan" /> Jam Tidur
          </span>
        </div>
      </div>
    </div>
  );
};

export default LearningCorrelationChart;
