'use strict'
function createMap(map, id = 'map', mapOptions) {
  const mapOptionsDefault = {
    center: new google.maps.LatLng(15.7942287, -47.8821658),
    zoom: 8
  }
  map = new google.maps.Map(document.getElementById(id), mapOptions || mapOptionsDefault);
}
 