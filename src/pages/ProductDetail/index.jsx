import React, { useEffect, useState } from "react";
import { Stack, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import ProductDetailLoading from "../LoadingPages/ProductDetailLoading";
import "bootstrap/dist/css/bootstrap.min.css";
import { Typography, Box, Breadcrumbs, Grid, useMediaQuery } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector, useDispatch } from "react-redux";
import { selectUserById, fetchAllUsers } from "../../features/user/userSlice";
import { fetchSubcategories, selectAllSubcategories  } from '../../features/category/subcategorySlice';
import { fetchSubSubcategories, selectAllSubSubcategories } from '../../features/category/subsubcategorySlice';
import { selectAdById, fetchAds } from "../../features/ads/adsSlice";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css';
import Missing from "../../components/Missing/Missing";


const ProductDetail = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isSmallPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log("yo we here cuh?");
    setIsLoading(true);
    Promise.all([dispatch(fetchAds()), dispatch(fetchAllUsers())])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSubcategories());
    dispatch(fetchSubSubcategories());
  }, [dispatch]);

  const subcategories = useSelector((state) => selectAllSubcategories(state));
  const subSubcategories = useSelector((state) =>
    selectAllSubSubcategories(state)
  );

  // Get URL parameters
  const { category, idProductName } = useParams();

  const id = idProductName.split("-")[0];

  // Fetch the ad data from Redux state using the ID
  const ad = useSelector((state) => selectAdById(state, id));
  // Destructure the ad object to get individual fields

  let title,
    location,
    price,
    description,
    lastUpdated,
    published,
    uid,
    images,
    tags,
    negotiable,
    condition,
    categoryId,
    subcategoryId,
    subsubcategoryId,
    usage;

  if (ad) {
    ({
      Title: title,
      Location: location,
      Price: price,
      Description: description,
      DatePosted: lastUpdated,
      Status: published,
      uid: uid,
      Images: images,
      tags,
      Negotiable: negotiable,
      Condition: condition,
      Usage: usage,
      categoryId: categoryId,
      subcategoryId: subcategoryId,
      subsubcategoryId: subsubcategoryId,
    } = ad);
  } else {
  }

  const adOwner = useSelector((state) => selectUserById(state, uid));

  const subcategory = subcategories.find(
    (sub) => sub.id === subcategoryId
  )?.name;

  const subsubcategory = subSubcategories.find(
    (subSub) => subSub.id === subsubcategoryId
  )?.name;


   let dynamicHeight;

  // Set dynamicHeight based on screen size
  if (isSmallPhone) {
    dynamicHeight = 200;  // Set height for small phones
  } else if (isPhone) {
    dynamicHeight = 250;  // Set height for phones
  } else {
    dynamicHeight = 300;  // Set height for tablets
  } 

  const galleryImages = images?.map((image) => ({
    original: image,
    thumbnail: image,
    originalHeight: dynamicHeight,
  }));

  // Construct the breadcrumb path
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: category, url: `/${category}` },
    { name: subcategory, url: `/${category}/${subcategory}` },
    {
      name: subsubcategory,
      url: `/${category}/${subcategory}/${subsubcategory}`,
    },
  ];

  if (isLoading) {
    return <ProductDetailLoading />; // Show a loading indicator if isLoading is true
  }

  return (
    <Box sx={{ m: 0, p: 0, overflowX: "hidden" }}>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "940px",
          mx: 2,
          [theme.breakpoints.up("md")]: {
            mx: "auto",
          },
          my: 4,
          p: 2,
          borderRadius: 4,
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbItems.map((item, index) => (
            <Link color="inherit" to={item.url} key={index}>
              {item.name}
            </Link>
          ))}
        </Breadcrumbs>

        <Box sx={{ mt: 1 }}>
          <Grid
            container
            rowSpacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: ["column-reverse", "row"],
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                order: { sm: 2, md: 1 },
                [theme.breakpoints.up("md")]: {
                  width: "40%",
                },
              }}
            >
              <Box display={"flex"} flexDirection={"column"} sx={{ pr: 1 }}>
                {/* Ad Title */}
                <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
                  {title}
                </Typography>

                {/* Location */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <LocationOnIcon fontSize="small" />
                  {location}
                </Typography>

                {/* Price */}
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "narrowSymbol",
                  }).format(price)}
                </Typography>

                {/* Description */}
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {description}
                </Typography>

                {/* Last Updated & Published Text */}
                <Typography variant="subtitle2" color="text.secondary">
                  Last updated:
                  {isNaN(new Date(lastUpdated).getTime())
                    ? "Invalid date"
                    : format(new Date(lastUpdated), "dd MMMM yyyy")}
                </Typography>

                <Typography variant="body1" fontWeight={'bold'} sx={{ my: 2 }}>
                  Status: {published}
                </Typography>

                {/* Seller's Phone Number & WhatsApp Link */}
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography variant="h5" sx={{ mr: 1 }}>
                    {adOwner?.phoneNumber}
                  </Typography>
                  <Link
                    href={`https://wa.me/${adOwner?.phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                  </Link>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ order: { sm: 2, md: 1 } }}>
              <Box
                sx={{
                  [theme.breakpoints.up("lg")]: {
                    px: 3,
                  },
                }}
              >
                {/* Main Image Carousel */}
                <Gallery
                  items={galleryImages}
                  slideDuration={600}
                  showIndex={true}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  lazyLoad={true}
                  additionalClass="centerSmallImage"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default ProductDetail;
