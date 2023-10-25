import React from "react";
import { format } from "date-fns";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VehicleCardIcons from '../../Icons/VehicleCardIcons';
import { Link } from "react-router-dom";

const MotorsCard = ({
  id,
  img,
  title,
  negotiable,
  location,
  price,
  door,
  distance,
  doors,
  color,
  year,
  date,
  subcategories,
  subsubcategories,
  subId,
  subsubId,
}) => {
  const urlFriendlyProductName = title.toLowerCase().replace(/ /g, "-");
  const subcategory = subcategories.find((sub) => sub.id === subId)?.name;
  const subsubcategory = subsubcategories.find(
    (subSub) => subSub.id === subsubId
  )?.name;

  return (
    <Link
      to={`/details/Electronics/${subcategory}/${subsubcategory}/${id}-${urlFriendlyProductName}`}
    >
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 1,
          cursor: "pointer",
          mb: 2,
        }}
      >
        {/* Image at the top */}
        {/* TODO: make it display an array of images instead of a single image.
                    'A feature for the future' - Mahmod Mohamed          
          */}
        <CardMedia
          component="img"
          image={img}
          alt={title}
          sx={{
            maxHeight: "180px",
            objectFit: "contain",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            background:
              "linear-gradient(to bottom, #F8F7F7, #EDEDED, #D0D0D0 )",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        {/* Text details beneath the image */}
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              currencyDisplay: "narrowSymbol",
            }).format(price)}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            mt={1}
          >
            <Box display="flex" alignItems="center" mr={1}>
              <VehicleCardIcons
                category="year"
                style={{ width: 30, height: 35 }}
                aria-label="calender icon"
              />
              <Typography
                variant="body1"
                fontWeight="bold"
                ml={0.5}
                color="text.primary"
              >
                {year}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mr={1}>
              <VehicleCardIcons
                category="mileage"
                style={{ width: 30, height: 35 }}
                aria-label="speedometer icon"
              />
              <Typography
                variant="body1"
                fontWeight="bold"
                ml={0.5}
                color="text.primary"
              >
                {distance} km
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mr={1}>
              <VehicleCardIcons
                category="doors"
                style={{ width: 30, height: 35 }}
                aria-label="door icon"
              />
              <Typography
                variant="body1"
                fontWeight="bold"
                ml={0.5}
                color="text.primary"
              >
                {doors} doors
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <VehicleCardIcons
                category="palette"
                style={{ width: 30, height: 35 }}
                aria-label="palette icon"
              />
              <Typography
                variant="body1"
                fontWeight="bold"
                ml={0.5}
                color="text.primary"
              >
                {color}
              </Typography>
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
            <Typography variant="body2">
              {isNaN(new Date(date).getTime())
                ? "Invalid date"
                : format(new Date(date), "dd MMMM yyyy")}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MotorsCard;
