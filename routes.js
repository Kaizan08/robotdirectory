const express = require('express');
const router = express.Router();
// const data = require('./models/data.js');
const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const dbUrl = "mongodb://localhost:27017/robotsofhell";

let DB;
let robots;

// connect to db
mongoClient.connect(dbUrl, function(err, db) {
  if (err) {
    console.warn("Error connecting to database", err);
  }

  DB = db;
  robots = db.collection("robots");
});

router.get('/', (req, res) => {
    robots.find({}).toArray(function (err,users) {
        if (err) {
            res.status(500).send(err);
        }
        res.render('index', {data:users});
    })
});

router.get('/users/:id', function(req, res){
    var user = req.params.id;
    robots.findOne({ _id: ObjectId(user) }, function(err, userid){
    if (err) {
        res.status(500).send(err);
    }
    res.render('users', {data: userid});
})
});

router.get('/unemployed', function(req, res){
    robots.find({"job":null}).toArray(function (err, unemployed){
        if (err) {
        res.status(500).send(err);
    }
    res.render('index', {data: unemployed});
    })
})

router.get('/employed', function(req, res){
    robots.find({"job":{$ne:null}}).toArray(function (err, employed){
        if (err) {
        res.status(500).send(err);
    }
    res.render('index', {data: employed});    
    })
})
module.exports = router;



