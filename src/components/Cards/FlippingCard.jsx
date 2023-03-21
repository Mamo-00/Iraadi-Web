import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

/* const Container = styled("div")({
  display: "flex",
  overflowX: "scroll",
}); */

const StyledCard = styled(Card)({
  width: 200,
  height: 300,
  perspective: 1000,
  borderRadius: 15,
  transformStyle: "preserve-3d",
  transition: "transform 0.5s",
  transformOrigin: "center right",
  position: "relative",
  margin: "10px",
  "&:hover .front": {
    transform: "rotateY(-180deg)",
    transition: "transform 2s",
  },
  "&:hover .back": {
    transform: "rotateY(0deg)",
    transition: "transform 2s",
  },
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 15,
});

const StyledCardContent = styled(CardContent)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transition: "all 0.5s ease-in-out",
  backfaceVisibility: "hidden",
  padding: 0,
});

const Front = styled(StyledCardContent)({
  transform: "rotateY(0deg)",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
  borderRadius: 15,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transition: "all 0.5s ease-in-out",
  backfaceVisibility: "hidden",
  padding: 0,
});

const Back = styled(StyledCardContent)({
  transform: "rotateY(180deg)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  color: "black",
  fontSize: "1.5rem",
  padding: "1rem",
  width: 200,
  height: 300,
  overflow: "hidden",
  borderRadius: 15,
  filter: "drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5))",
  boxSizing: "border-box",
  position: "absolute",
  top: 0,
  left: 0,
  transition: "all 0.5s ease-in-out",
  backfaceVisibility: "hidden",
  boxShadow: "none", // Remove lingering box shadow
});


const FlippingCard = ({ img, title, location, distance, year, price }) => {
  return (
    <StyledCard>
      <Front className="front">
        <StyledCardMedia component="img" image={img} />
      </Front>
      <Back className="back">
        <Typography variant="subtitle2">{location}</Typography>
        <Typography gutterBottom variant="h5" component="div">
          {title}
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
            {distance}km
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {year}
          </Typography>
        </Box>
        <Typography variant="h4" color="text.primary" sx={{ mt: 1 }}>
          {price} NOK
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          <Typography variant="h6">See details</Typography>
        </Button>
      </Back>
    </StyledCard>
  );
};

export default FlippingCard;
