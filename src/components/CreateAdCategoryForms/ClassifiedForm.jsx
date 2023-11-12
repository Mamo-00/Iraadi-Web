import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Chip, Input, Box } from '@mui/material';

// ClassifiedForm component
const ClassifiedForm = ({ onFiltersChange }) => {
  // State for each of the filters
  const [usage, setUsage] = useState('');
  const [condition, setCondition] = useState("");
  const [tags, setTags] = useState([]);

  // Options for usage and condition, you can fetch these from Firestore or define them here
  const usageOptions = [
    "New",
    "Used Once",
    "Light Usage",
    "Used",
    "Heavy Usage",
  ];
  const conditionOptions = ["Perfect", "Good", "Normal", "Poor", "Broken"];

  // Handle changes in the form and pass the data up to the parent component if needed
  const handleUsageChange = (event) => {
    setUsage(event.target.value);
    // Pass the new filter values up to the parent component
    onFiltersChange({ usage: event.target.value, condition, tags });
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
    onFiltersChange({ usage, condition: event.target.value, tags });
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
    onFiltersChange({ usage, condition, tags: event.target.value });
  };

  return (
    <Box>
      <FormControl fullWidth margin="normal">
        <InputLabel id="usage-label">Usage</InputLabel>
        <Select
          labelId="usage-label"
          id="usage"
          value={usage}
          onChange={handleUsageChange}
        >
          {usageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="condition-label">Condition</InputLabel>
        <Select
          labelId="condition-label"
          id="condition"
          value={condition}
          onChange={handleConditionChange}
        >
          {conditionOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="tags-label">Tags</InputLabel>
        <Select
          labelId="tags-label"
          id="tags"
          multiple
          value={tags}
          onChange={handleTagsChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {/* You would fetch tag options from Firestore and map them here */}
          {/* This is just an example */}
          {['Brand', 'Model', 'Year'].map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ClassifiedForm;
