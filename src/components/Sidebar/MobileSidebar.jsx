import React, { useState, useEffect } from "react";
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
} from "@mui/material";

const MobileSidebar = () => {
  
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState([]);
  const [usage, setUsage] = useState([]);
  const [tags, setTags] = useState([]);

  const resetFilters = () => {
    setLocation("");
    setSelectedCategory("");
    setTags([]);
  };

  const handleSelectedCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  

  const tagOptions = ["Premium", "Dealer"];
  const handleTagsChange = (value) => {
    setTags((prevState) => {
      return prevState.includes(value)
        ? prevState.filter((tag) => tag !== value)
        : [...prevState, value];
    });
  };

  const conditionOptions = ["New", "Excellent", "Good", "Poor", "Damaged"];
  const handleConditionChange = (value) => {
    setCondition((prevState) => {
      return prevState.includes(value)
        ? prevState.filter((condition) => condition !== value)
        : [...prevState, value];
    });
  };

  const usageOptions = ["Never Used", "Slightly Used", "Normal Usage", "Heavily Used", "Overused"];
  const handleUsageChange = (value) => {
    setUsage((prevState) => {
      return prevState.includes(value)
        ? prevState.filter((usage) => usage !== value)
        : [...prevState, value];
    });
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

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="categpry-label">Category</InputLabel>
        <Select
          labelId="categpry-label"
          id="categpry-select"
          value={selectedCategory}
          label="Category"
          onChange={handleSelectedCategoryChange}
        >
          <MenuItem value="Computers">Computers</MenuItem>
          <MenuItem value="Home Appliances">Home Appliances</MenuItem>
          <MenuItem value="Photo and Video">Photo and Video</MenuItem>
          <MenuItem value="Gaming">Gaming</MenuItem>
          <MenuItem value="Televisions">Televisions</MenuItem>
          <MenuItem value="Audio">Audio</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Tags
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {tagOptions.map((tag) => (
            <Chip
              key={tag}
              label={<Typography variant="body1">{ tag }</Typography>}
              color={tags.includes(tag) ? "secondary" : "primary"}
              onClick={() => handleTagsChange(tag)}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Condition
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {conditionOptions.map((conditions) => (
            <Chip
              key={conditions}
              label={<Typography variant="body1">{ conditions }</Typography>}
              color={condition.includes(conditions) ? "secondary" : "primary"}
              onClick={() => handleConditionChange(conditions)}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Usage
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {usageOptions.map((usages) => (
            <Chip
              key={usages}
              label={<Typography variant="body1">{ usages }</Typography>}
              color={usage.includes(usages) ? "secondary" : "primary"}
              onClick={() => handleUsageChange(usages)}
            />
          ))}
        </Box>
      </Box>

    
      <Button variant="contained" color="primary">
        Apply
      </Button>
    </Box>
  );
};

export default MobileSidebar;
