
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    
    axios.get('/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-header">Profile</h2>
      {profile && (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Mobile Number:</strong> {profile.mobileNumber}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
