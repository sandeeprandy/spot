import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-header">Welcome sandeep!</h2>
      <p className="home-content">You are currently a guest user.</p>
      <p className="profile-link">Want to see your profile? <Link to="/profile">Go to Profile</Link></p>
    </div>
  );
};

export default Home;
