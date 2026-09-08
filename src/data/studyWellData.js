/**
 * StudyWell - Single Source of Truth Mock Data & Integration Service
 * Backend & Machine Learning Integration Ready
 * 
 * Modul ini menjadi SATU-SATUNYA sumber data terpusat untuk:
 * 1. Peta Belajarmu (Pemetaan Awal & Hirarki Prasyarat)
 * 2. Peta Pemahaman & Progres Belajar (Tingkat Penguasaan & Riwayat Perkembangan)
 * 3. Daily Well-being Check-in (Kondisi Fisik & Strain Score)
 * 4. Rekomendasi Belajar Adaptif (Materi Prioritas + Durasi Sesi)
 */

// 1. Single Source of Truth Dataset Materi & Progress
export const initialMaterials = [
  {
    id: "mat-001",
    name: "Aljabar Dasar",
    code: "x²",
    mastery: 85,
    status: "tuntas", // 'tuntas' (>=75%) | 'perlu_penguatan' (50-74%) | 'learning_gap' (0-49%) | 'terkunci'
    statusLabel: "Sangat Baik",
    color: "#16a34a",
    prerequisites: [],
    history: [
      { week: "Minggu 1", mastery: 60 },
      { week: "Minggu 2", mastery: 72 },
      { week: "Minggu 3", mastery: 80 },
      { week: "Minggu 4", mastery: 85 }
    ]
  },
  {
    id: "mat-002",
    name: "Sistem Persamaan",
    code: "=",
    mastery: 78,
    status: "tuntas",
    statusLabel: "Baik",
    color: "#16a34a",
    prerequisites: ["mat-001"],
    history: [
      { week: "Minggu 1", mastery: 50 },
      { week: "Minggu 2", mastery: 64 },
      { week: "Minggu 3", mastery: 70 },
      { week: "Minggu 4", mastery: 78 }
    ]
  },
  {
    id: "mat-003",
    name: "Fungsi & Relasi",
    code: "f(x)",
    mastery: 42,
    status: "learning_gap",
    statusLabel: "Perlu Perbaikan",
    color: "#dc2626",
    isPriority: true, // Auto-flagged by ML/Backend as priority learning gap
    prerequisites: ["mat-002"],
    history: [
      { week: "Minggu 1", mastery: 15 },
      { week: "Minggu 2", mastery: 30 },
      { week: "Minggu 3", mastery: 38 },
      { week: "Minggu 4", mastery: 42 }
    ]
  },
  {
    id: "mat-004",
    name: "Kalkulus Dasar",
    code: "∫",
    mastery: 0,
    status: "terkunci",
    statusLabel: "Terkunci",
    color: "#94a3b8",
    prerequisites: ["mat-003"],
    history: []
  }
];

