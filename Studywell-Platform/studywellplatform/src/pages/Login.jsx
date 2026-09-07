import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import googleLogo from "../assets/google.png";
import appleLogo from "../assets/apple.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Untuk sementara langsung ke Assessment
    navigate("/assessment");
  };

  return (
    <div className="auth-page">

      {/* Navbar */}
      <div className="auth-navbar">
        <Link to="/" className="back-button">
          ‹
        </Link>
      </div>

      {/* Login Card */}
      <div className="auth-card">

        <h1>WELCOME BACK!</h1>

        <p className="auth-subtitle">
          Please login to your account
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="forgot-password">
            <a href="#">
              Forgot Password?
            </a>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

        {/* Divider */}
        <div className="divider">
          <span>or sign with</span>
        </div>

        {/* Google & Apple */}
        <div className="social-login">

          <button
            type="button"
            className="social-button"
          >
            <img
              src={googleLogo}
              alt="Google"
            />
          </button>

          <button
            type="button"
            className="social-button"
          >
            <img
              src={appleLogo}
              alt="Apple"
            />
          </button>

        </div>

      </div>
    </div>
  );
}

export default Login;