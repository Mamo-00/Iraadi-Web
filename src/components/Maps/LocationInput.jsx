import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LocationInput = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
  });

  const [watchId, setWatchId] = useState(null);

  const fetchLocation = () => {
    setLocation((prevState) => ({ ...prevState, loading: true }));

    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        loading: false,
        error: 'Geolocation is not supported by your browser',
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
            error: null,
          });
        },
        (error) => {
          let errorMessage;
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            case error.UNKNOWN_ERROR:
              errorMessage = "An unknown error occurred.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
          }
          setLocation({
            latitude: null,
            longitude: null,
            loading: false,
            error: errorMessage,
          });
        }
      );
    }
  };

  useEffect(() => {
    fetchLocation();
    // Watch for location changes
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null,
        });
      });
      setWatchId(id);
    }
    // Clean up the watcher on unmount
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <Box>
      {location.loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : location.error ? (
        <Box>
          <Typography variant="body1" color="error">
            Error: {location.error}
          </Typography>
          <Button variant="contained" onClick={fetchLocation}>
            Retry
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="body1">
            Latitude: {location.latitude}
          </Typography>
          <Typography variant="body1">
            Longitude: {location.longitude}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LocationInput;