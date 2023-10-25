import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Stack,
  Box,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          padding: (theme) => theme.spacing(3),
          color: "#fff",
          mt: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              textAlign: { xs: "center", sm: "left" }, // Center text for xs, left-align for sm and up
            }}
          >
            <Stack flexDirection="column" justifyContent="center">
              <Typography variant="h5" color="default">
                About
              </Typography>
              <Divider
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.light,
                  mb: 1,
                  height: "1px",
                  opacity: 1, // Set opacity to 1
                  display: "block",
                  width: "33%",
                  alignSelf: { xs: "center", sm: "start" },
                }}
              />
            </Stack>

            <Link to="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color="#fff"
                sx={{
                  ":hover": { color: (theme) => theme.palette.text.light },
                }}
              >
                About Us
              </Typography>
            </Link>
            <Link to="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color="#fff"
                sx={{
                  ":hover": { color: (theme) => theme.palette.text.light },
                }}
              >
                Contact Us
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              textAlign: { xs: "center", sm: "left" }, // Center text for xs, left-align for sm and up
            }}
          >
            <Stack flexDirection="column" justifyContent="center">
              <Typography variant="h5" color="default">
                Help Center
              </Typography>
              <Divider
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.light,
                  mb: 1,
                  height: "1px",
                  opacity: 1, // Set opacity to 1
                  display: "block",
                  width: "33%",
                  alignSelf: { xs: "center", sm: "start" },
                }}
              />
            </Stack>
            <Link to="/FAQ" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color="#fff"
                sx={{
                  ":hover": { color: (theme) => theme.palette.text.light },
                }}
              >
                FAQs
              </Typography>
            </Link>
            <Link to="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color="#fff"
                sx={{
                  ":hover": { color: (theme) => theme.palette.text.light },
                }}
              >
                Terms & Conditions
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              textAlign: { xs: "center", sm: "left" }, // Center text for xs, left-align for sm and up
            }}
          >
            <Stack flexDirection="column" justifyContent="center">
              <Typography variant="h5" color="default">
                Policies
              </Typography>
              <Divider
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.light,
                  mb: 1,
                  height: "1px",
                  opacity: 1, // Set opacity to 1
                  display: "block",
                  width: "33%",
                  alignSelf: { xs: "center", sm: "start" },
                }}
              />
            </Stack>
            <Link to="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color="#fff"
                sx={{
                  ":hover": { color: (theme) => theme.palette.text.light },
                }}
              >
                Privacy Policy
              </Typography>
            </Link>
            <Link to="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color="#fff"
                sx={{
                  ":hover": { color: (theme) => theme.palette.text.light },
                }}
              >
                Return Policy
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="default">
              Follow Us
            </Typography>
            <IconButton
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#fff",
                marginLeft: (theme) => theme.spacing(1),
                marginRight: (theme) => theme.spacing(1),
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://www.instagram.com/iiraadi.net1/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#fff",
                marginLeft: (theme) => theme.spacing(1),
                marginRight: (theme) => theme.spacing(1),
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#fff",
                marginLeft: (theme) => theme.spacing(1),
                marginRight: (theme) => theme.spacing(1),
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#fff",
                marginLeft: (theme) => theme.spacing(1),
                marginRight: (theme) => theme.spacing(1),
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
export default Footer;
