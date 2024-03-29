
import React, { useState } from 'react';
import axios from 'axios';
import './Signups.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/auth/signup', formData)
      .then(response => {
        console.log('Signup successful:', response.data);
      
      })
      .catch(error => {
        console.error('Signup failed:', error.response.data);
       
      });
  };

  return (
    <div className="signup-form">
      <h2 className="signup-header">Signup</h2>
      <form onSubmit={handleSubmit}>
        
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="signup-input" placeholder="First Name" required minLength="5" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="signup-input" placeholder="Last Name" />
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="signup-input" placeholder="Mobile Number" pattern="[0-9]{10}" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="signup-input" placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="signup-input" placeholder="Password" required minLength="5" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$" />
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
