const MapWrapper = function(container, coords, zoom){
  console.log(coords, zoom);
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: "satellite"
  });
};

module.exports = MapWrapper;
