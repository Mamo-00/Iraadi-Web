import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
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

  const Promo = ( { title } ) => {
    return (
      <>
      <Typography variant="h4" color="primary" sx={{ my: 2 }}>
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
      <Navbar toggleShow={toggleShow} />

      <Login open={open} toggleShow={toggleShow} />

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
                <Link to="/motors">
                  <CategoryIcons
                    category="vehicle"
                    style={{ width: 65, height: 50 }}
                  />
                </Link>
              </IconButton>
              <Typography variant="body1" align="center" color="primary">
                Motors
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
              <Typography variant="body1" align="center" color="primary">
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
          pb: 1,
          overflowX: "hidden",
        }}
        textAlign="center"
      >
        <Promo title="Recently Looked At"/>
        <Promo title="Popular Cars"/>
        <Promo title="Popular Properties"/>
        
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
