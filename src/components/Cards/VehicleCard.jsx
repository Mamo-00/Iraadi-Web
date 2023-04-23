import React from "react";
import VehicleCardIcons from '../Icons/VehicleCardIcons';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Avatar
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const VehicleCard = ( { img, make, model, location, distance, year, price, user, color, doors, description } ) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1, cursor: "pointer", mb: 2, borderBottom: 1, borderRight: 1 }}>
      <Box display="flex">
        <CardMedia
          component="img"
          image={img}
          alt={make + model}
          sx={{
            maxWidth: "33%",
            maxHeight: "200px",
            objectFit: "cover",
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Box>
            <Typography variant="h3" fontWeight="bold" sx={{mb: 2}}>
              {price} $
            </Typography>
            <Typography variant="body1">
              {make} <span>•</span> {model}
            </Typography>
            <Typography variant="body2" noWrap>
              {description}
            </Typography>
            <Box display="flex" alignItems="center" flexWrap="wrap" mt={1}>
              <Box display="flex" alignItems="center" mr={1}>
                <VehicleCardIcons
                  category="year"
                  style={{ width: 30, height: 35 }}
                />
                <Typography variant="body2" ml={0.5}>
                  {year}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mr={1}>
                <VehicleCardIcons
                  category="mileage"
                  style={{ width: 30, height: 35 }}
                />
                <Typography variant="body2" ml={0.5}>
                  {distance} km
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mr={1}>
                <VehicleCardIcons
                  category="doors"
                  style={{ width: 30, height: 35 }}
                />
                <Typography variant="body2" ml={0.5}>
                  {doors} doors
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <VehicleCardIcons
                  category="palette"
                  style={{ width: 30, height: 35 }}
                />
                <Typography variant="body2" ml={0.5}>
                  {color}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box display="flex" alignItems="center">
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2" ml={0.5}>
                {location}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              
              <Avatar
                alt={user}
                src={user}
                sx={{ width: 24, height: 24 }}
              />
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default VehicleCard;
