import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Skeleton,
  Grid,
  Breadcrumbs,
} from "@mui/material";
import { Box } from "@mui/system";

const ProductDetailLoading = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box sx={{ m: 0, p: 0, overflowX: "hidden" }}>
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, maxWidth: "940px", mx: "auto", my: 4, py: 1 }}>
          {/* Breadcrumbs */}
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Skeleton variant="text" width={60} />
              <Skeleton variant="text" width={40} />
              <Skeleton variant="text" width={80} />
            </Breadcrumbs>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {/* Left Side: Text Content */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ pr: 2 }}>
                {/* Title */}
                <Skeleton variant="text" width={200} height={40} />
                {/* Description */}
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={100}
                  sx={{ my: 2 }}
                />
                {/* Additional Text */}
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="90%" />
              </Box>
            </Grid>

            {/* Right Side: Image Gallery */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ pl: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={300} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Skeleton variant="rectangular" width="18%" height={50} />
                  <Skeleton variant="rectangular" width="18%" height={50} />
                  <Skeleton variant="rectangular" width="18%" height={50} />
                  <Skeleton variant="rectangular" width="18%" height={50} />
                  <Skeleton variant="rectangular" width="18%" height={50} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetailLoading;
