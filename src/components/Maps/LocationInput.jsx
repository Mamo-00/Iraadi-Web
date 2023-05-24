import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Geocoder from 'react-map-gl-geocoder';

import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationInput = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
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

  const onMarkerDragEnd = (event) => {
    setLocation({
      ...location,
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
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
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
            error: null,
          });
          setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
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
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        ref={mapRef}
      >
        <Marker
          latitude={location.latitude}
          longitude={location.longitude}
          draggable
          onDragEnd={onMarkerDragEnd}
        >
          <LocationOnIcon color='secondary'/>
        </Marker>
        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <NavigationControl />
        </div>
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