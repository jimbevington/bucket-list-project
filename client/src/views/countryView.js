const CountryView = function(){
  this.countries = [];
}

CountryView.prototype.addCountry = function (country) {
  this.countries.push(country);
  render(country);
};

module.exports = CountryView;
