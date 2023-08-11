import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const Loading = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={80} />
      </Box>
      <Footer />
    </Box>
  );
};

export default Loading;
