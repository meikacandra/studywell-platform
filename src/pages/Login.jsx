import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Setelah login langsung ke Dashboard Utama
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      {/* Top Bar */}
      <div className="auth-topbar">
        <button onClick={() => navigate("/")}>‹</button>
      </div>

      {/* Login Card */}
      <div className="auth-card">

        <h1>WELCOME BACK!</h1>

        <p className="auth-subtitle">
          Please login to your account
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>
          <input
            type="email"
            required
          />

          <label>Password</label>
          <input
            type="password"
          
            required
          />

          <a href="#!" className="forgot">
            Forgot Password?
          </a>

          <button type="submit" className="auth-button">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

        <div className="or">
          <span>or Sign in with</span>
        </div>

        <div className="social-buttons">
          <button type="button">G</button>
          <button type="button"></button>
        </div>

      </div>

    </div>
  );
}

export default Login;