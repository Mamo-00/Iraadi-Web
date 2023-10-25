import { React, useContext, useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/iiraadi-notext-logo.png";
import LogoWithText from "../../assets/logo/iiraadi-with-text-logo.png";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircularProgress from "@mui/material/CircularProgress";
import MoreIcon from "@mui/icons-material/MoreVert";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector, useDispatch } from "react-redux";
import {
  signOutUser,
  fetchAndUpdateCurrentUser,
  selectCurrentUser,
} from "../../features/user/userSlice";

import SearchBar from "../SearchBar";

import { Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ColorModeContext, tokens } from "../../theme";

// https://mui.com/material-ui/react-app-bar/#app-bar-with-a-primary-search-field

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens("theme.palette.mode");
  const colorMode = useContext(ColorModeContext);
  const isSmallPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => selectCurrentUser(state));

  const userFetched = useRef(false);

  useEffect(() => {
    setLoadingProfile(true);
    dispatch(fetchAndUpdateCurrentUser(currentUser?.uid))
      .then(() => {
        setLoadingProfile(false);
      })
      .catch((error) => {
        console.error("Error in fetchAndUpdateCurrentUser:", error);
      });

    if (!currentUser) {
      setLoadingProfile(false);
    }
  }, [currentUser?.photoURL, dispatch]);

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
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
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
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
        <Link to="/login" rel="noopener follow" color="inherit">
          <MenuItem>Login</MenuItem>
        </Link>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
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
      {/* TODO: Implement light/dark mode toggle at a later time */}
      {/* TODO: Implement message and notification icons at a later time */}
      {/* <MenuItem>
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
      </MenuItem> */}
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
                  key={currentUser?.photoURL}
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
        <Link to="/login" rel="noopener follow" color="inherit">
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
    <Box sx={{ backgroundColor: "background.default", width: "100vw" }}>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "940px",
          mx: "auto",
          backgroundColor: "background.default",
        }}
      >
        <AppBar
          position="static"
          sx={{ boxShadow: "none", backgroundColor: "background.default" }}
        >
          <Toolbar sx={{ backgroundColor: "background.default", justifyItems: 'center' }}>
            {/* LOGO */}
            {!isPhone ? (
              <Link
                to="/"
                className="me-auto"
                sx={{ color: "#fff", backgroundColor: "inherit" }}
              >
                <img
                  src={Logo}
                  className="d-sm-block me-3 logo"
                  alt="Logo"
                  style={{ width: "65px", height: "50px" }}
                />
              </Link>
            ) : (
              <Link
                to="/"
                className="me-auto"
                sx={{ color: "#fff", backgroundColor: "inherit" }}
              >
                <img
                  src={LogoWithText}
                  className="d-sm-block me-3 logo"
                  alt="Logo"
                  style={{ width: "185px", height: "57px" }}
                />
              </Link>
            )}

            {/*Searchbar */}
            {!isPhone ? (
              <>
                <Box width={"60%"} marginLeft={2}>
                  <SearchBar />
                </Box>
              </>
            ) : (
              <Box display={"none"}></Box>
            )}

            {/*Spacing*/}
            <Box sx={{ flexGrow: 1 }} />

            {/*Create Ad button*/}
            {!isSmallPhone ? (
             
              <Link to="/create-ad" style={{ marginLeft: "auto", marginRight: 'auto' }}>
                <Fab
                  variant="extended"
                  color="tertiery"
                  size="small"
                  aria-label="create ad"
                  sx={{py: '20px'}}
                >
                  <EditIcon sx={{ mr: 1 }} color="primary" />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "normal", pr: 1, letterSpacing: 0.75, mx: 'auto' }}
                    color="text.primary"
                  >
                    Create ad
                  </Typography>
                </Fab>
              </Link>
            ) : (
              <Link to="/create-ad" style={{ marginLeft: "auto", marginRight: 'auto' }}>
                <Fab
                  variant="extended"
                  color="tertiery"
                  size="small"
                  aria-label="create ad"
                >
                  <EditIcon color="primary" />
                </Fab>
              </Link>
            )}
            {/*Spacing*/}
            <Box sx={{ flexGrow: 1 }} />

            {/*Menu button either as profile picture or MoreIcon from MUI*/}
            {!isPhone ? (
              <Box>
                {/* TODO: Implement light/dark mode toggle at a later time */}
                {/*
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            */}

                {/* TODO: Implement message and notification icons at a later time */}
                {/*
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="text.secondary"
            >
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="text.secondary"
            >
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            */}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="primary.main"
                  sx={{mx: 'auto', px:0}}
                >
                  {loadingProfile ? (
                    <CircularProgress size={24} />
                  ) : currentUser !== null ? (
                    <Avatar
                      key={currentUser?.photoURL}
                      alt="Profile picture"
                      src={currentUser?.photoURL}
                      sx={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <AccountCircle
                      color="primary.main"
                      sx={{ width: 30, height: 30, pl: 0 }}
                    />
                  )}
                </IconButton>
              </Box>
            ) : (
              <Box>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="primary.main"
                  sx={{p: 0}}
                >
                  <MoreIcon sx={{mx: 0.5, p: 0}}/>
                </IconButton>
              </Box>
            )}
          </Toolbar>

          {/*Searchbar mobile version */}
          {!isPhone ? (
            <>
              <Box display={"none"}></Box>
            </>
          ) : (
            <Box width={"100%"} px={2} py={1}>
              <SearchBar />
            </Box>
          )}
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Box>
  );
};
export default Navbar;
