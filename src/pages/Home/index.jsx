import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Login from "../../components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryIcons from "../../components/Icons/CategoryIcons";
import { useTheme } from "@mui/material";
import { products } from "../../utils/products";
import CarsPromoCard from '../../components/Cards/PromotionCards/CarPromoCard'
import {
  IconButton,
  Typography,
  Stack,
  Grid,
  Box,
  Fab,
  ImageList,
  ImageListItem,
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const toggleShow = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  

  return (
    <div>
      <Navbar toggleShow={toggleShow} />

      <Login open={open} toggleShow={toggleShow} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          flexGrow: 1,
          maxWidth: "1010px",
          mx: 2,
          [theme.breakpoints.up("md")]: {
            mx: "auto",
          },
          my: 4,
          py: 1,
          borderRadius: 4,
          backgroundColor: "background.paper",
          justifyContent: "center"
        }}
        
      >
        <Typography variant="h1" >WORK IN PROGRESS</Typography>
        <Typography variant="h2">STAY TUNED</Typography>
      </Box>
      <Box sx={{ mt: 80 }}>
        <Footer />
      </Box>
      
    </div>
  );
};

export default Home;
