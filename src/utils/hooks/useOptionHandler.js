import { useState } from 'react';

export const useOptionHandler = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleOptionChange = (value) => {
    setState((prevState) => {
      return prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value];
    });
  };

  return [state, setState, handleOptionChange ];
};
