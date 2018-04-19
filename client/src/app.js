const Request = require('./services/request.js');
const CountryView = require('./views/countryView.js');
const MapWrapper = require('./views/mapWrapper.js');

const allCountriesRequest = new Request("https://restcountries.eu/rest/v2/all")
const dbrequest = new Request("/api/countries");

var map;
var countryView = new CountryView();


const getCountryDetails = function(country){
  const countryDetails = {
    name: country.name,
    population: country.population,
    capital: country.capital,
    flag: country.flag,
    latlng: country.latlng
  };

  return countryDetails;
}

const populateCountriesList = function(allCountries){

  const countrySelector = document.getElementById('select-country');
  countrySelector.innerHTML = "";

// POPULATED THE LIST
  for (let country of allCountries){
    const option = document.createElement('option');
    const countryDetails = getCountryDetails(country);
    option.value = JSON.stringify(countryDetails);      // value is JSON object
    option.innerText = country.name;
    countrySelector.appendChild(option);
  }

}

const populateBucketList = function(countries){
  countries.forEach(country => {
    map.addMarker(country);
    countryView.addCountry(country);
  });
}


const saveCountry = function(){
  const countrySelector = document.getElementById('select-country');
  const selectedCountryJSON = countrySelector.value;
  const selectedCountryObj = JSON.parse(selectedCountryJSON);

  removeCountryFromSelect(selectedCountryJSON);

  dbrequest.post(saveRequestComplete, selectedCountryObj);
}

const removeCountryFromSelect = function(countryJSON, selectedCountryObj){
  const countrySelector = document.getElementById('select-country');
  newOptions = [];
  for (let option of countrySelector){
    if (option.value !== countryJSON){
      const newOption = document.createElement('option');
      newOption.value = option.value;
      newOption.innerText = option.innerText;
      newOptions.push(newOption);
    }
  }
  countrySelector.innerHTML = "";
  newOptions.forEach(option => countrySelector.appendChild(option));
}

const saveRequestComplete = function(countryToSave){
  countryView.addCountry(countryToSave);
  map.addMarker(countryToSave);
}

const clearBucketList = function(){
  dbrequest.delete(countryView.clearList());
  map.clearMarkers();
  allCountriesRequest.get(populateCountriesList);
}


const initialiseMap = function(){
  const container = document.getElementById("big-map");
  const center = {lat:0, lng:0};
  const zoom = 2;
  map = new MapWrapper(container, center, zoom);
  countryView.map = map;
};


const app = function(){
  initialiseMap();
  allCountriesRequest.get(populateCountriesList);
  dbrequest.get(populateBucketList)


  const selectCountryButton = document.getElementById('select-country-button');
  selectCountryButton.addEventListener('click', function(event){
    event.preventDefault();
    saveCountry();
  });

  const selectClearButton = document.getElementById('clear-list');
  selectClearButton.addEventListener('click', clearBucketList)

};



document.addEventListener('DOMContentLoaded', app);
