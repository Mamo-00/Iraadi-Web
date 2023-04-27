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
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from "../firebase/auth";

const ProfileForm = ({ onUserDataUpdated }) => {
  const { currentUser, updateProfile, fetchAndUpdateCurrentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [firestoreData, setFirestoreData] = useState({});
  const [error, setError] = useState('');

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);

  const [profilePicture, setProfilePicture] = useState(currentUser.photoURL);
  const [previewUrl, setPreviewUrl] = useState(currentUser.photoURL);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);


  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const readImageAsDataURL = (file) => {
    const reader = new FileReader();
  
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
  
    reader.onerror = (e) => {
      setError(`The selected file could not be read. Please choose a different image or check your file permissions.` );
      console.error('Error reading image file:',e.target.error.message)
    };
  
    reader.readAsDataURL(file);
  };
  
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
  
    if (file.size === 0) {
      // Display an error message to the user
      setError('Selected file is not valid. Please choose a different image.');
      return;
    }
    if (!file) {
      setError('No file selected. Please choose a valid image.');
      return; //add comments to code using gpt
    }
  
    
  
    setProfilePictureFile(file);
    readImageAsDataURL(file);
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    await updateProfile(currentUser?.uid, displayName, phoneNumber, profilePictureFile, (updatedUserData) => {
      // Update the state with the new user data
      setDisplayName(updatedUserData.displayName);
      setPhoneNumber(updatedUserData.phoneNumber);
      setProfilePicture(updatedUserData.photoURL);
      setFirestoreData(updatedUserData);
    });
  
    if (onUserDataUpdated) {
      onUserDataUpdated();
    }
  
    console.log("Updated user data:", { displayName, phoneNumber, profilePicture });
  };
  
  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      fetchAndUpdateCurrentUser()
        .then((data) => {
          setFirestoreData(data);
          setDisplayName(data.displayName || currentUser.displayName);
          setPhoneNumber(data.phoneNumber || currentUser.phoneNumber);
          setProfilePicture(data.photoURL || currentUser.photoURL);
          setPreviewUrl(data.photoURL || currentUser.photoURL);
        })
        .finally(() => setLoading(false));
    }
  }, [currentUser]);


  return (
    <Container maxWidth="sm">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box textAlign="center" my={4}>
            <Typography variant="h2" color="primary">
              My Profile
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" color="primary">
                  Edit Profile
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {profilePicture && (
                  <Box mt={2}>
                    <Avatar
                      src={previewUrl}
                      alt={displayName}
                      sx={{ mb: 2 }}
                      onLoad={() => {
                        setIsImageLoading(false);
                        setError("");
                      }}
                      onError={() => {
                        setIsImageLoading(false);
                        setError(
                          "Error loading preview image. Please choose a different image."
                        );
                      }}
                    />
                  </Box>
                )}
                {error && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ my: 2, textAlign: "start" }}
                  >
                    {error}
                  </Typography>
                )}
                <InputLabel
                  htmlFor="profile-picture-upload"
                  style={{ cursor: "pointer", maxWidth: "180px" }}
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
        </>
      )}
    </Container>
  );
};

export default ProfileForm;
