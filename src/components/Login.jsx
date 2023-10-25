import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Alert,
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

import backgroundImage from '../assets/background/desert-4-login.jpg';
import Logo from '../assets/logo/iiraadi-site-logo-camel.png';

import { AsYouType, getCountries, parsePhoneNumber, isValidNumber } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

import {
  signInWithEmailPassword,
  signUpWithEmailPassword,
  signInWithGoogle,
  signInWithFacebook,
  selectCurrentUser
} from '../features/user/userSlice';
import { set } from 'date-fns';
import { Stack } from '@mui/system';



const Login = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state

  // Phone useStates
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [countryCode, setCountryCode] = useState('NO');

  // The other fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // Redux hooks
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => selectCurrentUser(state));
  const userError = useSelector((state) => state.user.error);

  // Navigation
  const navigate = useNavigate();
  const location = useLocation();
  console.log('the location:', location);
  const from = location?.state?.from?.pathname || "/";
  console.log('the from value:', from);
  sessionStorage.setItem('intendedDestination', from);
  console.log('session storage:', sessionStorage.getItem('intendedDestination'));

  const combinedError = error ;

  countries.registerLocale(enLocale);
  const countryCodes = getCountries();
  const countryList = countryCodes
    .map((code) => ({
      code,
      name: countries.getName(code, "en"),
    }))
    .filter((country) => country.name !== undefined);



    const handleLogin = async () => {
      try {
        await dispatch(signInWithEmailPassword(loginEmail, loginPassword));
        const intendedDestination = sessionStorage.getItem('intendedDestination') || '/';
        navigate(intendedDestination, { replace: true });
        sessionStorage.removeItem('intendedDestination');
      } catch (error) {
        setError(error.message);
      }
    };

    const handleSignUp = () => {
      if (validateRegisterForm()) {
        dispatch(signUpWithEmailPassword(email, password, name, phone))
          .then(() => {
            // Retrieve the intended destination from the session storage
            const intendedDestination = sessionStorage.getItem('intendedDestination') || '/';
            navigate(intendedDestination, { replace: true });
            // Clear the session storage
            sessionStorage.removeItem('intendedDestination');
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    };

  const handleFacebookLogin = () => {
    dispatch(signInWithFacebook())
      .then(() => {
        // Retrieve the original destination from the session storage
        const intendedDestination = sessionStorage.getItem('intendedDestination') || '/';
        navigate(intendedDestination, { replace: true });
        // Clear the session storage
        sessionStorage.removeItem('intendedDestination');
      })
      .catch((error) => console.log("Error during google login dispatch:", error));
  };

  const handleGoogleLogin = () => {
    // Store the original destination in the session storage
    
    dispatch(signInWithGoogle())
      .then(() => {
        // Retrieve the original destination from the session storage
        const intendedDestination = sessionStorage.getItem('intendedDestination') || '/';
        navigate(intendedDestination, { replace: true });
        // Clear the session storage
        sessionStorage.removeItem('intendedDestination');
      })
      .catch((error) => console.log("Error during google login dispatch:", error));
  };
  


  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  /* useEffect(() => {
    if (currentUser) {
      const intendedDestination = sessionStorage.getItem('intendedDestination') || '/';
      navigate(intendedDestination, { replace: true });
      sessionStorage.removeItem('intendedDestination');
    }
  }, [currentUser, navigate]); */

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
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
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
    <Box sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundPosition: 'center center',
      p: 2
    }}>
      <Link
        to="/"
        className="me-auto"
        sx={{ color: "#fff", backgroundColor: "inherit" }}
      >
        <img
          src={Logo}
          className="d-sm-block me-1 logo"
          alt="Logo"
          style={{ height: "4%", width: "15%" }}
        />
      </Link>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "background.paper",
          p: 2,
          mt: 1,
          borderRadius: 2,
          boxShadow: 24
        }}
      >
        <Stack direction="row" justifyContent={'space-between'} >
          <Typography variant="h4" component="div">
            Login/Register
          </Typography>
          <Link to="/"
            sx={{ color: "#fff", backgroundColor: "inherit" }}>Go Back</Link>
        </Stack>

        <Divider sx={{ my: 1 }} color="primary" />
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
              {/* <Button
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
                    </Button> */}
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
                const trimmedEmail = loginEmail.trim();
                if (trimmedEmail) {
                  dispatch(signInWithEmailPassword({ loginEmail: trimmedEmail, loginPassword }))
                    .then(() => {
                      console.log("Navigation to the next page");
                      navigate(from, { replace: true });
                    })
                    .catch((error) => {
                      setError("something went wrong with the sign in");
                      console.log("sign in with email/password error:", error.message);
                    });
                } else {
                  setError("Email is required");
                }
              }}
            >
              Sign in
            </Button>

          </Container>
        )}

        {/*Register Section */}
        {activeTab === 1 && (
          <Container maxWidth="xs">
            <Typography align="center" variant="body1" sx={{ mt: 2 }}>
              Sign up with:
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
              {/* <Button
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
                    </Button> */}
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
                      setError("Something went wrong with the sign up");
                      console.log("error in sign up:", error.message);
                    });
                }
              }}
            >
              Sign up
            </Button>
          </Container>
        )}
      </Container>
    </Box>
  );
};

export default Login;
