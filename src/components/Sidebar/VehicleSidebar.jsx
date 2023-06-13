import React, { useState } from "react";
import { carMakes } from "../../utils/carMakes";
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
  IconButton,
} from "@mui/material";
import  CloseRoundedIcon  from '@mui/icons-material/CloseRounded';

const VehicleSidebar = () => {
  const maxYear = new Date().getFullYear();
  const minYear = 1930;

  const [location, setLocation] = useState("");
  const [make, setMake] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState([minYear, maxYear]);
  const [mileage, setMileage] = useState([0, 1]);
  const [doors, setDoors] = useState([]);
  const [tags, setTags] = useState([]);
  const [fuels, setFuels] = useState([]);

  const resetFilters = () => {
    setLocation("");
    setMake("");
    setColor("");
    setYear([minYear, maxYear]);
    setDoors([]);
    setTags([]);
    setFuels([]);
  };

  const handleYearChange = (event, newValue) => {
    setYear(newValue);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleMakeChange = (event) => {
    setMake(event.target.value);
  };

  const doorOptions = ["One", "Two", "Three", "Four", "Five+"];
  const handleDoorsChange = (value) => {
    setDoors((prevState) => {
      return prevState.includes(value)
        ? prevState.filter((door) => door !== value)
        : [...prevState, value];
    });
  };

  const tagOptions = ["Premium", "Dealer"];
  const handleTagsChange = (value) => {
    setTags((prevState) => {
      return prevState.includes(value)
        ? prevState.filter((tag) => tag !== value)
        : [...prevState, value];
    });
  };

  const fuelOptions = ["Gas", "Diesel", "Electricity"];
  const handleFuelsChange = (value) => {
    setFuels((prevState) => {
      return prevState.includes(value)
        ? prevState.filter((fuel) => fuel !== value)
        : [...prevState, value];
    });
  };

  const handleMileageInputChange = (index, event) => {
    const newMileage = [...mileage];
    newMileage[index] = parseInt(event.target.value);
    setMileage(newMileage);
  };

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
          onChange={handleLocationChange}
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

      {/*Set Year */}
      <Box display="flex" flexDirection="column" textAlign="center">
        <Typography variant="subtitle1">Year</Typography>
        <Stack direction="row" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mr: 1 }}>
            {year[0]}
          </Typography>
          <Slider
            label="year"
            getAriaLabel={() => "model year"}
            value={year}
            onChange={handleYearChange}
            valueLabelDisplay="auto"
            min={minYear}
            max={maxYear}
            sx={{ mx: 1 }}
          />
          <Typography variant="subtitle2" sx={{ ml: 1 }}>
            {year[1]}
          </Typography>
        </Stack>
      </Box>

      <Stack direction="row" sx={{ mb: 3 }}>
        <TextField
          variant="outlined"
          type="number"
          label="Km"
          value={mileage[0]}
          onChange={(event) => handleMileageInputChange(0, event)}
          inputProps={{
            step: 1000,
            min: 0,
            max: 1000000,
            type: "number",
          }}
          sx={{ mr: 2 }}
        />
        <Typography variant="subtitle2" sx={{ my: "auto" }}>
          Distance
        </Typography>
        <TextField
          variant="outlined"
          type="number"
          label="Km"
          value={mileage[1]}
          onChange={(event) => handleMileageInputChange(1, event)}
          inputProps={{
            step: 1000,
            min: 0,
            max: 1000000,
            type: "number",
          }}
          sx={{ ml: 2 }}
        />
      </Stack>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Doors
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {doorOptions.map((door) => (
            <Chip
              key={door}
              label={door}
              color={doors.includes(door) ? "secondary" : "primary"}
              onClick={() => handleDoorsChange(door)}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Tags
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {tagOptions.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              color={tags.includes(tag) ? "secondary" : "primary"}
              onClick={() => handleTagsChange(tag)}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Fuels
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {fuelOptions.map((fuel) => (
            <Chip
              key={fuel}
              label={fuel}
              color={fuels.includes(fuel) ? "secondary" : "primary"}
              onClick={() => handleFuelsChange(fuel)}
            />
          ))}
        </Box>
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="make-label">Make</InputLabel>
        <Select
          labelId="make-label"
          id="make-select"
          value={make}
          label="Make"
          onChange={handleMakeChange}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
            PaperProps: {
              style: {
                maxHeight: 200, // Set the maximum height of the dropdown here
              },
            },
          }}
        >
          {carMakes.map((make) => (
            <MenuItem key={make} value={make}>
              {make}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="color-label">Colors</InputLabel>
        <Select
          labelId="color-label"
          id="color-select"
          value={color}
          label="Colors"
          onChange={handleColorChange}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
            PaperProps: {
              style: {
                maxHeight: 200, // Set the maximum height of the dropdown here
              },
            },
          }}
        >
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="orange">Orange</MenuItem>
          <MenuItem value="green">Green</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="silver">Silver</MenuItem>
          <MenuItem value="black">Black</MenuItem>
          <MenuItem value="grey">Grey</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="color-label">Colors</InputLabel>
        <Select
          labelId="color-label"
          id="color-select"
          value={color}
          label="Colors"
          onChange={handleColorChange}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
            PaperProps: {
              style: {
                maxHeight: 200, // Set the maximum height of the dropdown here
              },
            },
          }}
        >
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="orange">Orange</MenuItem>
          <MenuItem value="green">Green</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="silver">Silver</MenuItem>
          <MenuItem value="black">Black</MenuItem>
          <MenuItem value="grey">Grey</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary">
        Apply
      </Button>
    </Box>
  );
};

export default VehicleSidebar;
