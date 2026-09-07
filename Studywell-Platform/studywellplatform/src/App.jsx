import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Assessment from "./pages/Assessment";
import StudyMapping from "./pages/StudyMapping";
import MonthlyEvaluation from "./pages/MonthlyEvaluation";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/features"
          element={<Features />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/assessment"
          element={<Assessment />}
        />

        <Route
          path="/study-mapping"
          element={<StudyMapping />}
        />

        <Route
          path="/monthly-evaluation"
          element={<MonthlyEvaluation />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;