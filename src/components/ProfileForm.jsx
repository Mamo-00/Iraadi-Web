import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Avatar,
  Grid,
  Box,
  Typography,
  InputLabel,
} from "@mui/material";
import { useAuth } from "../firebase/auth";

const ProfileForm = () => {
  const { currentUser, updateProfile, fetchAndUpdateCurrentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const [profilePicture, setProfilePicture] = useState(currentUser.photoURL);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentUser.photoURL);

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePictureFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  
  console.log("current user is:", currentUser)

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await fetchAndUpdateCurrentUser(); 
    
    await updateProfile(currentUser?.uid, displayName, phoneNumber, profilePictureFile, (updatedUserData) => {
      // Update the state with the new user data
      setDisplayName(updatedUserData.displayName);
      setPhoneNumber(updatedUserData.phoneNumber);
      setProfilePicture(updatedUserData.photoURL);
    });
    console.log("Updated user data:", { displayName, phoneNumber, profilePicture });
  };
  

  useEffect(() => {
     if (currentUser) {
      setDisplayName(currentUser.displayName);
      setPhoneNumber(currentUser.phoneNumber);
      setPreviewUrl(currentUser.photoURL);
    }
  }, [currentUser]);

  

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={4}>
        <Typography variant="h2" color="primary">My Profile</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary">Edit Profile</Typography>
          </Grid>
          <Grid item xs={12}>
            {profilePicture && (
              <Box mt={2}>
                <Avatar src={previewUrl} alt={displayName} sx={{ mb: 2 }} />
              </Box>
            )}
            <InputLabel
              htmlFor="profile-picture-upload"
              style={{ cursor: "pointer", maxWidth: "180px", }}
            >
              <Button variant="contained" color="primary" component="span">
                Upload Profile Picture
              </Button>
            </InputLabel>
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePictureChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Display Name"
              variant="standard"
              value={displayName}
              onChange={handleDisplayNameChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="standard"
              value={phoneNumber || ""}
              onChange={handlePhoneNumberChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProfileForm;
