// AuthLog.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./SignUp";
import "./auth.css";

function AuthLog() {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate("/postmedia");
  };

  return (
    <div className="auth-log-container">
      <div className={`auth-card ${isSignup ? "signup-active" : "login-active"}`}>
        <div className="auth-card-inner">
          <div className="auth-card-front">
            {!isSignup && <Login onLoginSuccess={handleAuthSuccess} />}
          </div>
          <div className="auth-card-back">
            {isSignup && <Signup onSignupSuccess={handleAuthSuccess} />}
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsSignup(!isSignup)}
        className="auth-toggle-button"
      >
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Signup"}
      </button>
    </div>
  );
}

export default AuthLog;