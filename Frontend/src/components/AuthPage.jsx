import React, { useState } from 'react';

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert(`${isSignUp ? 'Account created' : 'Signed in'} successfully!`);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="main-content" id="auth-page">
      <div className="container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-actions">
            <button type="submit" className="auth-btn primary-btn">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            <button
              type="button"
              className="auth-btn secondary-btn"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;