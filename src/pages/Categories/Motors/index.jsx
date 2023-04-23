import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Login from "../../../components/Login";
import Sidebar from "../../../components/Sidebar"
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme, Stack, Box, Grid } from "@mui/material";
import VehicleCard from "../../../components/Cards/VehicleCard";

import { products } from "../../../utils/products";

const Motors = () => {
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
          flexGrow: 1,
          maxWidth: "1010px",
          mx: "auto",
          my: 4,
          
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item sm={4}>
            <Sidebar />
          </Grid>
          <Grid item sm={8}>
            <Stack direction="column" spacing={2}>
              {products?.map((item, index) => (
                <VehicleCard
                  key={index}
                  img={item?.img}
                  make={item?.make}
                  model={item?.model}
                  distance={item?.distance}
                  price={item?.price}
                  year={item?.year}
                  location={item?.location}
                  color={item?.color}
                  doors={item?.doors}
                  tags={item?.tags}
                  user={item?.user}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </div>
  );
};

export default Motors;