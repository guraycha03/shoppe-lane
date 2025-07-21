import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function SignUpPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (pw) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(pw);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    setTimeout(() => {
      if (!validatePassword(password)) {
        setError(
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        );
        setIsSubmitting(false);
        return;
      }

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = storedUsers.find((user) => user.email === email);

      if (existingUser) {
        setError('This email is already registered. Please log in instead.');
        setIsSubmitting(false);
        return;
      }

      const newUser = { username, email, password };
      localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUserEmail', email);
      setIsLoggedIn(true);
      setSuccessMessage('Account created! You are now logged in. Redirecting to homepage...');
      
      setTimeout(() => {
        navigate('/account');
      }, 2000); // wait 2 seconds to navigate
    }, 1000); // simulate short delay
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div className="card shadow-sm p-4 rounded-4 w-100" style={{ maxWidth: '420px' }}>
        <h3 className="text-center mb-4">Create an Account</h3>

        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control rounded-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
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
                required
                disabled={isSubmitting}
              />
              <span
                className="input-group-text bg-white border-start-0 rounded-end-3"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            <small className="text-muted">
              Must include 8+ characters, uppercase, lowercase, number, and special character.
            </small>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <button
            type="submit"
            className="btn btn-success w-100 rounded-pill py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">
            Already have an account?{' '}
            <span
              style={{ color: '#198754', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Log In
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
