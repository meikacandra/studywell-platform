import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Untuk sementara, setelah daftar langsung ke Login
    navigate("/login");
  };

  return (
    <div className="auth-page">

      {/* Top Bar */}
      <div className="auth-topbar">
        <button onClick={() => navigate("/")}>‹</button>
      </div>

      {/* Register Card */}
      <div className="auth-card register-card">

        <h1>REGISTER</h1>

        <p className="auth-subtitle">
          Please register to Login
        </p>

        <form onSubmit={handleRegister}>

          <label>Name</label>
          <input
            type="text"
            required
          />

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

          <label>Konfirmasi Password</label>
          <input
            type="password"
           
            required
          />

          <button type="submit" className="auth-button">
            Daftar
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;