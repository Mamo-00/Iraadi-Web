import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Geocoder from 'react-map-gl-geocoder';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Box, IconButton } from '@mui/material';

const LocationInput = ({ onLocationChange }) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    loading: false,
    error: null,
  });

  const [viewport, setViewport] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  const mapRef = useRef();

  const geocodingClient = mbxGeocoding({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  });

  const getPlaceName = async (latitude, longitude) => {
    try {
      if (latitude === 0 && longitude === 0) {
        return "No address found for these coordinates";
      }
      const response = await geocodingClient
        .reverseGeocode({
          query: [longitude, latitude],
          limit: 1,
        })
        .send();
  
      if (response.body.features.length > 0) {
        const feature = response.body.features[0];
        const placenameItem = response.body.features[0].address;
        const context = feature.context;
  
        const countryItem = context.find(item => item.id.startsWith('country'));
        const placeItem = context.find(item => item.id.startsWith('place'));
        const postcodeItem = context.find(item => item.id.startsWith('postcode'));
        const neighborhoodItem = context.find(item => item.id.startsWith('neighborhood'));
        const localityItem = context.find(item => item.id.startsWith('locality'));
  
        const country = countryItem ? countryItem.text : '';
        const place = placeItem ? placeItem.text : '';
        const postcode = postcodeItem ? postcodeItem.text : (localityItem ? localityItem.text : '');
        const placename = placenameItem || (neighborhoodItem ? neighborhoodItem.text : '');
  
        const placeName = `${country}, ${place}, ${placename}, ${postcode}`;
        return placeName;
      } else {
        return "No address found for these coordinates";
      }
    } catch (error) {
      console.error(error);
      return "Error occurred while fetching place name";
    }
  };
  
  

  //this is for when you want to change it back to draggable marker
  /* const onMarkerDragEnd = async (event) => {
    const newLocation = {
      ...location,
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    };
  
    setLocation(newLocation);
  
    const placeName = await getPlaceName(newLocation.latitude, newLocation.longitude);
    onLocationChange({ ...newLocation, placeName });
  }; */

  const onViewportChange = async (newViewport) => {
    setViewport(newViewport);

    const newLocation = {
      latitude: newViewport.latitude,
      longitude: newViewport.longitude,
    };

    setLocation(newLocation);

    const placeName = await getPlaceName(newLocation.latitude, newLocation.longitude);
    onLocationChange({ ...newLocation, placeName });
  };


  const goToMarker = () => {
    setViewport({
      ...viewport,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  const fetchLocation = () => {
    setLocation((prevState) => ({ ...prevState, loading: true }));
  
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        loading: false,
        error: "Geolocation is not supported by your browser",
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
            error: null,
          };
      
          setLocation(newLocation);
          setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
      
          const placeName = await getPlaceName(newLocation.latitude, newLocation.longitude);
          onLocationChange({ ...newLocation, placeName });
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
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
  }, []);

  const handleGeocoderViewportChange = (newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return setViewport({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  };

  return (
    <>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onViewportChange={onViewportChange} // Use the new onViewportChange function here
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        ref={mapRef}
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
        >
          <LocationOnIcon fontSize='large' color='secondary'/>
        </Marker>
        <Box sx={{ position: "absolute", right: 40, top: 75}}>
          <NavigationControl />
        </Box>
        <Box sx={{ position: "absolute", right: 2, top: 170}}>
          <IconButton aria-label="delete" color='tertiery' onClick={goToMarker}>
            <MyLocationIcon fontSize='large'/>
          </IconButton>
        </Box>
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          position="top-left"
        />
      </ReactMapGL>
    </>
  );
};

export default LocationInput;