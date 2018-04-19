const MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: "satellite"
  });
  this.markers = [];
};

MapWrapper.prototype.addMarker = function(country){
  let coords = {lat: country.latlng[0], lng: country.latlng[1]}
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  marker.setValues({id: country._id});  // give the country an id
  this.markers.push(marker);
};

module.exports = MapWrapper;
