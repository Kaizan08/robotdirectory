const express = require('express');
const app = express();
const port = 3000;
const adminRouter = require('./routes.js');
const mustacheExpress = require('mustache-express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const dbUrl = "mongodb://localhost:27017/robotsofhell";



app.use(express.static(__dirname + '/public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/', adminRouter);
app.use('/users', adminRouter);


app.listen(port, function(){
    console.log("Server is running on PORT", port);
});


