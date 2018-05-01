const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
const scraper = require("./controller/scrapeController.js");


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
// app.use(routes);



// If I use Mongoose:
// Set up promises with mongoose
// mongoose.Promise = global.Promise;
// // Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/sports-betting-app",
//   {
//     useMongoClient: true
//   }
// );

app.get('/', function(req, res) {
    console.log("scrape was here");
    scraper.baseballScrape();
});

  
  

    




// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
