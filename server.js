const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


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

    url = 'http://www.donbest.com/nba/odds/';

    request(url, function(error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);         

         let gameDate = $(".odds_dateRow").children().first().text();

        //  console.log(gameDate);

            let odds = [];
          $("tr.statistics_table_alternateRow").each(function(i, e){
            let spreadOrOU1 = $(this).find("td.bookColumn").children().first().text()
            let spreadOrOU2 = $(this).find("td.bookColumn").children().last().text()
            let overUnder;
            let pointSpread;            

            if(parseFloat(spreadOrOU1) > 1) {              
              overUnder = spreadOrOU1;
              pointSpread = spreadOrOU2;
            } 
            else {             
              pointSpread = spreadOrOU1;
              overUnder = spreadOrOU2;
            }         

            odds[i] = {
              gameDate: gameDate,
              awayTeam: $(this).find(".oddsTeamWLink").first().text(),
              homeTeam: $(this).find(".oddsTeamWLink").last().text(),
              pointSpread: pointSpread,
              overUnder: overUnder
            }
          });          

          var evens = [];
          $("tr.statistics_table_row").each(function(i, e){
            let spreadOrOU1 = $(this).find("td.bookColumn").children().first().text()
            let spreadOrOU2 = $(this).find("td.bookColumn").children().last().text()
            let overUnder;
            let pointSpread;            

            if(parseFloat(spreadOrOU1) > 1) {              
              overUnder = spreadOrOU1;
              pointSpread = spreadOrOU2;
            } 
            else {             
              pointSpread = spreadOrOU1;
              overUnder = spreadOrOU2;
            }         

            evens[i] = {
              gameDate: gameDate,
              awayTeam: $(this).find(".oddsTeamWLink").first().text(),
              homeTeam: $(this).find(".oddsTeamWLink").last().text(),
              pointSpread: pointSpread,
              overUnder: overUnder
            }
          });          

          var allGames = odds.concat(evens);

          console.log(allGames);

        }
    });
});



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
