import React, { useState } from "react";
import NavbarBeta from "../../components/NavbarBeta";
import Footer from "../../components/Footer";
import Login from "../../components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import FlippingCard from "../../components/Cards/FlippingCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
import "../../styles.css";
import { IconButton } from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import BikeScooterOutlinedIcon from "@mui/icons-material/BikeScooterOutlined";
import VehicleCard from "../../components/Cards/VehicleCard";

// const Category = styled(Link)`
//   margin-top: 20px;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 15px;
//   display: flex;
//   flex-direction: column;
// `;

// const Label = styled.span`
//   margin-top: 5px;
//   color: #000;
//   text-decoration: none;
//   font-weight: 700;
// `;

// const Container = styled.div`
//   max-width: 1010px;
// `;

// const Aside = styled.div`
//   background-color: #f2f2f2;
//   border: 3px solid #ddd;
//   padding: 10px;
//   height: 400px; /* adjust as needed */
//   margin-top: 5rem;
// `;

const Home = () => {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = (e) => {
    e.preventDefault();
    setBasicModal(!basicModal);
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
    },
    {
      title: "Tuk Tuk S4",
      location: "Trondheim",
      distance: 141,
      year: 2009,
      img: "https://cdn.pixabay.com/photo/2016/09/04/12/09/tuktuk-1643802__340.jpg",
    },
  ];

  return (
    <div>
      <NavbarBeta toggleShow={toggleShow} />

      <Login
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        toggleShow={toggleShow}
      />

      <Box sx={{ flexGrow: 1, maxWidth: "1010px", mx: "auto", my: 4 }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon
                sx={{ width: 65, height: 50, color: "primary.main" }}
              />
            </IconButton>
          </Grid>
          <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon
                sx={{ width: 65, height: 50, color: "primary.main" }}
              />
            </IconButton>
          </Grid>
          <Grid item sm={12} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon
                sx={{ width: 65, height: 50, color: "primary.main" }}
              />
            </IconButton>
          </Grid>
          <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon
                sx={{ width: 65, height: 50, color: "primary.main" }}
              />
            </IconButton>
          </Grid>
          <Grid item sm={6} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon
                sx={{ width: 65, height: 50, color: "primary.main" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1010px",
          mx: "auto",
          my: 4,
          overflowX: "hidden"
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
