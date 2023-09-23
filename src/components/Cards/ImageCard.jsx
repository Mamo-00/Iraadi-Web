import React from "react";
import { Card, CardMedia, CardActionArea } from "@mui/material";
import { Link  } from 'react-router-dom';

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
      <CardActionArea component={Link} to={img} target="_blank" >
        
          <CardMedia
            component="img"
            sx={{ maxHeight: 275, overflow: "hidden" }}
            image={img}
            alt="Car"
          />
        
      </CardActionArea>
    </Card>
  );
}

export default ImageCard;