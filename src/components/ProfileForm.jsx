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
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, fetchAndUpdateCurrentUser, selectCurrentUser, uploadAndCompressProfilePicture } from '../features/user/userSlice';
import imageCompression from 'browser-image-compression';


const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
}

const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => selectCurrentUser(state));

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [loading, setLoading] = useState(true);
  const [firestoreData, setFirestoreData] = useState({});
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [error, setError] = useState('');

  const [displayName, setDisplayName] = useState(user ? user.displayName : "");
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "");

  const [profilePicture, setProfilePicture] = useState(user ? user.photoURL : "");
  console.log("old profile picutre", profilePicture);
  const [previewUrl, setPreviewUrl] = useState(user ? user.photoURL : "");
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
  
  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    console.log('file value', file);
  
    if (file.size === 0) {
      // Display an error message to the user
      setError('Selected file is not valid. Please choose a different image.');
      return;
    }
    if (!file) {
      setError('No file selected. Please choose a valid image.');
      return; //add comments to code using gpt
    }
  
    // Compress the image before setting it to state
    const options = {
      maxSizeMB: 0.4, // (400KB)
      maxWidthOrHeight: 4000,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      setProfilePictureFile(compressedFile);
      readImageAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error occurred while compressing image:', error);
    }
  };
  
  // this code will force a reload when the save button is clicked.
  // this is a temporary solution as we don't want reloads to update 
  // state.
  // TODO: change the code into updating the profile picture everywhere 
  // in the app by rerender rather than reload. 
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const payload = {
      uid: user?.uid,
      displayName,
      phoneNumber,
      profilePictureFile,
    };
  
    dispatch(updateProfile(payload))
      .then(() => {
        // Redirect with a query parameter to indicate success
        window.location.href = window.location.pathname + '?profileUpdated=true';
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const profileUpdated = urlParams.get("profileUpdated");

    if (profileUpdated === 'true') {
      setOpenSnackbar(true);
    
      // Clear the query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (user === undefined) {
      return;
    }
    if (user !== undefined && user !== null && !isUserFetched) {
      setLoading(true);
      dispatch(fetchAndUpdateCurrentUser(user?.uid))
        .then((data) => {
          if (data !== null) {
            setFirestoreData(data);
            setDisplayName(data?.displayName || user?.displayName);
            setPhoneNumber(data?.phoneNumber || user?.phoneNumber);
            setProfilePicture(data?.photoURL || user?.photoURL || ""); // Set the profilePicture state variable
            setPreviewUrl(data?.photoURL || user?.photoURL || "");
          }
        })
        .finally(() => {
          setLoading(false);
          setIsUserFetched(true);
        });
    } else {
      return;
    }
  }, [user, dispatch, isUserFetched]);

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionLeft}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>

      {loading ? (
        <Box textAlign="center" my={4}>
          <CircularProgress sx={{ mx: "auto", mt: 5 }} />
        </Box>
      ) : (
        <>
          <Box textAlign="center" my={4}>
            <Typography variant="h2" color="text.primary">
              My Profile
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" color="text.primary">
                  Edit Profile
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {profilePicture && (
                  <Box mt={2}>
                    <Avatar
                      src={
                        previewUrl === (null || undefined)
                          ? profilePicture
                          : previewUrl
                      }
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
                        console.log("preview url in onError", previewUrl);
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
