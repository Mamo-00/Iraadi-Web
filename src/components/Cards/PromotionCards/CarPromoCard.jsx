import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
  Box,
  Snackbar,
} from '@mui/material';
import { FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function CarPromoCard({ img, distance, year, price, make, model }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the CardActionArea
    setIsFavorited(!isFavorited);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card
      sx={{
        width: 230,
        maxHeight: 260,
        overflow: "hidden",
        mx: 1,
      }}
      style={{ boxShadow: "1px -2px 9px #4189DD70, 0px 1px 9px #4189DD90" }}
    >
      <CardActionArea component={Link} to="/motors" target="_blank">
        <Box position="relative">
          <CardMedia
            component="img"
            sx={{ maxHeight: 130, overflow: "hidden" }}
            image={img}
            alt="Car"
            loading='lazy'
          />
        </Box>
        <CardContent sx={{ p: 1 }}>
          <Stack direction="column">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" color="text.secondary" sx={{ pt: 1 }}>
                {price}$
              </Typography>
              <IconButton
                aria-label="favorite"
                onClick={handleFavoriteClick}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.3)",
                  },
                }}
              >
                <FavoriteBorderIcon
                  color={isFavorited ? "secondary" : "primary"}
                />
              </IconButton>
            </Box>

            <Typography variant="body1">
              {make} <span>•</span> {model}
            </Typography>
            <Typography variant="body1">
              {year} <span>•</span> {distance} Km
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Favorited!"
      />
    </Card>
  );
}

export default CarPromoCard;
