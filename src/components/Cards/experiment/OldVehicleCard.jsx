import React from "react";
import {
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Divider } 
  from '@mui/material';


function OldVehicleCard( { img, title, location, distance, year, price } ) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 750,
        overflow: "hidden",
        mx: 1,
      }}
      style={{ boxShadow: "1px -2px 9px #4189DD70, 0px 1px 9px #4189DD90" }}
    >
      <CardMedia
        component="img"
        sx={{ maxHeight: 350, overflow: "hidden" }}
        image={img}
        alt="Car"
      />
      <CardContent>
      <Typography variant="subtitle2">{location}</Typography>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Divider sx={{ my: 2 }} color="text.primary" />
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            {distance}km
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {year}
          </Typography>
        </Box>
        <Typography variant="h4" color="text.primary" sx={{ mt: 1 }}>
          {price} NOK
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          <Typography variant="h6">See details</Typography>
        </Button>
      </CardContent>
    </Card>
  );
}

export default OldVehicleCard;