/**
 * StudyWell - User Learning History & Well-being Data Service
 * API-Ready Mock Architecture for Multi-User Simulation
 * 
 * Modul ini menyimulasikan data riwayat belajar & well-being pengguna
 * yang nantinya dapat langsung dihubungkan ke endpoint API Backend:
 * GET /api/users/{userId}/learning-history
 */

// 1. Mock Users Registry
export const mockUsers = [
  {
    id: "user-001",
    name: "Fahri",
    email: "fahri@email.com",
    role: "Siswa SMA / Persiapan UTBK",
    avatar: "F",
    bio: "Fokus peningkatan Matematika & Konsistensi Belajar"
  },
  {
    id: "user-002",
    name: "Anggun",
    email: "anggun@email.com",
    role: "Siswa SMA / IPA",
    avatar: "A",
    bio: "Fokus Fisika, Kimia Organik & Persiapan Olimpiade"
  },
  {
    id: "user-003",
    name: "Fabiola",
    email: "fabiola@email.com",
    role: "Siswa SMA / Persiapan SNBP",
    avatar: "F",
    bio: "Fokus Manajemen Beban & Pencegahan Burnout"
  }
];

// 2. Mock 30-Day Learning Histories per User (Consistently structured & realistic)
// Format data per hari: { date: "YYYY-MM-DD", day: "Senin", sleepHours: number, studyDuration: number, burnout: number (1-10) }
export const mockUserHistories = {
  "user-001": [ // Fahri - Pola belajar bertahap dengan kelelahan teratur
    { date: "2026-09-02", day: "Senin", sleepHours: 8.5, studyDuration: 1.0, burnout: 2 },
    { date: "2026-09-03", day: "Selasa", sleepHours: 8.0, studyDuration: 4.5, burnout: 3 },
    { date: "2026-09-04", day: "Rabu", sleepHours: 6.5, studyDuration: 1.0, burnout: 7 },
    { date: "2026-09-05", day: "Kamis", sleepHours: 7.5, studyDuration: 3.0, burnout: 8 },
    { date: "2026-09-06", day: "Jumat", sleepHours: 8.8, studyDuration: 2.0, burnout: 5 },
    { date: "2026-09-07", day: "Sabtu", sleepHours: 5.5, studyDuration: 3.5, burnout: 1 },
    { date: "2026-09-08", day: "Minggu", sleepHours: 4.5, studyDuration: 3.2, burnout: 2 },
    { date: "2026-08-26", day: "Senin", sleepHours: 7.2, studyDuration: 2.8, burnout: 4 },
    { date: "2026-08-27", day: "Selasa", sleepHours: 6.8, studyDuration: 3.5, burnout: 6 },
    { date: "2026-08-28", day: "Rabu", sleepHours: 8.1, studyDuration: 2.0, burnout: 3 },
    { date: "2026-08-29", day: "Kamis", sleepHours: 7.0, studyDuration: 4.0, burnout: 7 },
    { date: "2026-08-30", day: "Jumat", sleepHours: 6.0, studyDuration: 3.2, burnout: 5 },
    { date: "2026-08-31", day: "Sabtu", sleepHours: 8.5, studyDuration: 1.5, burnout: 2 },
    { date: "2026-09-01", day: "Minggu", sleepHours: 7.8, studyDuration: 2.2, burnout: 3 },
  ],
  "user-002": [ // Anggun - Konsistensi tinggi & pola tidur sangat teratur
    { date: "2026-09-02", day: "Senin", sleepHours: 7.8, studyDuration: 3.2, burnout: 2 },
    { date: "2026-09-03", day: "Selasa", sleepHours: 8.0, studyDuration: 3.5, burnout: 3 },
    { date: "2026-09-04", day: "Rabu", sleepHours: 7.5, studyDuration: 4.0, burnout: 3 },
    { date: "2026-09-05", day: "Kamis", sleepHours: 7.2, studyDuration: 3.8, burnout: 4 },
    { date: "2026-09-06", day: "Jumat", sleepHours: 8.2, studyDuration: 2.5, burnout: 2 },
    { date: "2026-09-07", day: "Sabtu", sleepHours: 8.5, studyDuration: 2.0, burnout: 1 },
    { date: "2026-09-08", day: "Minggu", sleepHours: 7.6, studyDuration: 3.0, burnout: 2 },
    { date: "2026-08-26", day: "Senin", sleepHours: 7.5, studyDuration: 3.0, burnout: 3 },
    { date: "2026-08-27", day: "Selasa", sleepHours: 7.8, studyDuration: 3.8, burnout: 4 },
    { date: "2026-08-28", day: "Rabu", sleepHours: 8.0, studyDuration: 3.2, burnout: 2 },
    { date: "2026-08-29", day: "Kamis", sleepHours: 7.0, studyDuration: 4.2, burnout: 5 },
    { date: "2026-08-30", day: "Jumat", sleepHours: 7.4, studyDuration: 3.5, burnout: 3 },
    { date: "2026-08-31", day: "Sabtu", sleepHours: 8.2, studyDuration: 1.8, burnout: 1 },
    { date: "2026-09-01", day: "Minggu", sleepHours: 7.9, studyDuration: 2.5, burnout: 2 },
  ],
  "user-003": [ // Fabiola - Durasi belajar tinggi, pola tidur bervariasi
    { date: "2026-09-02", day: "Senin", sleepHours: 6.2, studyDuration: 5.0, burnout: 6 },
    { date: "2026-09-03", day: "Selasa", sleepHours: 5.8, studyDuration: 6.2, burnout: 8 },
    { date: "2026-09-04", day: "Rabu", sleepHours: 7.5, studyDuration: 3.5, burnout: 4 },
    { date: "2026-09-05", day: "Kamis", sleepHours: 8.2, studyDuration: 2.8, burnout: 2 },
    { date: "2026-09-06", day: "Jumat", sleepHours: 5.0, studyDuration: 5.8, burnout: 9 },
    { date: "2026-09-07", day: "Sabtu", sleepHours: 9.0, studyDuration: 2.0, burnout: 3 },
    { date: "2026-09-08", day: "Minggu", sleepHours: 7.2, studyDuration: 4.0, burnout: 5 },
    { date: "2026-08-26", day: "Senin", sleepHours: 7.0, studyDuration: 4.5, burnout: 5 },
    { date: "2026-08-27", day: "Selasa", sleepHours: 6.5, studyDuration: 5.0, burnout: 7 },
    { date: "2026-08-28", day: "Rabu", sleepHours: 8.0, studyDuration: 3.0, burnout: 3 },
    { date: "2026-08-29", day: "Kamis", sleepHours: 5.5, studyDuration: 6.0, burnout: 8 },
    { date: "2026-08-30", day: "Jumat", sleepHours: 7.2, studyDuration: 4.2, burnout: 4 },
    { date: "2026-08-31", day: "Sabtu", sleepHours: 8.8, studyDuration: 2.5, burnout: 2 },
    { date: "2026-09-01", day: "Minggu", sleepHours: 6.8, studyDuration: 3.8, burnout: 5 },
  ]
};

