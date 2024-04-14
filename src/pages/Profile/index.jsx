import React, { useState,useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import ProfileForm from '../../components/ProfileForm';
import UserAds from '../../components/UserAds';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadFavorites } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {

  const dispatch = useDispatch();
   const { favorites, loading, error } = useSelector((state) => state.user);

  // Fetch user's ads, recent searches, and favorites from Firestore
  const [ads, setAds] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
 useEffect(() => {
   const userUid = sessionStorage.getItem("user_uid");

   if (userUid) {
     dispatch(LoadFavorites(userUid));
   }
 }, [dispatch]);


  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />

      <ProfileForm />
      {loading === "pending" ? 
      <div className="text-center">Loading...</div> : 
      error ? <div className="text-center">{error}</div> :
      loading === "failed" ? <div className="text-center">Failed to load</div> :
        <UserAds
          ads={ads}
          recentSearches={recentSearches}
          favorites={favorites}
        />
      }
     

      <Footer />
    </div>
  );
};

export default Profile;