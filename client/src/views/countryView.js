const Request = require('../services/request.js');
const request = new Request('/api/countries');

const CountryView = function(){
  this.countries = [];
  this.map = null;
}

CountryView.prototype.addCountry = function (country) {
  this.countries.push(country);
  this.render(country);
};

CountryView.prototype.render = function (country) {
  const bucketList = document.getElementById('bucket-list');

  const li = this.formatCountryData(country);

  const removeButton = this.createButtonForm(country);

  [li, removeButton].forEach(element => bucketList.appendChild(element));

//  add event Listener to REMOVE BUTTON
  removeButton.addEventListener('submit', function(event){
    event.preventDefault();

    // get the Country ID, add to URL
    const countryID = event.target[0].value;
    const countryURL = request.url + "/" + countryID;

    // make a Delete Request with the country ID
    const countryRequest = new Request(countryURL);
    countryRequest.delete(function(){
      this.removeCountryFromList(countryID);
    }.bind(this));
  }.bind(this));
};

CountryView.prototype.removeCountryFromList = function(countryID){
  this.countries = this.countries.filter(country => country._id != countryID);

  this.map.removeMarker(countryID);

  const bucketList = document.getElementById('bucket-list');
  bucketList.innerHTML = "";

  this.countries.forEach(country => this.render(country));
};

CountryView.prototype.createButtonForm = function (country) {
  const form = document.createElement('form');
  // need a hidden field with object id
  const countryID = document.createElement('input');
  countryID.id = "country_id"
  countryID.value = country._id;
  countryID.type = 'hidden';
  // need submit button
  // need an event listener here
  const clearButton = document.createElement('input')
  clearButton.type = 'submit';
  clearButton.className = 'removeButton';
  clearButton.value = 'Remove';

  [countryID, clearButton].forEach(element => form.appendChild(element));

  return form;
};

CountryView.prototype.formatCountryData = function (country) {
    const li = document.createElement('li');
    country.className = 'country-list-item';
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

    [name, capital, pop, flag].forEach(element => li.appendChild(element));

    return li;
};

CountryView.prototype.clearList = function () {
  this.countries = [];
  const bucketList = document.getElementById('bucket-list');
  bucketList.innerHTML = "";
};

module.exports = CountryView;
