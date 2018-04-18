const Request = require('./services/request.js');

const allCountriesRequest = new Request("https://restcountries.eu/rest/v2/all")

const getAllCountries = function(){
  allCountriesRequest.get(populateCountriesList);
}

const getCountryDetails = function(country){
  const countryDetails = {
    name: country.name,
    population: country.population,
    capital: country.capital,
    flag: country.flag
  }
}

const populateCountriesList = function(allCountries){

  const countrySelector = document.getElementById('select-country');

// POPULATED THE LIST
  for (let country of allCountries){
    const option = document.createElement('option');
    option.value = getCountryDetails(country);
    option.innerText = country.name;
    countrySelector.appendChild(option);
  }

}

const saveCountry = function(){
  const countrySelector = document.getElementById('select-country');
  const selectedCountry = countrySelector.value;

  // save
  // display
}


const app = function(){

  getAllCountries();
  const selectCountryButton = document.getElementById('select-country-button');
  selectCountryButton.addEventListener('click', saveCountry);

}



document.addEventListener('DOMContentLoaded', app);
