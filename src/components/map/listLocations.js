function listLocations(map, positions, zoom = 13, mapMarker = mapNotMarker, popover, callback) {
  
  if (typeof positions === "string") {
    positions = JSON.parse(positions);
  }
  
  positions.map(item => {

    // console.log(item);
        
    const newPosition = new google.maps.LatLng(item.Latitude, item.Longitude);

    if(popover === 'stores') {
      popover = `<div data-code="${item.Initial}">${item.Reference || item.Name}</div>`;
    }

    setMarker(map, mapMarker, newPosition, popover, callback);

  });

  map.setZoom(zoom);

  
}