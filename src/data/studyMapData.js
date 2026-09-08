/**
 * Study Mapping Hierarchy Data Structure
 * Backend & ML Integration Ready
 * 
 * Skema data hirarki ini dapat diambil langsung dari API backend / ML model
 * (misal GET /api/learning-mapping/tree) tanpa perlu merombak desain UI.
 */

export const mockStudyMapDataRegistry = {
  "user-001": {
    subjectName: "Matematika",
    stats: {
      totalMaterials: 6,
      masteredCount: 3,
      needsImprovementCount: 3
    },
    topics: [
      {
        id: "aljabar",
        name: "Aljabar Linear",
        masteryPercentage: 70,
        status: "mastered",
        subtopics: [
          { id: "pers-linear", name: "Pers. Linear", masteryPercentage: 90, status: "mastered" },
          { id: "pers-kuadrat", name: "Pers. Kuadrat", masteryPercentage: 30, status: "needs_improvement" }
        ]
      },
      {
        id: "trigonometri",
        name: "Trigonometri",
        masteryPercentage: 40,
        status: "needs_improvement",
        subtopics: [
          { id: "perbandingan", name: "Perbandingan", masteryPercentage: 40, status: "needs_improvement" },
          { id: "identitas", name: "Identitas", masteryPercentage: 40, status: "needs_improvement" }
        ]
      },
      {
        id: "geometri",
        name: "Geometri",
        masteryPercentage: 80,
        status: "mastered",
        subtopics: [
          { id: "bgn-datar", name: "Bgn. Datar", masteryPercentage: 80, status: "mastered" },
          { id: "bgn-ruang", name: "Bgn. Ruang", masteryPercentage: 70, status: "mastered" }
        ]
      }
    ]
  },
  "user-002": {
    subjectName: "Fisika & Math Lanjut",
    stats: {
      totalMaterials: 8,
      masteredCount: 6,
      needsImprovementCount: 2
    },
    topics: [
      {
        id: "mekanika",
        name: "Mekanika Klasik",
        masteryPercentage: 88,
        status: "mastered",
        subtopics: [
          { id: "hukum-newton", name: "Hukum Newton", masteryPercentage: 92, status: "mastered" },
          { id: "kinematika", name: "Kinematika", masteryPercentage: 84, status: "mastered" }
        ]
      },
      {
        id: "termodinamika",
        name: "Termodinamika",
        masteryPercentage: 82,
        status: "mastered",
        subtopics: [
          { id: "gas-ideal", name: "Gas Ideal", masteryPercentage: 85, status: "mastered" },
          { id: "kalor-usaha", name: "Kalor & Usaha", masteryPercentage: 79, status: "mastered" }
        ]
      },
      {
        id: "optik",
        name: "Gelombang & Optik",
        masteryPercentage: 55,
        status: "needs_improvement",
        subtopics: [
          { id: "gel-bunyi", name: "Gel. Bunyi", masteryPercentage: 60, status: "needs_improvement" },
          { id: "optik-fisis", name: "Optik Fisis", masteryPercentage: 50, status: "needs_improvement" }
        ]
      },
      {
        id: "elektro",
        name: "Elektromagnetik",
        masteryPercentage: 78,
        status: "mastered",
        subtopics: [
          { id: "listrik-statis", name: "Listrik Statis", masteryPercentage: 82, status: "mastered" },
          { id: "medan-magnet", name: "Medan Magnet", masteryPercentage: 74, status: "mastered" }
        ]
      }
    ]
  },
  "user-003": {
    subjectName: "Matematika & Statistik",
    stats: {
      totalMaterials: 7,
      masteredCount: 5,
      needsImprovementCount: 2
    },
    topics: [
      {
        id: "statistika",
        name: "Statistika & Peluang",
        masteryPercentage: 85,
        status: "mastered",
        subtopics: [
          { id: "pemusatan-data", name: "Pemusatan Data", masteryPercentage: 90, status: "mastered" },
          { id: "peluang", name: "Peluang Kejadian", masteryPercentage: 80, status: "mastered" }
        ]
      },
      {
        id: "matriks",
        name: "Matriks & Vektor",
        masteryPercentage: 75,
        status: "mastered",
        subtopics: [
          { id: "op-matriks", name: "Operasi Matriks", masteryPercentage: 80, status: "mastered" },
          { id: "determinan", name: "Determinan", masteryPercentage: 70, status: "mastered" }
        ]
      },
      {
        id: "trigo-lanjut",
        name: "Trigonometri Lanjut",
        masteryPercentage: 62,
        status: "needs_improvement",
        subtopics: [
          { id: "aturan-sinus", name: "Aturan Sinus", masteryPercentage: 65, status: "needs_improvement" },
          { id: "id-lanjut", name: "Identitas Lanjut", masteryPercentage: 58, status: "needs_improvement" }
        ]
      }
    ]
  }
};

export const mockStudyMapData = mockStudyMapDataRegistry["user-001"];

export const getUserStudyMapData = (userId = "user-001") => {
  return mockStudyMapDataRegistry[userId] || {
    subjectName: "Matematika (Asesmen Awal)",
    stats: {
      totalMaterials: 6,
      masteredCount: 4,
      needsImprovementCount: 2
    },
    topics: [
      {
        id: "aljabar",
        name: "Aljabar & Persamaan",
        masteryPercentage: 75,
        status: "mastered",
        subtopics: [
          { id: "pers-linear", name: "Pers. Linear", masteryPercentage: 85, status: "mastered" },
          { id: "pers-kuadrat", name: "Pers. Kuadrat", masteryPercentage: 65, status: "needs_improvement" }
        ]
      },
      {
        id: "geometri",
        name: "Geometri Dasar",
        masteryPercentage: 80,
        status: "mastered",
        subtopics: [
          { id: "bgn-datar", name: "Bgn. Datar", masteryPercentage: 85, status: "mastered" },
          { id: "bgn-ruang", name: "Bgn. Ruang", masteryPercentage: 75, status: "mastered" }
        ]
      },
      {
        id: "trigonometri",
        name: "Trigonometri",
        masteryPercentage: 48,
        status: "needs_improvement",
        subtopics: [
          { id: "perbandingan", name: "Perbandingan", masteryPercentage: 52, status: "needs_improvement" },
          { id: "identitas", name: "Identitas", masteryPercentage: 44, status: "needs_improvement" }
        ]
      }
    ]
  };
};
