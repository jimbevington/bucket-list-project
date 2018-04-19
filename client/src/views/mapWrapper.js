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

  let contentString = "<div id=\"info-content\">" +
    "<h1>" + country.name + "</h1>" +
    "<p> Capital: " + country.capital + "</p>" +
    "<p> Population: " + country.population + "</p>" +
    "<img src=\"" + country.flag + "\">";
  let infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener("click", function(){
    infoWindow.open(marker.map,marker);
  });
};

MapWrapper.prototype.clearMarkers = function(){
  this.markers.forEach(marker => marker.setMap(null));
  this.markers = [];
}

MapWrapper.prototype.removeMarker = function (countryID) {
  this.markers.forEach(marker => {
    if (marker.id === countryID){
      marker.setMap(null);
    }
  })
  this.markers = this.markers.filter(marker => marker.id !== countryID);
};


module.exports = MapWrapper;
