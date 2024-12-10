import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const fixedUsername = 'BrainyTest';
    const fixedPassword = 'PsychologyQuiz@2025';

    if (username === fixedUsername && password === fixedPassword) {
      onLogin(true);
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
      
      <style jsx>{`
        /* Centering the page */
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f0f0;
        }

        /* Styling the login container */
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        h2 {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }

        .login-input {
          margin: 10px 0;
          padding: 10px;
          width: 100%;
          max-width: 300px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
        }

        .login-input:focus {
          outline: none;
          border-color: #4CAF50;
        }

        .login-button {
          padding: 10px 20px;
          margin-top: 10px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          max-width: 300px;
          transition: background-color 0.3s;
        }

        .login-button:hover {
          background-color: #45a049;
        }

        .error-message {
          color: red;
          margin-top: 10px;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Login;