// Internal mutable state in memory for live updates during session
let inMemoryHistories = { ...mockUserHistories };

/**
 * Simulates fetching learning history for a specific user and timeframe
 * Equivalent to: GET /api/users/{userId}/learning-history?timeframe={timeframe}
 */
export const getUserLearningHistory = (userId = "user-001", timeframe = "7hari") => {
  const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
  const fullHistory = inMemoryHistories[userId] || mockUserHistories["user-001"];

  let slicedData = [...fullHistory];
  if (timeframe === "7hari") {
    slicedData = fullHistory.slice(0, 7);
  } else if (timeframe === "14hari") {
    slicedData = fullHistory.slice(0, 14);
  } else if (timeframe === "bulanini") {
    slicedData = fullHistory.slice(0, 30);
  }

  return {
    userId: user.id,
    userName: user.name,
    timeframe,
    data: slicedData
  };
};

/**
 * Calculates summary metrics dynamically based on history dataset
 */
export const calculateHistoryMetrics = (historyData = []) => {
  if (!historyData || historyData.length === 0) {
    return {
      avgSleep: 0,
      sleepBadgeText: "Belum ada data",
      sleepBadgeClass: "chip-amber-soft",
      avgStudy: 0,
      studyBadgeText: "Belum ada data",
      studyBadgeClass: "chip-green-soft",
      readinessCount: 0,
      totalDays: 0,
      readinessBadgeText: "Belum ada data",
      readinessBadgeClass: "chip-blue-soft"
    };
  }

  const totalDays = historyData.length;
  const totalSleep = historyData.reduce((acc, curr) => acc + (curr.sleepHours || 0), 0);
  const totalStudy = historyData.reduce((acc, curr) => acc + (curr.studyDuration || 0), 0);

  const avgSleep = parseFloat((totalSleep / totalDays).toFixed(1));
  const avgStudy = parseFloat((totalStudy / totalDays).toFixed(1));

  // Readiness criteria: sleep >= 6.5 hrs AND burnout <= 5
  const readyDaysCount = historyData.filter(
    item => item.sleepHours >= 6.5 && item.burnout <= 5
  ).length;

  // Sleep Badge
  let sleepBadgeText = "Ideal (≥7Jam)";
  let sleepBadgeClass = "chip-green-soft";
  if (avgSleep < 7.0) {
    sleepBadgeText = "Dibawah Ideal (<7Jam)";
    sleepBadgeClass = "chip-amber-soft";
  }

  // Study Badge
  let studyBadgeText = "Beban Seimbang";
  let studyBadgeClass = "chip-green-soft";
  if (avgStudy > 3.5) {
    studyBadgeText = "Tinggi (>3.5Jam)";
    studyBadgeClass = "chip-amber-soft";
  } else if (avgStudy < 1.5) {
    studyBadgeText = "Ringan (<1.5Jam)";
    studyBadgeClass = "chip-blue-soft";
  }

  // Readiness Badge
  const readinessRatio = readyDaysCount / totalDays;
  let readinessBadgeText = "Zona Aman (Low-Mod Risk)";
  let readinessBadgeClass = "chip-blue-soft";
  if (readinessRatio < 0.5) {
    readinessBadgeText = "Zona Waspada (High Risk)";
    readinessBadgeClass = "chip-amber-soft";
  }

  return {
    avgSleep: avgSleep.toString().replace('.', ','),
    sleepBadgeText,
    sleepBadgeClass,
    avgStudy: avgStudy.toString().replace('.', ','),
    studyBadgeText,
    studyBadgeClass,
    readinessCount: readyDaysCount,
    totalDays,
    readinessBadgeText,
    readinessBadgeClass
  };
};

