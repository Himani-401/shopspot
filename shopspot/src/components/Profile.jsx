import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; 

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); 
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        console.log('Profile Response:', response.data); 
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profile) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
    </div>
  );
};

export default Profile;
