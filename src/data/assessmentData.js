/**
 * Assessment & Evaluation Mock Data Structure
 * Backend & ML Integration Ready
 * 
 * Skema data ini dapat dihubungkan langsung ke API backend (misal GET /api/assessment/questions)
 * oleh tim backend/ML tanpa perlu mengubah struktur UI frontend.
 */

export const mockLearningGapQuestions = [
  {
    id: 1,
    number: 1,
    category: "Aljabar Linear",
    questionText: "Jika 2x + 5 = 15, maka nilai x adalah...",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "5" },
      { id: "C", text: "7" },
      { id: "D", text: "10" }
    ],
    correctAnswer: "B"
  },
  {
    id: 2,
    number: 2,
    category: "Aljabar Linear",
    questionText: "Hasil penyederhanaan dari 3(x + 4) - 2x adalah...",
    options: [
      { id: "A", text: "x + 12" },
      { id: "B", text: "x + 4" },
      { id: "C", text: "5x + 12" },
      { id: "D", text: "x - 12" }
    ],
    correctAnswer: "A"
  },
  {
    id: 3,
    number: 3,
    category: "Aljabar Linear",
    questionText: "Persamaan garis yang melalui titik (0,0) dengan gradien 3 adalah...",
    options: [
      { id: "A", text: "y = 3x" },
      { id: "B", text: "y = x + 3" },
      { id: "C", text: "y = 3" },
      { id: "D", text: "x = 3y" }
    ],
    correctAnswer: "A"
  },
  {
    id: 4,
    number: 4,
    category: "Aljabar Linear",
    questionText: "Nilai y dari sistem persamaan x + y = 6 dan x - y = 2 adalah...",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "1" }
    ],
    correctAnswer: "B"
  },
  {
    id: 5,
    number: 5,
    category: "Aljabar Linear",
    questionText: "Jika 5x + 3 = 11, maka nilai dari 4x - 5 adalah...",
    options: [
      { id: "A", text: "1,6" },
      { id: "B", text: "1,4" },
      { id: "C", text: "2,1" },
      { id: "D", text: "4,5" }
    ],
    correctAnswer: "B"
  },
  // Generasi otomatis untuk nomor 6 s/d 20 agar navigasi 1-20 lengkap & siap dipasang data API backend
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    number: i + 6,
    category: i + 6 <= 10 ? "Aljabar Linear" : i + 6 <= 15 ? "Trigonometri" : "Geometri",
    questionText: `Soal Latihan No. ${i + 6}: Berapakah hasil perhitungan nilai dari persamaan variabel berikut?`,
    options: [
      { id: "A", text: `${(i + 1) * 2}` },
      { id: "B", text: `${(i + 1) * 3}` },
      { id: "C", text: `${(i + 1) * 4}` },
      { id: "D", text: `${(i + 1) * 5}` }
    ],
    correctAnswer: "A"
  }))
];

export const mockMonthlyEvaluationQuestions = mockLearningGapQuestions.map(q => ({
  ...q,
  category: q.number <= 7 ? "Evaluasi Aljabar" : q.number <= 14 ? "Evaluasi Trigonometri" : "Evaluasi Geometri"
}));