/**
 * Saves a new daily check-in result into the user's active history dataset
 */
export const saveCheckinToHistory = (userId, checkinData) => {
  const userHistory = inMemoryHistories[userId] ? [...inMemoryHistories[userId]] : [];
  
  // Calculate study duration based on workload % (e.g. 70% ~ 3.5 hrs)
  const estimatedStudyHours = parseFloat((checkinData.workloadPercentage * 0.05).toFixed(1));
  const burnoutScore = checkinData.isStressed ? 8 : (checkinData.energyPercentage < 40 ? 6 : 2);

  const todayRecord = {
    date: new Date().toISOString().split('T')[0],
    day: "Hari ini",
    sleepHours: parseFloat(checkinData.sleepHours.toFixed(1)),
    studyDuration: estimatedStudyHours,
    burnout: burnoutScore
  };

  // Replace today's record if it exists, or prepend
  userHistory[0] = todayRecord;
  inMemoryHistories[userId] = userHistory;

  return userHistory;
};

export const userReadinessRegistry = {
  "user-001": {
    readinessLabel: "Level Beban: Butuh Pemulihan",
    readinessSubtext: "Tidur: 5 Jam • Energi: Rendah",
    readinessDesc: "StudyWell membatasi durasi belajarmu hari ini maksimal 35 menit agar materi tetap terserap optimal.",
    focusDuration: 25,
    breakDuration: 10,
    streakDays: 4,
    reassessmentDays: 18,
    inhibitorText: "Dideteksi sebagai penghambat pemahaman materi Kalkulus."
  },
  "user-002": {
    readinessLabel: "Level Beban: Optimal & Prima",
    readinessSubtext: "Tidur: 8 Jam • Energi: Tinggi",
    readinessDesc: "Kondisi fisikmu sangat prima! Sesi fokus hingga 45 menit disarankan untuk hasil maksimal.",
    focusDuration: 45,
    breakDuration: 15,
    streakDays: 8,
    reassessmentDays: 12,
    inhibitorText: "Dideteksi sebagai penghambat pemahaman materi Fisika Kuantum."
  },
  "user-003": {
    readinessLabel: "Level Beban: Moderat (Stabil)",
    readinessSubtext: "Tidur: 6.8 Jam • Energi: Sedang",
    readinessDesc: "Ritme fisikmu seimbang. Sesi fokus 35 menit dengan jeda pemulihan 10 menit sangat direkomendasikan.",
    focusDuration: 35,
    breakDuration: 10,
    streakDays: 6,
    reassessmentDays: 15,
    inhibitorText: "Dideteksi sebagai penghambat pemahaman materi Limit & Turunan."
  }
};

export const getUserReadinessProfile = (userId = "user-001") => {
  return userReadinessRegistry[userId] || {
    readinessLabel: "Level Beban: Seimbang",
    readinessSubtext: "Tidur: 7.5 Jam • Energi: Cukup",
    readinessDesc: "Kondisi belajarmu dalam zona aman. Sesi fokus 30 menit siap dimulai.",
    focusDuration: 30,
    breakDuration: 10,
    streakDays: 5,
    reassessmentDays: 20,
    inhibitorText: "Dideteksi sebagai fokus materi yang perlu ditingkatkan."
  };
};
