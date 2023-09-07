import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <IconButton
      {...other}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // Handle the enter key press here
          e.preventDefault();
          other.onClick();
        }
      }}
    />
  );
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "0PX",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function CategoryCard({ category, subcategories, subsubcategories, IconComponent }) {

  const [expanded, setExpanded] = useState(false);
  const [expandedSubs, setExpandedSubs] = useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubExpandClick = (name) => {
    setExpandedSubs(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (

    <Box sx={{ maxWidth: 200, mx: "auto", my: "auto", textAlign: "center", position: 'relative' }}>
      <Box key={category?.id}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton aria-label={category?.name} size="large">
            <Link
              to={`/${category?.name.replace(/\s+/g, "-")}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconComponent category={category?.name} style={{ width: 50, height: 40 }} />
            </Link>
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%', // Ensure the text and caret take up the full width
            }}
          >
            <Link
              to={`/${category?.name.replace(/\s+/g, "-")}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="body1" color="text.primary" >
                {category?.name}
              </Typography>
            </Link>
            <ExpandMore
              expand={expanded}
              aria-expanded={expanded}
              aria-label="show more"
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
        </Box>
        <Box sx={{
          position: 'absolute',
          width: '100%',
          zIndex: 1,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 4,
        }}>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent style={{ paddingBottom: 0 }}>
              {subcategories.map((sub, index) => {
                const relevantSubsubcategories = subsubcategories.filter(subsub => subsub?.subcategoryId == sub.id);
                const displaySubsubcategories = relevantSubsubcategories.slice(0, 5); // Limit to 5

                return (
                  <Box key={sub.id}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Link to={`/${category.name.replace(/\s+/g, '-')}/${sub.name.replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="body1" sx={{ textAlign: 'left', mb: 1 }}>{sub.name}</Typography>
                      </Link>
                      {relevantSubsubcategories.length > 0 && (
                        <IconButton onClick={() => handleSubExpandClick(sub.id)}>
                          <ExpandMoreIcon />
                        </IconButton>
                      )}
                    </Box>
                    <Collapse in={expandedSubs[sub.id]} timeout='auto' unmountOnExit sx={{ textAlign: 'left' }}>
                      {displaySubsubcategories.map((subSub) => (
                        <Link to={`/${category.name.replace(/\s+/g, '-')}/${sub.name.replace(/\s+/g, '-')}/${subSub.name.replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', color: 'inherit' }} key={subSub.id}>
                          <Typography variant="body1" sx={{ ml: 1, mb: 1 }}>• {subSub?.name}</Typography>
                        </Link>
                      ))}
                      {relevantSubsubcategories.length > 5 && (
                        <Link to={`/${category.name.replace(/\s+/g, '-')}/${sub.name.replace(/\s+/g, '-')}/all`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Typography paragraph sx={{ ml: 1 }}>All in {sub.name}</Typography>
                        </Link>
                      )}
                    </Collapse>
                  </Box>
                );
              })}
            </CardContent>
          </Collapse>
        </Box>

      </Box>

    </Box>
  );

}
