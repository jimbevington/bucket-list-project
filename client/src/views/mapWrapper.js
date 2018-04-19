const MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: "satellite"
  });
  this.markers = [];
};

MapWrapper.prototype.addMarker = function(latlong){
  let coords = {lat: latlong[0], lng: latlong[1]}
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  this.markers.push(marker);
  let contentString = "stuff";
  let infoWindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener("click", function(){
    infoWindow.open(marker.map,marker);
  });
};



module.exports = MapWrapper;
