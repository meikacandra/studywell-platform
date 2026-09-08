import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import "./App.css";

// Page buatan tim FE sebelumnya
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Assessment from "./pages/Assessment";
import MonthlyEvaluation from "./pages/MonthlyEvaluation";

// Page fitur baru StudyWell
import Dashboard from "./pages/Dashboard";
import StudyMapping from "./pages/StudyMapping";
import Wellbeing from "./pages/Wellbeing";
import Profile from "./pages/Profile";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Dashboard & Fitur Utama */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study-mapping" element={<StudyMapping />} />
          <Route path="/wellbeing" element={<Wellbeing />} />
          <Route path="/well-being" element={<Wellbeing />} />
          <Route path="/profile" element={<Profile />} />

          {/* Halaman Landing, Auth & Evaluasi dari Tim FE */}
          <Route path="/landing" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/monthly-evaluation" element={<MonthlyEvaluation />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;