import React from "react";
import { format } from 'date-fns';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

const ElectronicsCard = ( { id, img, title, location, price, usage, condition, date } ) => {
  const urlFriendlyProductName = title.toLowerCase().replace(/ /g, '-');
  return (
    <Link to={`/Electronics/${id}-${urlFriendlyProductName}`}>

      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 1,
          cursor: "pointer",
          mb: 2,
          borderBottom: 1,
          borderRight: 1,
        }}
      >
        <Box display="flex" maxHeight={200}>
          <CardMedia
            component="img"
            image={img}
            alt={title}
            sx={{
              maxWidth: "33%",
              maxHeight: "200px",
              objectFit: "cover",
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: 2,
              borderRight: 2,
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              flexGrow: 1,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }} color="text.primary">
                {title}
              </Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }} color="text.primary">
                {price}$
              </Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }} color="text.primary">
                Usage: {usage}
              </Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }} color="text.primary">
                Condition: {condition}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Box display="flex" alignItems="center">
                <LocationOnIcon fontSize="small" aria-label="location icon" />
                <Typography variant="body2" ml={0.5}>
                  {location}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                {isNaN(new Date(date).getTime())
                  ? "Invalid date"
                  : format(new Date(date), "dd MMMM yyyy")}
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
};

export default ElectronicsCard;
