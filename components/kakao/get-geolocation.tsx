interface Latlng {
  lat: number;
  lng: number;
}

const GetGeolocation = (setPosition: (position: Latlng) => void) => {
  navigator.geolocation.getCurrentPosition((position) => {
    setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
  });

  return null;
};

export default GetGeolocation;
