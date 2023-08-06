import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import Login from "../../components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryCard from "../../components/Cards/CategoryCard";
import { useTheme } from "@mui/material";
import { products, categories } from "../../utils/products";
import CarsPromoCard from '../../components/Cards/PromotionCards/CarPromoCard'
import {
  Typography,
  Stack,
  Grid,
  Box,
  Fab,
  ImageList,
  ImageListItem,
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  const theme = useTheme();

  const Promo = ( { title } ) => {
    return (
      <>
      <Typography variant="h4" color="text.primary" sx={{ my: 2 }}>
        {title}
      </Typography>
      <ImageList
        sx={{
          maxWidth: 1010,
          height: 270,
          p: 1,
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        }}
        cols={products?.length + 1} // +1 to show FAB component
        rowHeight={260}
      >
        {products?.map((item, index) => (
          <ImageListItem key={index}>
            <CarsPromoCard
              img={item?.img}
              distance={item?.distance}
              price={item?.price}
              year={item?.year}
              make={item?.make}
              model={item?.model}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </ImageListItem>
        ))}
        <ImageListItem sx={{ justifyContent: "center", mx: 1 }}>
          <Fab color="primary" aria-label="view all">
            <ArrowForwardIcon />
          </Fab>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            View All Items
          </Typography>
        </ImageListItem>
      </ImageList>
      <Stack
        direction="row"
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      >
        {products?.slice(0, 5).map((item, index) => (
          <CarsPromoCard
            key={index}
            img={item?.img}
            distance={item?.distance}
            price={item?.price}
            year={item?.year}
            make={item?.make}
            model={item?.model}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ))}
      </Stack>
    </>
    );
    
  };

  return (
    <div>
      <Navbar />

      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1010px",
          mx: 2,
          [theme.breakpoints.up("md")]: {
            mx: "auto",
          },
          my: 4,
          py: 1,
          borderRadius: 4,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {categories.map((category, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <CategoryCard category={category} image={category.image} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1010px",
          mx: "auto",
          my: 4,
          pb: 1,
          overflowX: "hidden",
        }}
        textAlign="center"
      >
        <Promo title="Recently Looked At" />
        <Promo title="Popular Cars" />
        <Promo title="Popular Properties" />
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
