/**
 * StudyWell - Study Strain Score & Adaptive Learning Engine
 * 
 * Algoritma penilaian kondisi belajar berdasarkan 5 indikator check-in:
 * 1. Tidur Semalam (Bobot 30%) - 0-12 Jam (Step 30 Min)
 * 2. Beban Tugas & Deadline (Bobot 25%) - 0-100%
 * 3. Tingkat Energi Belajar (Bobot 20%) - 0-100%
 * 4. Stress Belajar (Bobot 15%) - Ya / Tidak
 * 5. Screen Time Harian (Bobot 10%) - 0-12 Jam (Step 30 Min)
 */

// Formatter Durasi khusus (misal 6.5 -> "6 Jam 30 Menit", 0.5 -> "30 Menit", 5 -> "5 Jam")
export const formatDuration = (hours) => {
  if (hours === 0 || hours === undefined || hours === null) return "0 Jam";
  const hrs = Math.floor(hours);
  const mins = Math.round((hours - hrs) * 60);
  if (hrs === 0) return `${mins} Menit`;
  if (mins === 0) return `${hrs} Jam`;
  return `${hrs} Jam ${mins} Menit`;
};

// Helper interpretasi label Beban Tugas (0-100%)
export const getWorkloadLabel = (val) => {
  if (val <= 30) return { label: "Santai", colorClass: "badge-green" };
  if (val <= 60) return { label: "Sedang", colorClass: "badge-blue" };
  if (val <= 80) return { label: "Cukup Padat", colorClass: "badge-orange" };
  return { label: "Menumpuk / Mendesak", colorClass: "badge-red" };
};

// Helper interpretasi label Tingkat Energi (0-100%)
export const getEnergyLabel = (val) => {
  if (val <= 20) return { label: "Lemah / Mengantuk", colorClass: "badge-red" };
  if (val <= 40) return { label: "Kurang Fokus", colorClass: "badge-mint" };
  if (val <= 60) return { label: "Cukup", colorClass: "badge-blue" };
  if (val <= 80) return { label: "Fokus", colorClass: "badge-green" };
  return { label: "Segar & Siap Fokus", colorClass: "badge-blue" };
};

// Kalkulasi Risiko Tidur (0-100)
export const calculateSleepRisk = (hours) => {
  if (hours >= 8) return 0;
  if (hours >= 7) return 15 - (hours - 7) * 15; // 7 -> 15, 8 -> 0
  if (hours >= 6) return 35 - (hours - 6) * 20; // 6 -> 35, 7 -> 15
  if (hours >= 5) return 60 - (hours - 5) * 25; // 5 -> 60, 6 -> 35
  if (hours >= 4) return 80 - (hours - 4) * 20; // 4 -> 80, 5 -> 60
  return 100; // < 4 jam
};

// Kalkulasi Risiko Screen Time (0-100)
export const calculateScreenTimeRisk = (hours) => {
  if (hours < 3) return 0;
  if (hours <= 5) return 20 * ((hours - 3) / 2); // 3 -> 0, 5 -> 20
  if (hours <= 7) return 20 + 20 * ((hours - 5) / 2); // 5 -> 20, 7 -> 40
  if (hours <= 8) return 40 + 20 * ((hours - 7) / 1); // 7 -> 40, 8 -> 60
  if (hours <= 10) return 60 + 20 * ((hours - 8) / 2); // 8 -> 60, 10 -> 80
  return 100; // > 10 jam
};

