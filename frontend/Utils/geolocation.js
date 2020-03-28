import Geocode from 'react-geocode';

/**
 * getBrowserLocation - get's the user's location from the browser navigator API
 * @returns {Object} geoLocation object {lat, lng}, geoLocation.error will be truthy if an error occurred
 */
export const getBrowserLocation = () => {
  if (!navigator.geolocation) {
    return { error: 'User has denied access to the location in their browser' };
  } else {
    return navigator.geolocation.getCurrentPosition(
      position => {
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      },
      error => { return { error }; }
    );
  }
};

/**
 * getGeolocationFromAddress - uses the react-geocode npm package to get a geoLocation object from an address string
 * @param {string} address
 * @returns {Object} geoLocation object {lat, lng}, geoLocation.error will be truthy if an error occurred
 */
export const getGeolocationFromAddress = (address) => {
  return Geocode.fromAddress(address)
  .then(
    response => {
      if (response && response.results && response.results.length > 0) {
        return response.results[0].geometry.location;
      }
    },
    error => { return { error }; }
  );
};

