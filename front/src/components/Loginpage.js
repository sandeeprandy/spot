import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom'; // Import useHistory and Link
import './Login.css';

const Login = () => {
  const history = useHistory(); // Initialize useHistory hook

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/auth/login', formData)
      .then(response => {
        console.log('Login successful:', response.data);
        // redicting after login sucessfully
        history.push('/');
      })
      .catch(error => {
        console.error('Login failed:', error.response.data);
      });
  };

  return (
    <div className="login-form">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="login-input" placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="login-input" placeholder="Password" required minLength="5" />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="signup-link">Not registered? <Link to="/signup">Signup here</Link></p>
    </div>
  );
};

export default Login;
