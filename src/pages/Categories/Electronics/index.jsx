import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer";
import Login from "../../../components/Login";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useTheme,
  Stack,
  Box,
  Grid,
  Button,
  Drawer,
  Backdrop,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

import { ArrowDropDown } from "@mui/icons-material";

import ElectronicsCard from "../../../components/Cards/DisplayCards/ElectronicsCard";

import { useProducts } from "../../../utils/hooks/useProducts"

const Electronics = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Default');
  const [anchorEl, setAnchorEl] = useState(null);

  const { category, subcategory, subsubcategory } = useParams();

  const electronicProducts = useProducts(category, subcategory, subsubcategory);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setSortOption(option);
    setAnchorEl(null);
  };

  const toggleShow = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div>
      <Navbar toggleShow={toggleShow} />

      <Login open={open} toggleShow={toggleShow} />

      <Box
        sx={{
          position: "sticky",
          top: -1, // top=0 gives a small gap at the top on mobile
          bgcolor: "background.default",
          flexGrow: 1,
          maxWidth: "1010px",
          mx: "auto",
          my: 4,
        }}
      >
        <Stack direction="row" sx={{ mb: 2 }} justifyContent="space-between">
          <Button
            variant="contained"
            sx={{ mx: 1, my: 2 }}
            onClick={() => setSidebarOpen(true)}
          >
            Filters
          </Button>

          <Button
            endIcon={<ArrowDropDown />}
            onClick={handleClick}
            variant="contained"
            sx={{ mx: 1, my: 2, textTransform: "capitalize" }}
          >
            Sort By: {sortOption}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose(sortOption)}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => handleClose("Popularity")}>
              <Typography variant="body1" fontWeight="bold">
                Popularity
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleClose("Price High to Low")}>
              <Typography variant="body1" fontWeight="bold">
                Price High to Low
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleClose("Price Low to High")}>
              <Typography variant="body1" fontWeight="bold">
                Price Low to High
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleClose("Alphabetical")}>
              <Typography variant="body1" fontWeight="bold">
                Alphabetical
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleClose("Newest First")}>
              <Typography variant="body1" fontWeight="bold">
                Newest First
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleClose("Oldest First")}>
              <Typography variant="body1" fontWeight="bold">
                Oldest First
              </Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </Box>

      <Box
        sx={{
          zIndex: 1400,
          flexGrow: 1,
          maxWidth: "1010px",
          mx: "auto",
          my: 4,
        }}
      >
        <Drawer
          anchor="right"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Backdrop open={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1010px",
          mx: "auto",
          my: 4,
        }}
      >
        {electronicProducts.length !== 0 ? (
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "flex-start", p: 0.5 }}
          >
            <Grid item sm={10}>
              <Stack direction="column">
                {electronicProducts.map((item) => (
                  <ElectronicsCard
                    key={item?.id}
                    title={item?.title}
                    img={item?.img}
                    price={item?.price}
                    location={item?.location}
                    user={item?.user}
                    category={category}
                    usage={item?.usage}
                    condition={item?.condition}
                    date={item?.date}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h2" textAlign="center" tabIndex="0">
            There is no content to display here
          </Typography>
        )}
      </Box>

      <Footer />
    </div>
  );
};

export default Electronics;
