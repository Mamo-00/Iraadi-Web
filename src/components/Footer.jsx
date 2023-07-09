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
          mt: 2
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>

            <Typography variant="h5" color="text.primary">About</Typography>

            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography color="#fff">About Us</Typography>
            </Link>
            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography color="#fff">Contact Us</Typography>
            </Link>

          </Grid>
          <Grid item xs={12} sm={6} md={3}>

            <Typography variant="h5" color="text.primary">Help Center</Typography>

            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography color="#fff">FAQs</Typography>
            </Link>
            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography color="#fff">Terms & Conditions</Typography>
            </Link>

          </Grid>
          <Grid item xs={12} sm={6} md={3}>

            <Typography variant="h5" color="text.primary">Policies</Typography>

            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography color="#fff">Privacy Policy</Typography>
            </Link>
            <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
              <Typography color="#fff">Return Policy</Typography>
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
            <Typography variant="h6" color="text.primary">Follow Us</Typography>
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
