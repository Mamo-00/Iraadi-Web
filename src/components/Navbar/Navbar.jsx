import { React, useContext, useState, useEffect, useRef } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Fab from "@mui/material/Fab";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link  } from 'react-router-dom';
import Logo from '../../assets/logo/page-logo.png';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircularProgress from "@mui/material/CircularProgress";
import MoreIcon from '@mui/icons-material/MoreVert';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';

import { useSelector, useDispatch } from 'react-redux';
import { signOutUser, fetchAndUpdateCurrentUser, selectCurrentUser  } from '../../features/user/userSlice';

import { Typography, useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColorModeContext, tokens } from "../../theme";

// https://mui.com/material-ui/react-app-bar/#app-bar-with-a-primary-search-field

const Navbar = ( { toggleShow } ) => {

  const theme = useTheme();
  const colors = tokens("theme.palette.mode");
  const colorMode = useContext(ColorModeContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => selectCurrentUser(state));
  
  const userFetched = useRef(false);

  // Add useEffect to handle loading state
  useEffect(() => {
    if (currentUser && !userFetched.current) {
      setLoadingProfile(true);
      dispatch(fetchAndUpdateCurrentUser(currentUser.uid))
        .then(() => {
          setLoadingProfile(false);
          userFetched.current = true;
        })
        .catch((error) => {
          console.error("Error in fetchAndUpdateCurrentUser:", error);
        });
    } else if (!currentUser) {
      setLoadingProfile(false);
      userFetched.current = false;
    }
  }, [currentUser, dispatch]);
  

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile" color="inherit">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>

      {currentUser !== null ? (
        <Box>
          <Link to="/">
            <MenuItem onClick={handleLogout}>
              <Typography
                rel="noopener follow"
                onClick={handleLogout}
                color="inherit"
              >
                Logout
              </Typography>
            </MenuItem>
          </Link>

          <MenuItem>
            <Typography variant="subtitle2">
              {currentUser?.displayName}
            </Typography>
          </MenuItem>
        </Box>
      ) : (
        <Link
          to="/login"
          rel="noopener follow"
          onClick={toggleShow}
          color="inherit"
        >
          <MenuItem>Login</MenuItem>
        </Link>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={8} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <span>Messages</span>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <span>Notifications</span>
      </MenuItem>
      <Link to="/profile" color="inherit">
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="false"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <span>Profile</span>
        </MenuItem>
      </Link>
      {currentUser !== null ? (
        <Box>
          <Link to="/">
            <MenuItem onClick={handleLogout}>
              <IconButton size="large" aria-label="logout" color="inherit">
                <LogoutIcon />
              </IconButton>
              <Typography
                rel="noopener follow"
                onClick={handleLogout}
                color="inherit"
              >
                Logout
              </Typography>
            </MenuItem>
          </Link>

          <MenuItem>
            <IconButton size="large" aria-label="login" color="inherit">
              {loadingProfile ? (
                <CircularProgress size={24} />
              ) : currentUser !== null ? (
                <Avatar
                  alt="Profile picture"
                  src={currentUser?.photoURL}
                  sx={{ width: 24, height: 24 }}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>

            <Typography variant="subtitle2">
              {currentUser?.displayName}
            </Typography>
          </MenuItem>
        </Box>
      ) : (
        <Link
          to="/login"
          rel="noopener follow"
          onClick={toggleShow}
          color="inherit"
        >
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton size="large" aria-label="login" color="inherit">
              <LoginIcon />
            </IconButton>

            <span>Login</span>
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  return (
    <Box sx={{ backgroundColor: "primary.main", widht: "100vw" }}>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1010px",
          mx: "auto",
          backgroundColor: "primary.main",
        }}
      >
        <AppBar
          position="static"
          sx={{ boxShadow: "none", backgroundColor: "primary.main" }}
        >
          <Toolbar>
            <Link
              to="/"
              className="me-auto"
              sx={{ color: "#fff", backgroundColor: "inherit" }}
            >
              <img
                src={Logo}
                className="d-sm-block me-1 logo"
                alt="Logo"
                style={{ height: "30px", width: "170px" }}
              />
            </Link>
            <Link to="/create-ad" style={{ marginLeft: "2rem" }}>
              <Fab
                variant="extended"
                color="tertiery"
                size="small"
                aria-label="create ad"
              >
                {!isSmallScreen ? (
                  <>
                    <EditIcon sx={{ mr: 1 }} color="primary" />
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", pr: 1, letterSpacing: 0.75 }}
                      color="primary"
                    >
                      Create ad
                    </Typography>
                  </>
                ) : (
                  <EditIcon color="primary" />
                )}
              </Fab>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* Light / Dark mode*/}
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>

              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {loadingProfile ? (
                  <CircularProgress size={24} />
                ) : currentUser !== null ? (
                  <Avatar
                    alt="Profile picture"
                    src={currentUser?.photoURL}
                    sx={{ width: 24, height: 24 }}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Box>
  );
}
export default Navbar;
