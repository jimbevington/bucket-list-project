const Request = require('./services/request.js');

const allCountriesRequest = new Request("https://restcountries.eu/rest/v2/all")

const getAllCountries = function(){
  allCountriesRequest.get(populateCountriesList);
}

const populateCountriesList = function(allCountries){
  
}

const app = function(){

  // populate dropdown
  getAllCountries();
  // make Request model, version for Countries api
  // build

}



document.addEventListener('DOMContentLoaded', app);
