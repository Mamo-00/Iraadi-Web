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
import { subcategories, subsubcategories } from '../../utils/products'

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

export default function CategoryCard({ category, image }) {

  
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
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt={category.name}
      />
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
            {category.name}
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
          {/* 
          Here, I've used an immediately invoked function expression (IIFE) to create a new scope inside the JSX. This allows us to declare variables and run code before returning the JSX elements. Good for debugging.
           */}
          {(() => {
            const filteredSubcategories = subcategories.filter(
              (sub) => sub.categoryId === category.id
            );
            return filteredSubcategories.map((sub) => {
              const subSubcategories = subsubcategories.filter(
                (subsub) => subsub.subcategoryId === sub.id
              );
              return (
                <Box key={sub.name}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor:
                        subSubcategories.length > 0 ? "pointer" : "default",
                    }}
                    onClick={() =>
                      subSubcategories.length > 0 &&
                      handleSubExpandClick(sub.name)
                    }
                  >
                    <Link
                      to={`/${category.name.replace(
                        /\s+/g,
                        "-"
                      )}/${sub.name.replace(/\s+/g, "-")}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography paragraph>{sub.name}</Typography>
                    </Link>
                    {subSubcategories.length > 0 && (
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
                    {subSubcategories &&
                      subSubcategories.map((subSub) => (
                        <Link
                          to={`/${category.name.replace(
                            /\s+/g,
                            "-"
                          )}/${sub.name.replace(
                            /\s+/g,
                            "-"
                          )}/${subSub.name.replace(/\s+/g, "-")}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                          key={subSub.name}
                        >
                          <Typography paragraph sx={{ ml: 3 }}>
                            {subSub.name}
                          </Typography>
                        </Link>
                      ))}
                  </Collapse>
                </Box>
              );
            });
          })()}
        </CardContent>
      </Collapse>
    </Card>
  );
}
