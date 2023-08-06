import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import Login from '../../components/Login';
import ProfileForm from '../../components/ProfileForm';
import UserAds from '../../components/UserAds';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '@mui/material';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  // Fetch user's ads, recent searches, and favorites from Firestore
  const [ads, setAds] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);


  const toggleShow = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div>
      <Navbar />

      <ProfileForm />

      <UserAds ads={ads} recentSearches={recentSearches} favorites={favorites} />

      <Footer />
    </div>
  );
};

export default Profile;