import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Add some basic styling

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/main');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Username</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;


