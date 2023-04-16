import React from "react";
import { Container, Grid, Typography, Link, IconButton } from "@mui/material";
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
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">About</Typography>
            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography>About Us</Typography>
            </Link>
            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography>Contact Us</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Help Center</Typography>
            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography>FAQs</Typography>
            </Link>
            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography>Terms & Conditions</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Policies</Typography>
            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography>Privacy Policy</Typography>
            </Link>
            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography>Return Policy</Typography>
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
            <Typography variant="h6">Follow Us</Typography>
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
              href="#"
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
