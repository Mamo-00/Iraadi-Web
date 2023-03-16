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


function VehicleCard( { img } ) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 750,
        mx: "auto",
        boxShadow: 3,
        overflow: "hidden",
      }}
      style={{ boxShadow: "1px -2px 9px #4189DD, 0px 1px 9px #4189DD" }}
    >
      <CardMedia
        component="img"
        sx={{ maxHeight: 350, overflow: "hidden" }}
        image={img}
        alt="Car"
      />
      <CardContent>
        <Typography variant="subtitle2">Oslo</Typography>
        <Typography gutterBottom variant="h5" component="div">
          2018 BMW X3
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
            50 000 km
          </Typography>
          <Typography variant="body1" color="text.secondary">
            2018
          </Typography>
        </Box>

        <Button variant="contained" sx={{ mt: 2 }}>
          <Typography variant="h6">See details</Typography>
        </Button>
      </CardContent>
    </Card>
  );
}

export default VehicleCard;