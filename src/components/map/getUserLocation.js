function getUserLocation(msg){
  let UserLocation = localStorage.getItem('UserLocation');


  if (UserLocation != undefined && UserLocation != null) {
    globalStartMapLocation = JSON.parse(UserLocation);
  } else {
    if (window.navigator && window.navigator.geolocation) {
      const geolocation = window.navigator.geolocation;
      geolocation.getCurrentPosition(successGetUserLocation, errorGetUserLocation);
    } else {
      alert(msg || 'Geolocalização não suportada em seu navegador.');
    };

  }

  
  
}

function successGetUserLocation(position) {
  // console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const locationPosition = {
    lat: latitude,
    lng: longitude
  };
  
  // console.log("Localização do usuário",globalStartMapLocation);

  // Salvar em local storage a localização do usuário
  globalStartMapLocation = locationPosition;

  const objectLocationPosition = { lat: locationPosition.lat, lng: locationPosition.lng };
  localStorage.setItem('UserLocation', JSON.stringify(objectLocationPosition));

  if (globalStartMapLocation) {
    searchStoresMap();
  }
  
};

function errorGetUserLocation(error) {
  console.log(error)
};
