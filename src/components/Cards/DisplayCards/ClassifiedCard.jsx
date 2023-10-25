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

const ClassifiedCard = ({
  id,
  img,
  title,
  negotiable,
  location,
  price,
  usage,
  condition,
  date,
  subcategories,
  subsubcategories,
  subId,
  subsubId,
}) => {
  const urlFriendlyProductName = title.toLowerCase().replace(/ /g, "-");
  const subcategory = subcategories.find((sub) => sub.id === subId)?.name;
  const subsubcategory = subsubcategories.find((subSub) => subSub.id === subsubId)?.name;

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
        
        <CardMedia
          component="img"
          image={img}
          alt={title}
          sx={{
            height: "180px",
            objectFit: "contain",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            background:
              "linear-gradient(to bottom, #F8F7F7, #EDEDED, #D0D0D0 )",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        {/* Text details beneath the image */}
        <CardContent sx={{ pb: 0 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 1,
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              currencyDisplay: "narrowSymbol",
            }).format(price)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Usage: {usage}
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Condition: {condition}
          </Typography>
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

export default ClassifiedCard;
