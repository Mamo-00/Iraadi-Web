import React, { useState } from "react";
import NavbarBeta from "../../components/NavbarBeta";
import Footer from "../../components/Footer";
import Login from "../../components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import VehicleCard from "../../components/Cards/VehicleCard";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import styled from "styled-components";
// import { Link } from "react-router-dom";
import "../../styles.css";
import { IconButton } from "@mui/material";
import BikeScooterOutlinedIcon from '@mui/icons-material/BikeScooterOutlined';




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
    setBasicModal(!basicModal)
  };

  return (
    <div>
      <header st>
        {" "}
        <NavbarBeta toggleShow={toggleShow} />{" "}
      </header>
      <Login
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        toggleShow={toggleShow}
      />
      <Box sx={{ flexGrow: 1, maxWidth: "1010px", mx: "auto", my: 4 }}>
        <Grid container spacing={2} sx={{display: "flex", justifyContent: "center" }}>
          <Grid item md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon sx={{width: 65, height: 50, color: "primary.main"}} />
            </IconButton>
          </Grid>
          <Grid item md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon sx={{width: 65, height: 50, color: "primary.main"}}/>
            </IconButton>
          </Grid>
          <Grid item md={12} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon sx={{width: 65, height: 50, color: "primary.main"}}/>
            </IconButton>
          </Grid>
          <Grid item md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon sx={{width: 65, height: 50, color: "primary.main"}}/>
            </IconButton>
          </Grid>
          <Grid item md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <BikeScooterOutlinedIcon sx={{width: 65, height: 50, color: "primary.main"}}/>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, maxWidth: "1010px", mx: "auto", my: 4 }}>
        <Grid container spacing={2} >
          <Grid item xs={6} md={4}>
            <VehicleCard img="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </Grid>
          <Grid item xs={6} md={4}>
            <VehicleCard img="https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=1600"/>
          </Grid>
          <Grid item xs={6} md={4}>
            <VehicleCard img="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1600"/>
          </Grid>
          <Grid item xs={6} md={4}>
            <VehicleCard img="https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg?auto=compress&cs=tinysrgb&w=1600"/>
          </Grid>
          <Grid item xs={6} md={4}>
            <VehicleCard img="https://images.pexels.com/photos/1519192/pexels-photo-1519192.jpeg?auto=compress&cs=tinysrgb&w=1600"/>
          </Grid>
          <Grid item xs={6} md={4}>
            <VehicleCard img="https://cdn.fleetnews.co.uk/web-clean/1/root/new-tuk-tuks-provide-additional-support_w268.jpg"/>
          </Grid>
          <Grid item xs={6} md={4}>
            <VehicleCard img="https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=1600"/>
          </Grid>
          <Grid item xs={6} md={4}>
            <VehicleCard img="https://images.pexels.com/photos/376361/pexels-photo-376361.jpeg?auto=compress&cs=tinysrgb&w=1600"/>
          </Grid>
          <Grid item xs={6} md={4}>
            <VehicleCard img="https://cdn.pixabay.com/photo/2016/09/04/12/09/tuktuk-1643802__340.jpg"/>
          </Grid>

        </Grid>
      </Box>

      <Footer />
    </div>
  );
};

export default Home;
