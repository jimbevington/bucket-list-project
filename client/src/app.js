const Request = require('./services/request.js');

const allCountriesRequest = new Request("https://restcountries.eu/rest/v2/all")

const getAllCountries = function(){
  allCountriesRequest.get(populateCountriesList);
}

const populateCountriesList = function(allCountries){
  const countrySelector = document.getElementById('select-country');
  allCountries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.alpha3code;
    option.innerText = country.name;
    countrySelector.appendChild(option);
  })
}

const app = function(){

  getAllCountries();

}



document.addEventListener('DOMContentLoaded', app);
