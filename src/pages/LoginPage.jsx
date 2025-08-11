import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');
    setIsLoading(true);

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const matchedUser = users.find(
      (user) => user.username === username || user.email === username
    );

    if (!matchedUser) {
      setIsLoading(false);
      setErrorMessage("Account doesn't exist. Try signing up first.");
      return;
    }

    if (matchedUser.password !== password) {
      setIsLoading(false);
      setErrorMessage('Incorrect password for this account.');
      return;
    }

    // ✅ Login successful
    setInfoMessage('Login successful! Redirecting to homepage...');

    // ✅ Save to localStorage immediately
 ;
    const previousUser = JSON.parse(localStorage.getItem('currentUser'));
    const previousUsername = previousUser?.username;
    
    if (previousUsername && previousUsername !== matchedUser.username) {
      localStorage.removeItem(`cart-${previousUsername}`);
      localStorage.removeItem(`likedProducts-${previousUsername}`);
      localStorage.removeItem(`address-${previousUsername}`);
      localStorage.removeItem(`following-${previousUsername}`);
    }
    
    // Now save new login
    localStorage.setItem('currentUser', JSON.stringify(matchedUser));
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
    window.location.reload();
    

    // ✅ Reset form fields
    setUsername('');
    setPassword('');
    setIsLoading(false);
    setInfoMessage('Login successful! Redirecting to homepage...');

    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      setIsLoggedIn(true);
      navigate('/');
    }, 1500);
  }; // <<< 🔴 THIS WAS MISSING

  
  
  
  
  
   

  const handleGoogleLogin = () => {
    setInfoMessage('Google login is not yet implemented.');
  };

  const handleFacebookLogin = () => {
    setInfoMessage('Facebook login is not yet implemented.');
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div className="card shadow-sm p-4 rounded-4 w-100" style={{ maxWidth: '420px' }}>
        <h3 className="text-center mb-4">Welcome Back</h3>

        {errorMessage && (
          <div className="alert alert-danger rounded-3 py-2">{errorMessage}</div>
        )}
        {infoMessage && (
          <div className="alert alert-info rounded-3 py-2">{infoMessage}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username or Email</label>
            <input
              type="text"
              className="form-control rounded-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control rounded-start-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span
                className="input-group-text bg-white border-start-0 rounded-end-3"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 rounded-pill mb-3 py-2"
            disabled={isLoading}
            >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

        </form>

        <div className="text-center text-secondary my-2">or</div>

        <div className="d-grid gap-2">
          <button
            className="btn w-100 d-flex align-items-center justify-content-center gap-2 border rounded-pill py-2 bg-white shadow-sm"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} />
            <span style={{ fontWeight: 500, color: '#3c4043' }}>
              Continue with Google
            </span>
          </button>

          <button
            className="btn btn-outline-primary w-100 rounded-pill py-2"
            onClick={handleFacebookLogin}
          >
            <i className="bi bi-facebook me-2"></i>Continue with Facebook
          </button>
        </div>

        <div className="text-center mt-4">
          <small className="text-muted">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
