import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Typography,
  Stack,
  Grid,
  Box,
  Fab,
  ImageList,
  ImageListItem,
  Breadcrumbs,
} from "@mui/material";
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/user/userSlice';

const ProductDetail = ({ ad }) => {
  const currentUser = useSelector((state) => selectCurrentUser(state));

  const { title, location, price, description, lastUpdated, published, phoneNumber } = ad;
  const categoryPath = useSelector(selectCategoryPath); // Replace with your selector


  return (
    <div style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ flex: '1', marginRight: '16px' }}> {/* Adjust styling as needed */}
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb">
        {categoryPath.map((item, index) => (
          <Link color="inherit" href={item.url} key={index}>
            {item.name}
          </Link>
        ))}
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>

      {/* Ad Title */}
      <Typography variant="h4">{title}</Typography>

      {/* Location */}
      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon fontSize="small" />
        {location}
      </Typography>

      {/* Price */}
      <Typography variant="h5">{price}</Typography>

      {/* Description */}
      <Typography variant="body1">{description}</Typography>

      {/* Last Updated & Published Text */}
      <Typography variant="caption" color="text.secondary">Last updated: {lastUpdated}</Typography>
      <Typography variant="caption" color="text.secondary">Published: {published}</Typography>

      {/* Seller's Phone Number & WhatsApp Link */}
      <Typography variant="body1">{phoneNumber}</Typography>
      <Link href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
      </Link>
    </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
