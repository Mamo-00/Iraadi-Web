import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Login from '../../components/Login';
import ProfileForm from '../../components/ProfileForm';
import UserAds from '../../components/UserAds';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '@mui/material';
import { useAuth } from '../../firebase/auth';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { currentUser, fetchAndUpdateCurrentUser } = useAuth();

  // Fetch user's ads, recent searches, and favorites from Firestore
  const [ads, setAds] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch data from Firestore and set state
  }, [currentUser]);

  const toggleShow = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div>
      <Navbar toggleShow={toggleShow} />

      <Login open={open} toggleShow={toggleShow} />

      <ProfileForm onUserDataUpdated={fetchAndUpdateCurrentUser} />
      <UserAds ads={ads} recentSearches={recentSearches} favorites={favorites} />

      <Footer />
    </div>
  );
};

export default Profile;
