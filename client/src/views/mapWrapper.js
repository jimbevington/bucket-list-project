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

  let content = this.formatCountryData(country)

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  marker.addListener("click", function(){
    infoWindow.open(marker.map,marker);
  });
};

MapWrapper.prototype.formatCountryData = function (country) {
    const container = document.createElement('div');
    container.className = 'country-info';
    // name
    const name = document.createElement('p');
    name.className = 'countryName';
    name.innerText = country.name;
    // capital
    const capital = document.createElement('p');
    capital.innerText = `Capital: ${country.capital}`;
    // population
    const pop = document.createElement('p');
    pop.innerText = `Population: ${country.population}`;
    // flag
    const flag = document.createElement('img');
    flag.className = 'flag-img';
    flag.src = country.flag;

    [name, capital, pop, flag].forEach(element => container.appendChild(element));

    return container;
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
