import React, { useState } from "react";
import NavbarBeta from "../../components/NavbarBeta";
import Footer from "../../components/Footer";
import Login from "../../components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { IconButton, Typography, Stack } from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import CategoryIcons from "../../components/CategoryIcons";
import { useTheme } from "@mui/material";
import VehicleCard from "../../components/Cards/VehicleCard";


const Home = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const toggleShow = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const products = [
    {
      title: "BMW X3",
      location: "Bergen",
      distance: 312,
      year: 2017,
      img: "https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 25000,
    },
    {
      title: "Audi R8",
      location: "Oslo",
      distance: 52,
      year: 2019,
      img: "https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 545000,
    },
    {
      title: "McLaren G4",
      location: "Stavanger",
      distance: 125,
      year: 2020,
      img: "https://images.pexels.com/photos/1519192/pexels-photo-1519192.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 2500000,
    },
    {
      title: "Toyota Corolla",
      location: "Ålesund",
      distance: 278,
      year: 2012,
      img: "https://images.pexels.com/photos/376361/pexels-photo-376361.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 15000,
    },
    {
      title: "Mercedes Benz",
      location: "Bergen",
      distance: 212,
      year: 2007,
      img: "https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 40000,
    },
    {
      title: "Tuk Tuk S8",
      location: "Tromsø",
      distance: 112,
      year: 2010,
      img: "https://cdn.fleetnews.co.uk/web-clean/1/root/new-tuk-tuks-provide-additional-support_w268.jpg",
      price: 12000
    },
    {
      title: "Tuk Tuk S4",
      location: "Trondheim",
      distance: 141,
      year: 2009,
      img: "https://cdn.pixabay.com/photo/2016/09/04/12/09/tuktuk-1643802__340.jpg",
      price: 9000
    },
  ];

  return (
    <div>
      <NavbarBeta toggleShow={toggleShow} />

      <Login
        open={open}
        toggleShow={toggleShow}
      />

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
          backgroundColor: "background.paper",
        }}
        style={{ boxShadow: "1px -2px 9px #4189DD70, 0px 1px 9px #4189DD90" }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="column" alignItems="center">
              <IconButton>
                <CategoryIcons
                  category="market"
                  style={{ width: 65, height: 50 }}
                />
              </IconButton>
              <Typography variant="body1" align="center" color="primary.main">
                Market
              </Typography>
            </Stack>
          </Grid>
          <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="column" alignItems="center">
              <IconButton>
                <CategoryIcons
                  category="vehicle"
                  style={{ width: 65, height: 50 }}
                />
              </IconButton>
              <Typography variant="body1" align="center" color="primary.main">
                Vehicle
              </Typography>
            </Stack>
          </Grid>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="column" alignItems="center">
              <IconButton>
                <CategoryIcons
                  category="property"
                  style={{ width: 65, height: 50 }}
                />
              </IconButton>
              <Typography variant="body1" align="center" color="primary.main">
                Property
              </Typography>
            </Stack>
          </Grid>
          <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="column" alignItems="center">
              <IconButton>
                <CategoryIcons
                  category="rental"
                  style={{ width: 65, height: 50 }}
                />
              </IconButton>
              <Typography variant="body1" align="center" color="primary.main">
                Rental
              </Typography>
            </Stack>
          </Grid>
          <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="column" alignItems="center">
              <IconButton>
                <CategoryIcons
                  category="valuables"
                  style={{ width: 65, height: 50 }}
                />
              </IconButton>
              <Typography variant="body1" align="center" color="primary.main">
                Valuables
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1010px",
          mx: "auto",
          my: 4,
          overflowX: "hidden",
        }}
      >
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={2}
          sx={{
            alignContent: "center",
            margin: "0 auto",
          }}
        >
          {products?.map((item, index) => (
            <VehicleCard
              key={index}
              img={item?.img}
              title={item?.title}
              distance={item?.distance}
              price={item?.price}
              year={item?.year}
              location={item?.location}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ))}
        </Masonry>
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
