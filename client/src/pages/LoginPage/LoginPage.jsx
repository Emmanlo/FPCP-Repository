import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';


// eslint-disable-next-line react/prop-types
const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can replace this with real authentication later
    if (username && password) {
      onLogin();               // Update parent state
      navigate('/leaders');    // <-- ✅ Go to home page
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-welcome">
          <h1 className="brand">GO FOR THE <br /><span>GREAT HARVEST</span></h1>
          <p className="verse">
            “The harvest is plentiful, but the workers are few.”<br />
            <strong>Luke 10:2 NIV</strong>
          </p>
        </div>
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
