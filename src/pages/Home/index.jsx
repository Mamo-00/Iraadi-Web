import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

import CategoryIcons from "../../components/Icons/CategoryIcons";

import "bootstrap/dist/css/bootstrap.min.css";
import CategoryCard from "../../components/Cards/CategoryCard";
import { useTheme } from "@mui/material";
import { products } from "../../utils/products";
import CarsPromoCard from '../../components/Cards/PromotionCards/CarPromoCard'
import {
  Typography,
  Stack,
  Grid,
  Box,
  Fab,
  ImageList,
  ImageListItem,
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import { selectCurrentUser } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../../features/category/categorySlice';
import { fetchSubcategories, selectAllSubcategories  } from '../../features/category/subcategorySlice';
import { fetchSubSubcategories, selectAllSubSubcategories } from '../../features/category/subsubcategorySlice';


const Home = () => {
  const dispatch = useDispatch();
  
  const categories = useSelector((state) => selectAllCategories(state));
  const subcategories = useSelector((state) => selectAllSubcategories(state));
  const subSubcategories = useSelector((state) => selectAllSubSubcategories(state));
  const currentUser = useSelector((state) => selectCurrentUser(state));

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
    dispatch(fetchSubSubcategories());
  }, []);

  
  // Function to filter subcategories based on categoryId
  const filterSubcategoriesByCategoryId = (categoryId) => {
    return subcategories.filter(subcategory => subcategory.categoryId === categoryId);
  };

  // Function to filter subsubcategories based on categoryId
  const filterSubsubcategoriesByCategoryId = (categoryId) => {
    return subSubcategories.filter(subsubcategory => subsubcategory.categoryId === categoryId);
  };

  const theme = useTheme();

  const Promo = ( { title } ) => {
    return (
      <>
      <Typography variant="h4" color="text.primary" sx={{ my: 3, ml: 1 }}>
        {title}
      </Typography>
      <ImageList
        sx={{
          maxWidth: 940,
          height: 270,
          p: 1,
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        }}
        cols={products?.length + 1} // +1 to show FAB component
        rowHeight={260}
      >
        {products?.map((item, index) => (
          <ImageListItem key={index}>
            <CarsPromoCard
              img={item?.img}
              distance={item?.distance}
              price={item?.price}
              year={item?.year}
              make={item?.make}
              model={item?.model}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </ImageListItem>
        ))}
        <ImageListItem sx={{ justifyContent: "center", mx: 1 }}>
          <Fab color="primary" aria-label="view all">
            <ArrowForwardIcon />
          </Fab>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            View All Items
          </Typography>
        </ImageListItem>
      </ImageList>
      <Stack
        direction="row"
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
          justifyContent: 'space-between'
        }}
      >
        {products?.slice(0, 4).map((item, index) => (
          <CarsPromoCard
            key={index}
            img={item?.img}
            distance={item?.distance}
            price={item?.price}
            year={item?.year}
            make={item?.make}
            model={item?.model}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ))}
      </Stack>
    </>
    );
    
  };

  return (
    <div style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          maxWidth: "940px",
          mx: 2,
          [theme.breakpoints.up("md")]: {
            mx: "auto",
          },
          my: 4,
          py: 1,
          px: 5,
          justifyContent: 'center',
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      >
        <Typography variant="h3" fontWeight={600} sx={{
          display: 'flex', 
          flexDirection: 'row', 
          p: 1, 
          
        }}>
          Welcome - Soo Dhawoow
          {currentUser ?
            <Box sx={{}} color='text.primary'>, </Box>
            :
            <Box display={'none'}></Box>
          }
          <Box sx={{ ml: 1 }} color='text.secondary'>
            {currentUser?.displayName}
          </Box>
        </Typography>
         
      </Box>
     
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "940px",
          mx: 2,
          [theme.breakpoints.up("md")]: {
            mx: "auto",
          },
          my: 4,
          py: 1,
          borderRadius: 4,
        }}
      >
        <Grid
          container
          spacing={0.5}
          rowSpacing={5}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {categories?.map((category, index) => {
            // Get the subcategories that belong to this category
            const relevantSubcategories = filterSubcategoriesByCategoryId(category.id);
            const relevantSubsubcategories = filterSubsubcategoriesByCategoryId(category.id);
            return (
              // TODO: add a new page for further filtering when on mobile page
              <Grid item xs={4} sm={2.2} key={index}>
                {/* Pass the relevant subcategories as a prop */}
                <CategoryCard
                  category={category}
                  subcategories={relevantSubcategories}
                  subsubcategories={relevantSubsubcategories}
                  IconComponent={CategoryIcons}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "940px",
          mx: "auto",
          my: 4,
          pb: 1,
          overflowX: "hidden",
        }}
        
      >
        <Promo title="Recently Looked At" />
        <Promo title="Popular Cars" />
        <Promo title="Popular Properties" />
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
