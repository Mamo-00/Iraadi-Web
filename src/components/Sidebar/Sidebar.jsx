import React, { useState } from "react";
import { useDispatch } from 'react-redux';
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
import { fetchFilteredAds } from "../../features/ads/adsSlice";

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
    setNegotiable("");
    setUsage([]);
  };

  const applyFilters = () => {
    const filters = {
      location,
      condition,
      usage,
      negotiable,
      // Add other filter states here
    };

    // Loop through each filter and apply it
    Object.keys(filters).forEach((key) => {
      console.log('key value in applyFilter:', key);
      const properCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
      console.log('key after the gruesome operation:', properCaseKey);
      handleFilterChange(properCaseKey, filters[key]); // <-- Use handleFilterChange here
    });

  };

  const debouncedApplyFilters = debounce(applyFilters, 300);

  const handleNegotiableChange = (event) => {
    setNegotiable(event.target.checked);
    handleFilterChange('Negotiable', event.target.checked);  // <-- Add this line
  };

  const handlePriceInputChange = (index, event) => {
    const newPrice = [...price];
    newPrice[index] = parseInt(event.target.value);
    setPrice(newPrice);
  };

  const usageOptions = [
    "New",
    "Used Once",
    "Light Usage",
    "Used",
    "Heavy Usage",
  ];
  const conditionOptions = ["Perfect", "Good", "Normal", "Poor", "Broken"];
  const negotiableOptions = ["Yes", "No"];
  const statusOptions = ["Available", "Sold"];

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
            onClick={() => handleOptionChange(option)}
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
          <MenuItem value="Bergen">Mogadishu</MenuItem>
          <MenuItem value="Oslo">Hargeysa</MenuItem>
          <MenuItem value="Stavanger">Galkayo</MenuItem>
          <MenuItem value="Ålesund">Burao</MenuItem>
          <MenuItem value="Tromsø">Bosaso</MenuItem>
          <MenuItem value="Trondheim">Kismayo</MenuItem>
          <MenuItem value="Trondheim">Baidoa</MenuItem>
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
        handleOptionChange={handleConditionChange}
      />

      <OptionBox
        title="Usage"
        options={usageOptions}
        selectedOptions={usage}
        handleOptionChange={handleUsageChange}
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