// SearchBar.js
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../features/category/categorySlice'; // Import your slice

const SearchBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => selectAllCategories(state));

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories when component mounts
  }, [dispatch]);

  const [recentSearches, setRecentSearches] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Function to handle selection
  const handleSelect = (event, newValue) => {
    if (newValue && !recentSearches.includes(newValue)) {
      setRecentSearches([...recentSearches, newValue]);
    }
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={recentSearches.length ? recentSearches : categories.map(cat => cat.name)}
      groupBy={(option) => option.name}  // Group by 'name' field
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          InputLabelProps={{
            style: { top: '-3px' },  // Adjust this value to center the label
          }}
          InputProps={{
            ...params.InputProps,
            style: { padding: '3px 8px' },
            endAdornment: (
              <>
                {inputValue && (
                  <ClearIcon
                    onClick={() => {
                      setInputValue('');
                    }}
                    sx={{ cursor: 'pointer'}}
                  />
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;
