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
  const { currentUser, updateProfile } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const [profilePicture, setProfilePicture] = useState(currentUser.photoURL);

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(displayName, phoneNumber, profilePicture);
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={4}>
        <Typography variant="h4">My Profile</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Edit Profile</Typography>
          </Grid>
          <Grid item xs={12}>
            {profilePicture && (
              <Box mt={2}>
                <Avatar src={profilePicture} alt={displayName} sx={{ mb: 2 }} />
              </Box>
            )}
            <InputLabel
              htmlFor="profile-picture-upload"
              style={{ cursor: "pointer" }}
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
              value={phoneNumber}
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
