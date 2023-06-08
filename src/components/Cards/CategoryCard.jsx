import * as React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

export default function CategoryCard({ category, subcategories, image }) {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedSubs, setExpandedSubs] = React.useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubExpandClick = (name) => {
    setExpandedSubs(prev => ({...prev, [name]: !prev[name]}));
  };

  return (
    <Card sx={{ maxWidth: 200, mx: "auto", my: "auto" }}>
      <CardMedia component="img" height="150" image={image} alt={category} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={handleExpandClick}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            {category}
          </Typography>
        </CardContent>
        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {subcategories.map((sub) => (
            <Box key={sub.name}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: sub.subcategories.length > 0 ? "pointer" : "default",
                }}
                onClick={() =>
                  sub.subcategories.length > 0 && handleSubExpandClick(sub.name)
                }
              >
                <Link
                  to={`/${category.replace(/\s+/g, "-")}/${sub.name.replace(
                    /\s+/g,
                    "-"
                  )}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography paragraph>{sub.name}</Typography>
                </Link>
                {sub.subcategories.length > 0 && (
                  <ExpandMore
                    expand={expandedSubs[sub.name]}
                    aria-expanded={expandedSubs[sub.name]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                )}
              </Box>
              <Collapse
                in={expandedSubs[sub.name]}
                timeout="auto"
                unmountOnExit
              >
                {sub.subcategories &&
                  sub.subcategories.map((subSub) => (
                    <Link
                      to={`/${category.replace(/\s+/g, "-")}/${sub.name.replace(
                        /\s+/g,
                        "-"
                      )}/${subSub.name.replace(/\s+/g, "-")}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      key={subSub.name}
                    >
                      <Typography paragraph sx={{ ml: 3}}>
                        {subSub.name}
                      </Typography>
                    </Link>
                  ))}
              </Collapse>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
