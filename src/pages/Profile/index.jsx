import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import ProfileForm from '../../components/ProfileForm';
import UserAds from '../../components/UserAds';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {

  // Fetch user's ads, recent searches, and favorites from Firestore
  const [ads, setAds] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);

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