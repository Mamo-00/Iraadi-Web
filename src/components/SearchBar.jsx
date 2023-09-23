import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories } from '../features/category/categorySlice';
import { fetchSubcategories, selectAllSubcategories } from '../features/category/subcategorySlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => selectAllCategories(state));
  const subcategories = useSelector((state) => selectAllSubcategories(state));

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
  }, [dispatch]);

  const [recentSearches, setRecentSearches] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Create a combined array of categories and subcategories
  const combinedOptions = subcategories.map(sub => ({
    name: sub.name,
    type: 'Subcategory',
    categoryId: sub.categoryId
  }));

  // Sort and then group the options
  const sortedOptions = combinedOptions.sort((a, b) => {
    const catA = categories.find(cat => cat.id === a.categoryId) || a;
    const catB = categories.find(cat => cat.id === b.categoryId) || b;
    return catA.name.localeCompare(catB.name);
  });

  // Function to handle selection
  const handleSelect = (event, newValue) => {
    if (newValue && !recentSearches.includes(newValue)) {
      setRecentSearches([...recentSearches, newValue]);
    }
  };

   // Function to remove a recent search
   const removeRecentSearch = (item) => {
    setRecentSearches(recentSearches.filter(search => search !== item));
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      options={inputValue ? sortedOptions : (recentSearches.length ? recentSearches : sortedOptions)} //i know i know, its a headache to look at

      groupBy={(option) => {
        const parentCategory = categories.find(cat => cat.id === option.categoryId);
        return parentCategory ? parentCategory.name : 'Unknown';
      }}
      getOptionLabel={(option) => option.name}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={handleSelect}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {option.name}
          {recentSearches.includes(option) && (
            <ClearIcon
              onClick={() => removeRecentSearch(option)}
              sx={{ cursor: 'pointer', marginLeft: 'auto' }}
            />
          )}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          InputLabelProps={{
            style: { top: '-3px' },
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