// 1. Normalisasi Jawaban Menjadi Risk Score (0 - 100)
export const normalizeInputs = (inputs) => {
  const { sleepHours, workloadPercentage, taskLoad, energyPercentage, energyLevel, screenTime, isStressed } = inputs;

  // A. Sleep Risk
  const sleepRisk = calculateSleepRisk(sleepHours !== undefined ? sleepHours : 6.5);

  // B. Workload Risk
  let workloadVal = 70;
  if (workloadPercentage !== undefined) {
    workloadVal = workloadPercentage;
  } else if (taskLoad !== undefined) {
    // Fallback legacy scale 1..4
    const mapLoad = { 1: 20, 2: 50, 3: 70, 4: 90 };
    workloadVal = mapLoad[taskLoad] || 70;
  }
  const workloadRisk = Math.min(100, Math.max(0, workloadVal));

  // C. Energy Risk (100 - Energy Percentage)
  let energyVal = 50;
  if (energyPercentage !== undefined) {
    energyVal = energyPercentage;
  } else if (energyLevel !== undefined) {
    // Fallback legacy scale 1..4
    const mapEnergy = { 1: 15, 2: 35, 3: 70, 4: 90 };
    energyVal = mapEnergy[energyLevel] || 50;
  }
  const energyRisk = Math.min(100, Math.max(0, 100 - energyVal));

  // D. Screen Time Risk
  const screenTimeRisk = calculateScreenTimeRisk(screenTime !== undefined ? screenTime : 6.5);

  // E. Stress Risk
  const stressRisk = isStressed ? 100 : 0;

  return {
    sleepRisk,
    workloadRisk,
    energyRisk,
    screenTimeRisk,
    stressRisk,
    rawWorkloadPercentage: workloadVal,
    rawEnergyPercentage: energyVal
  };
};

// 2. Kalkulasi Weighted Study Strain Score (0 - 100)
export const calculateStudyStrainScore = (normalized) => {
  const { sleepRisk, workloadRisk, energyRisk, stressRisk, screenTimeRisk } = normalized;

  const rawScore =
    sleepRisk * 0.30 +
    workloadRisk * 0.25 +
    energyRisk * 0.20 +
    stressRisk * 0.15 +
    screenTimeRisk * 0.10;

  return Math.min(100, Math.max(0, Math.round(rawScore)));
};

// 3. Evaluasi Level Dasar Berdasarkan Skor
export const determineConditionLevel = (score) => {
  if (score <= 24) return "OPTIMAL";
  if (score <= 44) return "STABLE";
  if (score <= 64) return "RECOVERY NEEDED";
  return "HIGH STRAIN";
};

// Legacy alias to preserve existing API contract
export const determineBaseLevel = determineConditionLevel;

// 4. Evaluasi Critical Rules (Override ke HIGH STRAIN jika memenuhi kondisi kritis)
export const checkCriticalRules = (inputs, normalized) => {
  const { sleepHours, isStressed } = inputs;
  const workloadVal = normalized.rawWorkloadPercentage !== undefined ? normalized.rawWorkloadPercentage : (inputs.workloadPercentage || 0);
  const energyVal = normalized.rawEnergyPercentage !== undefined ? normalized.rawEnergyPercentage : (inputs.energyPercentage || 50);

  const overrideReasons = [];

  // Rule 1: Jika tidur < 4 jam
  if (sleepHours < 4) {
    overrideReasons.push("Durasi tidur semalam sangat terbatas (< 4 jam)");
  }

  // Rule 2: Jika tidur <= 5 jam DAN workload >= 70%
  if (sleepHours <= 5 && workloadVal >= 70) {
    overrideReasons.push("Durasi tidur terbatas (≤ 5 jam) dan beban tugas tergolong padat (≥ 70%)");
  }

  // Rule 3: Jika Energy Percentage <= 20%
  if (energyVal <= 20) {
    overrideReasons.push("Tingkat energi belajar sangat rendah (≤ 20%)");
  }

  // Rule 4: Jika Stress = Ya DAN tidur <= 5 jam
  if (isStressed && sleepHours <= 5) {
    overrideReasons.push("Mengalami stress belajar disertai durasi tidur yang terbatas (≤ 5 jam)");
  }

  return {
    isOverridden: overrideReasons.length > 0,
    reasons: overrideReasons
  };
};

// Legacy alias to preserve existing API contract
export const evaluateCriticalRules = checkCriticalRules;

