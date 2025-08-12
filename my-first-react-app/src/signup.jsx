import React, { useState } from 'react';
import './signup.css';
import profileImg from './motor.png'; // Use the same profile image or replace
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate() ;
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || 'Signup successful! Please log in.');
      // Optionally navigate to login
      navigate('/login');
    } else {
      alert(data.message || 'Signup failed.');
    }

  } catch (error) {
    console.error('Error during signup:', error);
    alert('Internal server error. Please try again later.');
  }
};


  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={profileImg} alt="profile" className="profile-img" />
        <h2 className="signup-name">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fa fa-user icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-lock icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-lock icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-link">Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Signup;
