const Request = function(url){
  this.url = url;
}

Request.prototype.get = function (callback) {
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
};

module.exports = Request;
