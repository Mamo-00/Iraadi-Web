import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer";
import Login from "../../../components/Login";
import MobileSidebar from "../../../components/Sidebar/MobileSidebar";
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
  Hidden,
} from "@mui/material";

import { ArrowDropDown } from "@mui/icons-material";

import ClassifiedCard from "../../../components/Cards/DisplayCards/ClassifiedCard";


import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../../../features/category/categorySlice';
import { fetchSubcategories, selectAllSubcategories  } from '../../../features/category/subcategorySlice';
import { fetchSubSubcategories, selectAllSubSubcategories } from '../../../features/category/subsubcategorySlice';
import { fetchAds, selectAllAds, fetchFilteredAds } from "../../../features/ads/adsSlice";
import { subsubcategories } from "../../../utils/products";


const Classifieds = () => {
  const dispatch = useDispatch();
  const [activeFilters, setActiveFilters] = useState({
    subcategoryId: "",
    subSubcategoryId: "",
    minPrice: 0,
    maxPrice: null,
    Location: "",
    Condition: "",
    Usage: "",
    Negotiable: null,
    Status: "Available",
    // Add more filters here as needed
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Default");
  const [anchorEl, setAnchorEl] = useState(null); 
  const [loadMore, setLoadMore] = useState(false);
  

  const { subcategory, subsubcategory } = useParams();
 

  const categories = useSelector((state) => selectAllCategories(state));
  const subcategories = useSelector((state) => selectAllSubcategories(state));
  const subSubcategories = useSelector((state) =>
    selectAllSubSubcategories(state)
  );

  const ads = useSelector((state) => selectAllAds(state));
  const allAdsFetched = useSelector((state) => state.ads.allAdsFetched);
  // Extract the 'ads' array from the 'filteredAds' object in the Redux state.
  // Default to an empty array if 'filteredAds' or 'ads' is null.
  const filteredAds = useSelector((state) => state.ads.filteredAds?.ads || []);
  // console.log("filtered ads:", filteredAds);

  //handle pagination
  const [paginatedAds, setPaginatedAds] = useState(filteredAds);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const recordsPerPage = 2;
  const pagesVisited = pageNumber * recordsPerPage;
  const pageCount = Math.ceil(filteredAds.length / recordsPerPage);

  // Map subcategory and subsubcategory names to their IDs
  const subcategoryId = subcategories.find(
    (sub) => sub.name === subcategory
  )?.id;
  const subSubcategoryId = subSubcategories.find(
    (subSub) => subSub.name === subsubcategory
  )?.id;

  // Filter ads based on subcategoryId and subSubcategoryId
  let categoryAds = ads;

  // Filter by subcategoryId if it exists in activeFilters
  if (activeFilters.subcategoryId) {
    categoryAds = categoryAds.filter(
      (ad) => ad.subcategoryId === activeFilters.subcategoryId
    );
  }

  // Filter by subSubcategoryId if it exists in activeFilters
  if (activeFilters.subSubcategoryId) {
    categoryAds = categoryAds.filter(
      (ad) => ad.subSubcategoryId === activeFilters.subSubcategoryId
    );
  }
  /*
  // Filter by price range if both minPrice and maxPrice exist in activeFilters
  if (activeFilters.minPrice !== null && activeFilters.maxPrice !== null) {
    filteredAds = filteredAds.filter(
      (ad) =>
        ad.Price >= activeFilters.minPrice && ad.Price <= activeFilters.maxPrice
    );
  }

  if (activeFilters.Location) {
    filteredAds = filteredAds.filter(
      (ad) => ad.Location === activeFilters.Location
    );
  }
  
  if (activeFilters.Condition) {
    filteredAds = filteredAds.filter(
      (ad) => ad.Condition === activeFilters.Condition
    );
  }
  
  if (activeFilters.Usage) {
    filteredAds = filteredAds.filter(
      (ad) => ad.Usage === activeFilters.Usage
    );
  }
  
  if (activeFilters.Negotiable) {
    filteredAds = filteredAds.filter(
      (ad) => ad.Negotiable === activeFilters.Negotiable
    );
  }
  
  if (activeFilters.Status) {
    filteredAds = filteredAds.filter(
      (ad) => ad.Status === activeFilters.Status
    );
  } */
  const lastVisibleRedux = useSelector((state) => state.ads.lastVisible);
  // console.log("the active filters in Electronics", activeFilters);
  // console.log('the last visible ad from redux:', lastVisibleRedux);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
    dispatch(fetchSubSubcategories());

    dispatch(
      fetchFilteredAds({
        filters: activeFilters,
        lastVisible: lastVisibleRedux,
      })
    );
  }, [activeFilters]);

  useEffect(() => {
    dispatch(
      fetchFilteredAds({
        filters: activeFilters,
        lastVisible: lastVisibleRedux,
      })
    );
  }, [activeFilters, lastVisibleRedux, dispatch]);

  //handle pagination
  useEffect(() => {
    setPaginatedAds(filteredAds);
    setTotalPages(pageCount);
  }, [filteredAds, pageCount]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setSortOption(option);
    setAnchorEl(null);
  };

  const handleFilterChange = (filterType, value) => {
    // Update the activeFilters state with the new filter value
    setActiveFilters({
      ...activeFilters,
      [filterType]: value,
    });
    
    console.log('value in handleFilterChange - Classifieds:', value);
  };

  return (
    <div style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
      <Navbar />

      <Box
        sx={{
          position: "sticky",
          top: -1, // top=0 gives a small gap at the top on mobile
          bgcolor: "background.default",
          flexGrow: 1,
          maxWidth: "940px",
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

      <Hidden lgUp>
        <Box
          sx={{
            zIndex: 1400,
            flexGrow: 1,
            maxWidth: "940px",
            mx: "auto",
            my: 4,
          }}
        >
          <Drawer
            anchor="right"
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          >
            <MobileSidebar />
          </Drawer>
        </Box>
        <Backdrop open={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      </Hidden>

      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1018px",
          mx: "auto",
          my: 4,
        }}
      >
        <Grid container spacing={2}>
          {/* Sidebar */}
          <Hidden lgDown>
            <Grid item lg={4}>
              <Sidebar handleFilterChange={handleFilterChange} />
            </Grid>
          </Hidden>

          {/* Cards */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={2} sx={{ px: 1 }}>
              {paginatedAds
              ?.slice(pagesVisited, pagesVisited + recordsPerPage)
                .map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item?.id}>
                    <ClassifiedCard
                      id={item?.id}
                      title={item?.Title}
                      img={item?.Images[0]}
                      price={item?.Price}
                      location={item?.Location}
                      usage={item?.Usage}
                      condition={item?.Condition}
                      date={item?.DatePosted}
                      negotiable={item?.Negotiable}
                      subcategories={subcategories}
                      subsubcategories={subSubcategories}
                      subId={item?.subcategoryId}
                      subsubId={item?.subsubcategoryId}
                    />
                  </Grid>
                ))}

              {/* buttons for pagination */}
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    my: 2,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="outlined"
                      sx={{ mx: 1 }}
                      onClick={() => setPageNumber(0)}
                    >
                      First
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ mx: 1 }}
                      onClick={() => setPageNumber(pageNumber - 1)}
                      disabled={pageNumber === 0}
                    >
                      Previous
                    </Button>

                    {/* custom pages to navigate for pagination */}
                    {[...Array(totalPages)].map((_, index) => (
                      <Button
                        variant="outlined"
                        sx={{ mx: 1 }}
                        onClick={() => setPageNumber(index)}
                        disabled={pageNumber === index}
                      >
                        {index + 1}
                      </Button>
                    ))}

                    {/* custom pages to navigate for pagination */}

                    <Button
                      variant="outlined"
                      sx={{ mx: 1 }}
                      onClick={() => setPageNumber(pageNumber + 1)}
                      disabled={pageNumber === totalPages - 1}
                    >
                      Next
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ mx: 1 }}
                      onClick={() => setPageNumber(totalPages - 1)}
                    >
                      Last
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
            {filteredAds && filteredAds.length === 0 && (
              <Typography
                variant="h2"
                textAlign="center"
                tabIndex="0"
                sx={{ my: 20 }}
              >
                There is no content to display here
              </Typography>
            )}
            {filteredAds === null && (
              <Typography
                variant="h2"
                textAlign="center"
                tabIndex="0"
                sx={{ my: 20 }}
              >
                Loading...
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </div>
  );
};

export default Classifieds;
