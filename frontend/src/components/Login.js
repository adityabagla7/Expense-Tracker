import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/main');
  };

  return (
    <div className="login-container">
      <h1>Expense Tracker</h1>
      <img src="https://shorturl.at/z8ARn" alt="Expense Tracker" className="login-image" />
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="button" onClick={handleLogin} className="login-button">Signin/Signup</button>
      </form>
    </div>
  );
}

export default Login;


