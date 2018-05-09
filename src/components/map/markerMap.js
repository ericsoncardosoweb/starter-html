var proto = (window.location.protocol === 'http:') ? 'http://' : 'https://';
var hostname = window.location.host;
var pathDirImage = '/assets/media/images/not-marker.png';
var mapNotMarker = proto + hostname + pathDirImage;

function setMarker(map, icon = mapNotMarker, position, popover, callback) {
  let popup = '';
  if (popover) {

    popup = new google.maps.InfoWindow({
      content: `<div class="map-popover">${popover}</div>`
    });


  }
  const locationInfowindow = popup || '';


  const marker = new google.maps.Marker({
    position: position,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: icon,
    draggable: false,
    infowindow: locationInfowindow
  });

  if (popover) {

    google.maps.event.addListener(marker, 'click', function () {
      this.infowindow.open(map, this);

      $('.map-popover').toggleClass('ocult');

      $('.map-popover').parent().parent().parent().siblings().addClass("map-popover-wrap");

      
      setTimeout(() => {
        $('.map-popover').on('click', function () {
          $(this).toggleClass('ocult');
        });
        
      }, 300);

      $('.map-popover').on('mouseout', function () {
        setTimeout(() => {
          $(this).addClass('ocult');
        }, 3000);
      });

      if (typeof callback === 'function') {
        callback.call()
      }
    });


  }

  marker.setMap(map);
 

}//setMarker


function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

var numDeltas = 100;
var delay = 10; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;

function transition(result) {
  i = 0;
  deltaLat = (result[0] - position[0]) / numDeltas;
  deltaLng = (result[1] - position[1]) / numDeltas; 
  moveMarker();
}

function moveMarker() {
  position[0] += deltaLat;
  position[1] += deltaLng;
  var latlng = new google.maps.LatLng(position[0], position[1]);
  marker.setTitle("Latitude:" + position[0] + " | Longitude:" + position[1]);
  marker.setPosition(latlng);
  if (i != numDeltas) {
    i++;
    setTimeout(moveMarker, delay);
  }
}