// 5. Generasi Penjelasan Transparan Penyebab Strain
export const generateExplanationText = (inputs, finalLevel, isOverridden, overrideReasons) => {
  if (isOverridden && overrideReasons.length > 0) {
    return `${overrideReasons[0]} memicu kelelahan kognitif dan meningkatkan strain belajarmu hari ini.`;
  }

  if (finalLevel === "HIGH STRAIN") {
    return "Jam tidur yang rendah dan beban tugas yang cukup padat meningkatkan strain belajarmu hari ini.";
  }
  if (finalLevel === "RECOVERY NEEDED") {
    return "Mulai terlihat indikasi kelelahan fisik dan mental. StudyWell menyesuaikan porsi belajar agar kamu tidak mudah lelah.";
  }
  if (finalLevel === "STABLE") {
    return "Kondisi belajarmu berada pada tingkat yang stabil. Tetap pertahankan keseimbangan ritme belajar dan istirahat.";
  }
  return "Kondisi fisik dan tingkat energimu sangat baik untuk menyelesaikan modul belajar hari ini.";
};

// 6. Generasi Rekomendasi Belajar Personal Adaptif
export const calculateStudyStrain = (inputs) => {
  const normalized = normalizeInputs(inputs);
  const score = calculateStudyStrainScore(normalized);
  const baseLevel = determineConditionLevel(score);
  const criticalRuleResult = checkCriticalRules(inputs, normalized);

  const finalLevel = criticalRuleResult.isOverridden ? "HIGH STRAIN" : baseLevel;
  const explanation = generateExplanationText(
    inputs,
    finalLevel,
    criticalRuleResult.isOverridden,
    criticalRuleResult.reasons
  );

  // Profile data per level
  const levelProfiles = {
    OPTIMAL: {
      code: "OPTIMAL",
      label: "Optimal",
      color: "green",
      badgeColorClass: "badge-level-green",
      emoji: "🟢",
      learningIntensity: "100%",
      focusDuration: 45,
      breakDuration: 10,
      totalDuration: 55,
      conditionText: "Kondisimu sangat baik untuk belajar dengan intensitas penuh.",
      focusTarget: "Eksplorasi materi baru & latihan soal tantangan tingkat tinggi."
    },
    STABLE: {
      code: "STABLE",
      label: "Stable",
      color: "blue",
      badgeColorClass: "badge-level-blue",
      emoji: "🔵",
      learningIntensity: "85%",
      focusDuration: 40,
      breakDuration: 10,
      totalDuration: 50,
      conditionText: "Kondisimu cukup stabil. Tetap jaga ritme belajar dan istirahat.",
      focusTarget: "Fokus pada penguatan konsep materi yang sedang dipelajari."
    },
    "RECOVERY NEEDED": {
      code: "RECOVERY NEEDED",
      label: "Recovery Needed",
      color: "orange",
      badgeColorClass: "badge-level-orange",
      emoji: "🟠",
      learningIntensity: "60%",
      focusDuration: 30,
      breakDuration: 10,
      totalDuration: 40,
      conditionText: "Mulai terlihat tanda kelelahan. StudyWell akan menurunkan intensitas belajar agar target tetap tercapai tanpa membebani mental.",
      focusTarget: "Prioritaskan 2 materi dengan learning gap terbesar."
    },
    "HIGH STRAIN": {
      code: "HIGH STRAIN",
      label: "High Strain",
      color: "red",
      badgeColorClass: "badge-level-red",
      emoji: "🔴",
      learningIntensity: "40%",
      focusDuration: 25,
      breakDuration: 10,
      totalDuration: 35,
      conditionText: "Kondisimu menunjukkan tingkat beban yang tinggi. Prioritaskan recovery dan gunakan sesi belajar yang lebih singkat.",
      focusTarget: "Prioritaskan 2 materi dengan learning gap terbesar."
    }
  };

  const currentProfile = levelProfiles[finalLevel];

  return {
    score,
    level: finalLevel,
    profile: currentProfile,
    explanation,
    isOverridden: criticalRuleResult.isOverridden,
    overrideReasons: criticalRuleResult.reasons,
    normalized
  };
};

export const generateStudyRecommendation = (level) => {
  const strainAnalysis = calculateStudyStrain({ sleepHours: 8, workloadPercentage: 10, energyPercentage: 90, screenTime: 2, isStressed: false });
  return strainAnalysis.profile;
};

