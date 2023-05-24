import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import Login from '../../components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import EuroSymbolOutlinedIcon from '@mui/icons-material/EuroSymbolOutlined';

import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiFormHelperText-root": {
    fontSize: "0.8rem",
    marginLeft: 5,
  },
});



const CreateAd = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");

  const [priceError, setPriceError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDesriptionError] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    if (event.target.value.length < 16) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    if (event.target.value.length < 50) {
      setDesriptionError(true);
    } else {
      setDesriptionError(false);
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
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
          flexGrow: 1,
          maxWidth: "1010px",
          [theme.breakpoints.down("sm")]: {
            mx: 2,
          },
          mx: "auto",
          my: 4,
          pb: 1,
          overflowX: "hidden",
        }}
        textAlign="center"
      >
        <Typography variant="h2" color="primary" sx={{ fontWeight: "bold" }}>
          Welcome!
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", mt: 2, mb: 4 }}
        >
          Please fill in the information that best suits your ad
        </Typography>

        <Stack direction="column" alignItems="center" spacing={4}>
          <StyledTextField
            error={titleError}
            value={title}
            onChange={handleTitleChange}
            required
            id="title"
            label="Title"
            variant="outlined"
            size="small"
            helperText={
              titleError
                ? "Title must be at least 16 characters"
                : //if there is no error we do the other check to see
                //if the screen size is a smaller screen
                isSmallScreen
                ? "Grab the reader's attention with your title"
                : "Grab the reader’s attention with an interesting title, minimum 16 letters."
            }
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
              width: "75%",
            }}
          />
          <StyledTextField
            error={descriptionError}
            value={description}
            onChange={handleDescriptionChange}
            required
            id="description"
            label="Description"
            variant="outlined"
            size="small"
            multiline
            rows={6}
            placeholder="Write a description that best describes your ad. Try and make it as informative as possible"
            helperText={
              descriptionError
                ? "Description must be at least 50 characters"
                : isSmallScreen
                ? "Describe your ad in detail"
                : "Describe your ad in detail, minimum 50 letters."
            }
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
              width: "75%",
              mt: 4,
            }}
          />
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
              width: "75%",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <StyledTextField
                value={price}
                onChange={handlePriceChange}
                required
                id="price"
                label="Price"
                variant="outlined"
                size="small"
                inputProps={{
                  step: 1,
                  min: 0,
                  type: "number",
                }}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    width: "50%",
                  },
                  width: "40%", // Adjust this value as needed
                }}
              />
              <FormControl
                variant="outlined"
                size="small"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    width: "30%",
                  },
                  width: "20%", // Adjust this value as needed
                }}
              >
                <InputLabel id="currency-label">Currency</InputLabel>
                <Select
                  labelId="currency-label"
                  id="currency"
                  value={currency}
                  onChange={handleCurrencyChange}
                  label="Currency"
                >
                  <MenuItem value="USD">
                    <AttachMoneyOutlinedIcon color="primary" sx={{ mr: 1 }} />
                    USD
                  </MenuItem>
                  <MenuItem value="EUR">
                    <EuroSymbolOutlinedIcon color="primary" sx={{ mr: 1 }} />
                    EUR
                  </MenuItem>
                  <MenuItem value="SOS">
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{ mx: 1, display: 'inline-block' }}
                      color="primary"
                    >
                      S
                    </Typography>{" "}
                    SOS
                  </MenuItem>
                  {/* Add more currencies as needed */}
                </Select>
              </FormControl>
            </Stack>
          </Box>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Categories
          </Button>
        </Stack>
      </Box>

      <Footer />
    </div>
  );
};

export default CreateAd