import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer";
import Login from "../../../components/Login";
import VehicleSideBar from "../../../components/Sidebar/VehicleSidebar"
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme, Stack, Box, Grid } from "@mui/material";
import VehicleCard from "../../../components/Cards/DisplayCards/VehicleCard";

import { useProducts } from "../../../utils/hooks/useProducts"

const Motors = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const { subcategory, subsubcategory } = useParams();

  const motorProducts = useProducts("Motors", subcategory, subsubcategory);
  console.log("motors product", motorProducts);

  const toggleShow = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div>
      <Navbar />

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
            <VehicleSideBar />
          </Grid>
          <Grid item sm={8}>
            <Stack direction="column" spacing={2}>
              {motorProducts.map((item) => (
                <VehicleCard
                  key={item?.id}
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
