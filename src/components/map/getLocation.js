// Template directory URI
function getLocation(map, position, zoom = 13, mapMarker = 0, popover) {
  position = position.split(', ');
  const newPosition = new google.maps.LatLng(position[0], position[1]);

  if(mapMarker != 0) {
    setMarker(map, mapMarker, newPosition, popover);
  }

  map.setZoom(zoom);

  map.panTo(newPosition);
}