export const userMaterialsRegistry = {
  "user-001": initialMaterials,
  "user-002": [
    {
      id: "mat-001",
      name: "Vektor & Kinematika",
      code: "v⃗",
      mastery: 92,
      status: "tuntas",
      statusLabel: "Sangat Baik",
      color: "#16a34a",
      prerequisites: [],
      history: [
        { week: "Minggu 1", mastery: 75 },
        { week: "Minggu 2", mastery: 84 },
        { week: "Minggu 3", mastery: 89 },
        { week: "Minggu 4", mastery: 92 }
      ]
    },
    {
      id: "mat-002",
      name: "Hukum Newton",
      code: "F=ma",
      mastery: 88,
      status: "tuntas",
      statusLabel: "Sangat Baik",
      color: "#16a34a",
      prerequisites: ["mat-001"],
      history: [
        { week: "Minggu 1", mastery: 70 },
        { week: "Minggu 2", mastery: 78 },
        { week: "Minggu 3", mastery: 84 },
        { week: "Minggu 4", mastery: 88 }
      ]
    },
    {
      id: "mat-003",
      name: "Termodinamika",
      code: "ΔU",
      mastery: 82,
      status: "tuntas",
      statusLabel: "Baik",
      color: "#16a34a",
      prerequisites: ["mat-002"],
      history: [
        { week: "Minggu 1", mastery: 65 },
        { week: "Minggu 2", mastery: 72 },
        { week: "Minggu 3", mastery: 78 },
        { week: "Minggu 4", mastery: 82 }
      ]
    },
    {
      id: "mat-004",
      name: "Optik Fisis & Gelombang",
      code: "λ",
      mastery: 52,
      status: "learning_gap",
      statusLabel: "Perlu Perbaikan",
      color: "#dc2626",
      isPriority: true,
      prerequisites: ["mat-003"],
      history: [
        { week: "Minggu 1", mastery: 30 },
        { week: "Minggu 2", mastery: 42 },
        { week: "Minggu 3", mastery: 48 },
        { week: "Minggu 4", mastery: 52 }
      ]
    },
    {
      id: "mat-005",
      name: "Fisika Kuantum & Atom",
      code: "E=hf",
      mastery: 0,
      status: "terkunci",
      statusLabel: "Terkunci",
      color: "#94a3b8",
      prerequisites: ["mat-004"],
      history: []
    }
  ],
  "user-003": [
    {
      id: "mat-001",
      name: "Statistika Dasar",
      code: "x̄",
      mastery: 90,
      status: "tuntas",
      statusLabel: "Sangat Baik",
      color: "#16a34a",
      prerequisites: [],
      history: [
        { week: "Minggu 1", mastery: 70 },
        { week: "Minggu 2", mastery: 80 },
        { week: "Minggu 3", mastery: 86 },
        { week: "Minggu 4", mastery: 90 }
      ]
    },
    {
      id: "mat-002",
      name: "Matriks & Determinasi",
      code: "[A]",
      mastery: 82,
      status: "tuntas",
      statusLabel: "Baik",
      color: "#16a34a",
      prerequisites: ["mat-001"],
      history: [
        { week: "Minggu 1", mastery: 60 },
        { week: "Minggu 2", mastery: 70 },
        { week: "Minggu 3", mastery: 76 },
        { week: "Minggu 4", mastery: 82 }
      ]
    },
    {
      id: "mat-003",
      name: "Logika Matematika",
      code: "p→q",
      mastery: 76,
      status: "tuntas",
      statusLabel: "Baik",
      color: "#16a34a",
      prerequisites: ["mat-002"],
      history: [
        { week: "Minggu 1", mastery: 55 },
        { week: "Minggu 2", mastery: 65 },
        { week: "Minggu 3", mastery: 72 },
        { week: "Minggu 4", mastery: 76 }
      ]
    },
    {
      id: "mat-004",
      name: "Trigonometri Lanjut",
      code: "sin2x",
      mastery: 62,
      status: "perlu_penguatan",
      statusLabel: "Perlu Penguatan",
      color: "#ea580c",
      isPriority: true,
      prerequisites: ["mat-003"],
      history: [
        { week: "Minggu 1", mastery: 40 },
        { week: "Minggu 2", mastery: 48 },
        { week: "Minggu 3", mastery: 55 },
        { week: "Minggu 4", mastery: 62 }
      ]
    },
    {
      id: "mat-005",
      name: "Limit & Turunan",
      code: "lim",
      mastery: 0,
      status: "terkunci",
      statusLabel: "Terkunci",
      color: "#94a3b8",
      prerequisites: ["mat-004"],
      history: []
    }
  ]
};

export const getUserMaterials = (userId = "user-001") => {
  return userMaterialsRegistry[userId] || initialMaterials;
};

// Helper menentukan status berdasarkan nilai penguasaan (mastery)
export const determineMaterialStatus = (mastery, isLocked = false) => {
  if (isLocked) return { status: "terkunci", label: "Terkunci (Prasyarat Belum Lengkap)", color: "#94a3b8" };
  if (mastery >= 75) return { status: "tuntas", label: "Tuntas (≥75%)", color: "#16a34a" };
  if (mastery >= 50) return { status: "perlu_penguatan", label: "Perlu Penguatan (50-74%)", color: "#ea580c" };
  return { status: "learning_gap", label: "Learning Gap (<50%)", color: "#dc2626" };
};

// Helper mencari materi prioritas yang memiliki penguasaan terendah (Learning Gap Utama)
export const getPriorityMaterial = (materials = initialMaterials) => {
  const learningGaps = materials.filter(m => m.status === "learning_gap");
  if (learningGaps.length > 0) {
    // Sort by lowest mastery
    return learningGaps.sort((a, b) => a.mastery - b.mastery)[0];
  }
  const needsImprovement = materials.filter(m => m.status === "perlu_penguatan");
  if (needsImprovement.length > 0) {
    return needsImprovement.sort((a, b) => a.mastery - b.mastery)[0];
  }
  return materials[0];
};

// 2. Fungsi Generator Rekomendasi Terintegrasi (Learning Gap + Well-being = Rekomendasi Adaptif)
export const generateIntegratedRecommendation = (strainProfile, materials = initialMaterials) => {
  const priority = getPriorityMaterial(materials);
  
  return {
    priorityMaterialName: priority.name,
    priorityMastery: priority.mastery,
    focusDuration: strainProfile.focusDuration,
    breakDuration: strainProfile.breakDuration,
    totalDuration: strainProfile.totalDuration,
    learningIntensity: strainProfile.learningIntensity,
    strainLevel: strainProfile.code,
    // Pesan rekomendasi gabungan presisi
    recommendationText: `Fokus pada materi ${priority.name} (Penguasaan: ${priority.mastery}%) selama ${strainProfile.focusDuration} menit, kemudian istirahat ${strainProfile.breakDuration} menit.`
  };
};
