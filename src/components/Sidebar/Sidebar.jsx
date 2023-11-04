import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useOptionHandler } from '../../utils/hooks/useOptionHandler';
import {
  Box,
  Button,
  FormControl,
  Chip,
  Stack,
  Slider,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import  CloseRoundedIcon  from '@mui/icons-material/CloseRounded';
import { setFilterChange } from "../../features/ads/adsSlice";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Sidebar = ({ handleFilterChange }) => {
  
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [usage, setUsage, handleUsageChange] = useOptionHandler([]);
  const [condition, setCondition, handleConditionChange] = useOptionHandler([]);
  const [negotiable, setNegotiable] = useState(false);
  const [price, setPrice] = useState([0, 100000]);

  const resetFilters = () => {
    setLocation("");
    setCondition([]);
    setUsage([]);
    setNegotiable(null);
    setPrice([0, 100000]); // Reset price to default values
  };
  

  const applyFilters = () => {
    const filters = {
      Location: location,
      Condition: condition.join(', '), // Assuming multiple conditions can be selected
      Usage: usage.join(', '), // Assuming multiple usages can be selected
      Negotiable: negotiable,
      minPrice: price[0], // Min price
      maxPrice: price[1], // Max price
      // Add other filter states here
    };
  
    // Loop through each filter and apply it
    Object.keys(filters).forEach((key) => {
      console.log('Applying filter for:', key);
      handleFilterChange(key, filters[key]);
    });
  
    dispatch(setFilterChange(true));
  };
  

  const debouncedApplyFilters = debounce(applyFilters, 300);

  const handleNegotiableChange = (event) => {
    setNegotiable(event.target.checked);
    handleFilterChange('Negotiable', event.target.checked);  // <-- Add this line
  };

  const handlePriceInputChange = (index, event) => {
    const newPrice = [...price];
    const value = parseInt(event.target.value, 10);
    newPrice[index] = value;
    setPrice(newPrice);
  
    // Call handleFilterChange with 'MinPrice' or 'MaxPrice'
    const filterKey = index === 0 ? 'minPrice' : 'maxPrice';
    handleFilterChange(filterKey, value);
  };
  

  const usageOptions = [
    "New",
    "Used Once",
    "Light Usage",
    "Used",
    "Heavy Usage",
  ];
  const conditionOptions = ["Perfect", "Good", "Normal", "Poor", "Broken"];

  const OptionBox = ({
    title,
    options,
    selectedOptions,
    handleOptionChange,
  }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            color={selectedOptions.includes(option) ? "secondary" : "primary"}
            onClick={() =>{handleOptionChange(option);
              handleFilterChange(title, option);
            }}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        width: "300px",
        position: "sticky",
        top: 50,
        mt: 4,
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        onClick={resetFilters}
        sx={{ mb: 2, width: "33%", height: "50%" }}
      >
        <Typography variant="button">Reset</Typography>
      </Button>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="location-label">Location</InputLabel>
        <Select
          labelId="location-label"
          id="location-select"
          value={location}
          label="Location"
          onChange={(e) => {
            setLocation(e.target.value);
            handleFilterChange("Location", e.target.value);
          }}
        >
          <MenuItem value="Mogadishu">Mogadishu</MenuItem>
          <MenuItem value="Hargeysa">Hargeysa</MenuItem>
          <MenuItem value="Galkayo">Galkayo</MenuItem>
          <MenuItem value="Burao">Burao</MenuItem>
          <MenuItem value="Burco">Burco</MenuItem>
          <MenuItem value="Shingaani">Shingaani</MenuItem>
          <MenuItem value="darusalam">darusalam</MenuItem>
          <MenuItem value="Xamar">Xamar</MenuItem>
          <MenuItem value="Bosaso">Bosaso</MenuItem>
          <MenuItem value="Kismayo">Kismayo</MenuItem>
          <MenuItem value="Baidoa">Baidoa</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" sx={{ mb: 3 }}>
        <TextField
          variant="outlined"
          type="number"
          label="Min Price"
          value={price[0]}
          onChange={(event) => handlePriceInputChange(0, event)}
          inputProps={{
            step: 100,
            min: 0,
            max: 100000,
            type: "number",
          }}
          sx={{ mr: 2 }}
        />
        <Typography variant="subtitle2" sx={{ my: "auto" }}>
          to
        </Typography>
        <TextField
          variant="outlined"
          type="number"
          label="Max Price"
          value={price[1]}
          onChange={(event) => handlePriceInputChange(1, event)}
          inputProps={{
            step: 100,
            min: 0,
            max: 100000,
            type: "number",
          }}
          sx={{ ml: 2 }}
        />
      </Stack>

      <OptionBox
        title="Condition"
        options={conditionOptions}
        selectedOptions={condition}
        handleOptionChange={(option) => {
          handleConditionChange(option);
          // Assuming you want to handle multiple conditions, you might need to adjust this
          handleFilterChange(
            "Condition",
            condition.includes(option)
              ? condition.filter((c) => c !== option)
              : [...condition, option]
          );
        }}
      />

      <OptionBox
        title="Usage"
        options={usageOptions}
        selectedOptions={usage}
        handleOptionChange={(option) => {
          handleUsageChange(option);
          // Assuming you want to handle multiple usages, you might need to adjust this
          handleFilterChange(
            "Usage",
            usage.includes(option)
              ? usage.filter((u) => u !== option)
              : [...usage, option]
          );
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={negotiable}
            onChange={handleNegotiableChange}
            name="Negotiable"
            color="primary"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
          />
        }
        label={
          <Typography variant="body1" sx={{ fontSize: 18 }}>
            Negotiable
          </Typography>
        }
        labelPlacement="start"
        sx={{
          flexDirection: "row-reverse",
          justifyContent: "start",
          marginLeft: 0,
        }}
      />

      <Button variant="contained" color="primary" onClick={applyFilters}>
        Apply
      </Button>
    </Box>
  );
};

export default Sidebar;


