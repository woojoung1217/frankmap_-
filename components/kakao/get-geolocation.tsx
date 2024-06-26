const GetGeolocation = (setter) => {
  return navigator.geolocation.getCurrentPosition((position) => {
    setter({ lat: position.coords.latitude, lng: position.coords.longitude });
  });
};

export default GetGeolocation;
