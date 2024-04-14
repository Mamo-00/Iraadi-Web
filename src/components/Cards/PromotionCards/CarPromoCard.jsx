import React, { useState } from 'react';
import { format } from 'date-fns';
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
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from "../../../features/user/userSlice";
import { useDispatch } from 'react-redux';

function CarPromoCard({ img, title, location, price, item, alreadyFavorited }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the CardActionArea
    setIsFavorited(!isFavorited);
    setSnackbarOpen(true);

    const uid = sessionStorage.getItem("user_uid");
    dispatch(addProductToFavorites({ uid, product: item }));
  };

  const removeFavorite = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the CardActionArea
    setIsFavorited(!isFavorited);
    const uid = sessionStorage.getItem("user_uid");
    dispatch(removeProductFromFavorites({ uid, product: item }));
    
    
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card
      sx={{
        width: 210,
        height: 240,
        overflow: "hidden",
        mx: 1,
        borderRadius: 2,
      }}
      style={{ boxShadow: "1px -2px 6px #ccc, 0px 1px 6px #808080" }}
    >
      <CardActionArea
        component={Link}
        to="/motors"
        style={{ textDecoration: "none" }}
        target="_blank"
      >
        <Box position="relative">
          <CardMedia
            component="img"
            sx={{ maxHeight: 140, overflow: "hidden" }}
            image={img}
            alt="Car"
          />
        </Box>
      </CardActionArea>
      <CardContent sx={{ p: 1 }}>
        <Stack direction="column">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {location}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                currencyDisplay: "narrowSymbol",
                minimumFractionDigits: 0,
              }).format(price)}
            </Typography>
            {alreadyFavorited ? (
              <IconButton
                sx={{
                  color: "primary.main",
                  zIndex: 100,
                }}
                onClick={removeFavorite}
              >
                <FavoriteBorderIcon
                  sx={{
                    color: "error.main",
                  }}
                />
              </IconButton>
            ) : (
             
         
            <IconButton
              sx={{
                color: "primary.main",
                zIndex: 100,
              }}
              onClick={handleFavoriteClick}
            >
              <FavoriteBorderIcon
                sx={{
                  color: isFavorited ? "error.main" : "primary.main",
                }}
              />
            </IconButton>
            )}
          </Box>
        </Stack>
      </CardContent>
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
