const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("client/build"));

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }
  const db = client.db("bucket_list");
  console.log("connect to db");



  app.listen(3000, function(){
    console.log("listening on port 3000");
  });

});
