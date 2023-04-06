import React, { useState } from 'react';
import {
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
} from '@mui/material';
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Login = ( { toggleShow, open } ) => {
  
  const [activeTab, setActiveTab] = useState(0);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Dialog open={open} onClose={toggleShow} maxWidth="sm" fullWidth>
        <DialogTitle disableTypography>
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
                <Box display="flex" justifyContent="center" mt={2}>
                  <IconButton>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton>
                    <GoogleIcon />
                  </IconButton>
                  <IconButton>
                    <GitHubIcon />
                  </IconButton>
                </Box>
                <Typography align="center" variant="body1" sx={{ mt: 2 }}>
                  or:
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  margin='normal'
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin='normal'
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
                  <IconButton>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton>
                    <GoogleIcon />
                  </IconButton>
                  <IconButton>
                    <GitHubIcon />
                  </IconButton>
                </Box>
                <Typography align="center" variant="body1" sx={{ mt: 2 }}>
                  or:
                </Typography>
                <TextField
                  fullWidth
                  label="Name"
                  margin='normal'
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  margin='normal'
                  type="tel"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin='normal'
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin='normal'
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  margin='normal'
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
