import React from "react";
import { Card, CardMedia } from "@mui/material";

function ImageCard( { img } ) {
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
      
    </Card>
  );
}

export default ImageCard;