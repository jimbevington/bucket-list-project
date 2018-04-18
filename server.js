const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("client/build"));

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }
  const db = client.db("bucket_list");
  console.log("connect to db");

  app.post("/api/countries", function(req, res){
    const countriesCollection = db.collection("countries");
    const countryToSave = req.body;
    countriesCollection.save(countryToSave, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      console.log("Something was saved successfully to DB");
      res.status(201);
      res.json(countryToSave);
    });
  });

  app.get("/api/countries", function(req, res){
    const countriesCollection = db.collection("countries");
    countriesCollection.find().toArray(function(err, allCountries){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(allCountries);
    });
  });

  app.delete("/api/countries", function(req, res){
    const countriesCollection = db.collection("countries");
    const filterObject = {};
    countriesCollection.deleteMany(filterObject, function(err, allCountries){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });

  app.put("/api/countries/:id", function(req, res){
    const countriesCollection = db.collection("countries");
    const objectId = ObjectID(req.params.id);
    const filterObject = { _id: objectId };
    const updatedData = req.body;
    countriesCollection.update(filterObject, updatedData, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });

  app.listen(3000, function(){
    console.log("listening on port 3000");
  });

});
