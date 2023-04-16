import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import ImageCard from './Cards/ImageCard'
import Masonry from '@mui/lab/Masonry';

const UserAds = ({ ads, recentSearches, favorites }) => {
  const renderAdItems = (items) => {
    return items.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Box>{item.title}</Box>
      </Grid>
    ));
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
  ];
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={4}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          My ads
        </Typography>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{mx: "auto"}}>
          {products?.map((item, index) => (
            <ImageCard
              key={index}
              img={item?.img}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ))}
        </Masonry>
      </Box>

      <Box textAlign="center" my={4}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          My ads
        </Typography>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{mx: "auto"}}>
          {products?.map((item, index) => (
            <ImageCard
              key={index}
              img={item?.img}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ))}
        </Masonry>
      </Box>

      <Box textAlign="center" my={4}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          My ads
        </Typography>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{mx: "auto"}}>
          {products?.map((item, index) => (
            <ImageCard
              key={index}
              img={item?.img}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ))}
        </Masonry>
      </Box>
    </Container>
  );
};

export default UserAds;
