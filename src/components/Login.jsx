import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Tab,
  Tabs,
  TextField,
  Button,
  Container,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { AsYouType, getCountries, parsePhoneNumber, isValidNumber } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

import {
  signInWithEmailPassword,
  signUpWithEmailPassword,
  signInWithGoogle,
  signInWithFacebook,
} from '../features/user/userSlice';



const Login = ( { toggleShow, open } ) => {
  
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  
    // Phone useStates
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [countryCode, setCountryCode] = useState('US');

    // The other fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // Redux hooks
  const dispatch = useDispatch();
  const userError = useSelector((state) => state.user.error);

  const combinedError = error || userError;

  countries.registerLocale(enLocale);
  const countryCodes = getCountries();
  const countryList = countryCodes
  .map((code) => ({
    code,
    name: countries.getName(code, "en"),
  }))
  .filter((country) => country.name !== undefined);

  

  const handleLogin = () => {
    dispatch(signInWithEmailPassword(loginEmail, loginPassword)).catch((error) => {
      setError(error.message);
    });
  };

  const handleSignUp = () => {
    if (validateRegisterForm()) {
      dispatch(
        signUpWithEmailPassword(email, password, name, phone)
      ).catch((error) => {
        setError(error.message);
      });
    }
  };

  const handleFacebookLogin = () => {
    dispatch(signInWithFacebook());
  };

  const handleGoogleLogin = () => {
    dispatch(signInWithGoogle());
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const validateRegisterForm = () => {
    if (name.trim() === '') {
      setError('Name is required');
      return false;
    }
  
    if (formattedPhone.trim() === '') {
      setError('Phone number is required');
      return false;
    }

    const parsedPhoneNumber = parsePhoneNumber(formattedPhone, countryCode);
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid() ) {
      setError("Invalid phone number");
      return false;
    }
  
    if (email.trim() === '') {
      setError('Email is required');
      return false;
    }
  
    if (password.trim() === '') {
      setError('Password is required');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be 6 characters long');
      return false;
    }
  
    if (password !== registerConfirmPassword) {
      setError('Passwords do not match');
      return false;
    }
  
    setError('');
    return true;
  };
  

  return (
    <div>
      <Dialog open={open} onClose={toggleShow} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="h4" component="div">
            Login/Register
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleShow}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8, mr: 0.5 }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <Divider sx={{ my: 1 }} color="primary" />
        <DialogContent>
          <Container maxWidth="sm">
            <Tabs value={activeTab} onChange={handleChange} variant="fullWidth">
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            {activeTab === 0 && (
              <Container maxWidth="xs">
                <Typography align="center" variant="body1" sx={{ mt: 2 }}>
                  Sign in with:
                </Typography>
                <Box display="flex" justifyContent="space-evenly" mt={2}>
                  <Button
                    variant="outlined"
                    onClick={handleGoogleLogin}
                    startIcon={
                      <GoogleIcon fontSize="large" color="secondary" />
                    }
                  >
                    <Typography
                      variant="h5"
                      sx={{ letterSpacing: 1, fontWeight: "bold", textTransform: "none" }}
                      color="secondary"
                    >
                      Google
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleFacebookLogin}
                    startIcon={
                      <FacebookIcon fontSize="large" color="primary" />
                    }
                  >
                    <Typography
                      variant="h5"
                      sx={{ letterSpacing: 1, fontWeight: "bold", textTransform: "none" }}
                      color="primary"
                    >
                      Facebook
                    </Typography>
                  </Button>
                </Box>
                <Typography align="center" variant="body1" sx={{ mt: 2 }}>
                  or:
                </Typography>
                {combinedError && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ mt: 2, textAlign: "center" }}
                  >
                    {combinedError}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={1}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                  <Typography variant="body2">
                    <a href="#!">Forgot password?</a>
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    console.log("email in login.jsx:", loginEmail);
                    dispatch(
                      signInWithEmailPassword({ loginEmail, loginPassword })
                    )
                      .catch((error) => {
                        setError(error.message);
                      })
                      .then(() => {});
                  }}
                >
                  Sign in
                </Button>
              </Container>
            )}
            {activeTab === 1 && (
              <Container maxWidth="xs">
                <Typography align="center" variant="body1" sx={{ mt: 2 }}>
                  Sign up with:
                </Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="outlined"
                    onClick={handleGoogleLogin}
                    startIcon={
                      <GoogleIcon fontSize="large" color="secondary" />
                    }
                  >
                    <Typography
                      variant="h5"
                      sx={{ letterSpacing: 1, fontWeight: "bold", textTransform: "none" }}
                      color="secondary"
                    >
                      Google
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleFacebookLogin}
                    startIcon={
                      <FacebookIcon fontSize="large" color="primary" />
                    }
                  >
                    <Typography
                      variant="h5"
                      sx={{ letterSpacing: 1, fontWeight: "bold", textTransform: "none" }}
                      color="primary"
                    >
                      Facebook
                    </Typography>
                  </Button>
                </Box>
                <Typography align="center" variant="body1" sx={{ mt: 2 }}>
                  or:
                </Typography>
                {combinedError && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ mt: 2, textAlign: "center" }}
                  >
                    {combinedError}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel id="country-label">Country</InputLabel>
                      <Select
                        labelId="country-label"
                        label="Country"
                        margin="dense"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        {countryList.map((country) => (
                          <MenuItem key={country.code} value={country.code}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={7}>
                    <TextField
                      fullWidth
                      label="Phone"
                      margin="normal"
                      type="tel"
                      value={formattedPhone}
                      onChange={(e) => {
                        const input = e.target.value;
                        const formatted = new AsYouType(countryCode).input(
                          input
                        );

                        setPhone(input);
                        setFormattedPhone(formatted);
                      }}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  margin="normal"
                  type="password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                />
                <Box display="flex" justifyContent="center" mt={1}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I have read and agree to the terms"
                  />
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    if (validateRegisterForm()) {
                      console.log(
                        "email:",
                        email,
                        "password:",
                        password,
                        "name:",
                        name,
                        "phone:",
                        phone
                      );
                      const parsedPhoneNumber = parsePhoneNumber(
                        formattedPhone,
                        countryCode
                      );
                      const e164PhoneNumber =
                        parsedPhoneNumber.formatInternational();
                      dispatch(
                        signUpWithEmailPassword({
                          email,
                          password,
                          name,
                          phone: e164PhoneNumber,
                        })
                      )
                        .then(() => {
                          // Show a success message to the user, e.g., using a toast notification
                          setActiveTab(0);
                          <Alert variant="outlined" severity="success">
                            You have registered a new user!
                          </Alert>;
                          // ...
                          // Redirect the user to the login page or another page
                        })
                        .catch((error) => {
                          console.error(
                            "Error from signUpWithEmailPassword action:",
                            error
                          ); // Add this console log
                          setError(error.message);
                        });
                    }
                  }}
                >
                  Sign up
                </Button>
              </Container>
            )}
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
