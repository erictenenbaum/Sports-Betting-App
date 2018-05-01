var request = require("request");
var cheerio = require("cheerio");

module.exports = {
  basketballScrape: function() {
    console.log("Running Scrape");

    url = "http://www.donbest.com/nba/odds/";

    request(url, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);

        let gameDate = $(".odds_dateRow")
          .children()
          .first()
          .text();

        //  console.log(gameDate);

        let odds = [];
        $("tr.statistics_table_alternateRow").each(function(i, e) {
          let spreadOrOU1 = $(this)
            .find("td.bookColumn")
            .children()
            .first()
            .text();
          let spreadOrOU2 = $(this)
            .find("td.bookColumn")
            .children()
            .last()
            .text();
          let overUnder;
          let pointSpread;

          if (parseFloat(spreadOrOU1) > 1) {
            overUnder = spreadOrOU1;
            pointSpread = spreadOrOU2;
          } else {
            pointSpread = spreadOrOU1;
            overUnder = spreadOrOU2;
          }

          odds[i] = {
            gameDate: gameDate,
            awayTeam: $(this)
              .find(".oddsTeamWLink")
              .first()
              .text(),
            homeTeam: $(this)
              .find(".oddsTeamWLink")
              .last()
              .text(),
            pointSpread: pointSpread,
            overUnder: overUnder
          };
        });

        var evens = [];
        $("tr.statistics_table_row").each(function(i, e) {
          let spreadOrOU1 = $(this)
            .find("td.bookColumn")
            .children()
            .first()
            .text();
          let spreadOrOU2 = $(this)
            .find("td.bookColumn")
            .children()
            .last()
            .text();
          let overUnder;
          let pointSpread;

          if (parseFloat(spreadOrOU1) > 1) {
            overUnder = spreadOrOU1;
            pointSpread = spreadOrOU2;
          } else {
            pointSpread = spreadOrOU1;
            overUnder = spreadOrOU2;
          }

          evens[i] = {
            gameDate: gameDate,
            awayTeam: $(this)
              .find(".oddsTeamWLink")
              .first()
              .text(),
            homeTeam: $(this)
              .find(".oddsTeamWLink")
              .last()
              .text(),
            pointSpread: pointSpread,
            overUnder: overUnder
          };
        });

        var allGames = odds.concat(evens);

        console.log(allGames);
      }
    });
  },

  baseballScrape: function() {
    console.log("Running Scrape");

    url = "http://www.donbest.com/mlb/odds/";

    request(url, function(error, response, html) {
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);

        //  let gameDate = $(".odds_dateRow").children().first().text();

        // Displays date only:
        let gameDate = $(".odds_dateRow")
          .children()
          .first()
          .text()
          .split("-")[1];

        //  console.log(gameDate);

        let odds = [];
        $("tr.statistics_table_alternateRow").each(function(i, e) {
          let spreadOrOU1 = $(this)
            .find("td.bookColumn")
            .children()
            .first()
            .text();
          let spreadOrOU2 = $(this)
            .find("td.bookColumn")
            .children()
            .last()
            .text();
          let overUnder;
          let pointSpread;
          let favorite;

          let awayTeamPitcher = $(this)
            .find(".pitcherDiv")
            .children()
            .first()
            .text();
          let homeTeamPitcher = $(this)
            .find(".pitcherDiv")
            .children()
            .last()
            .text();

          odds[i] = {
            gameDate: gameDate,
            awayTeam: $(this)
              .find(".oddsTeamWLink")
              .first()
              .text(),
            awayTeamPitcher: awayTeamPitcher,
            homeTeam: $(this)
              .find(".oddsTeamWLink")
              .last()
              .text(),
            homeTeamPitcher: homeTeamPitcher
          };

          if (parseFloat(spreadOrOU1) > 1) {
            overUnder = spreadOrOU1;
            pointSpread = spreadOrOU2;

            odds[i].favorite = $(this)
              .find(".oddsTeamWLink")
              .last()
              .text();
            odds[i].overUnder = overUnder;
            odds[i].pointSpread = pointSpread;
          } else {
            pointSpread = spreadOrOU1;
            overUnder = spreadOrOU2;

            odds[i].favorite = $(this)
              .find(".oddsTeamWLink")
              .first()
              .text();
            odds[i].overUnder = overUnder;
            odds[i].pointSpread = pointSpread;
          }
        });

        let evens = [];
        $("tr.statistics_table_row").each(function(i, e) {
          let spreadOrOU1 = $(this)
            .find("td.bookColumn")
            .children()
            .first()
            .text();
          let spreadOrOU2 = $(this)
            .find("td.bookColumn")
            .children()
            .last()
            .text();
          let overUnder;
          let pointSpread;
          let favorite;

          let awayTeamPitcher = $(this)
            .find(".pitcherDiv")
            .children()
            .first()
            .text();
          let homeTeamPitcher = $(this)
            .find(".pitcherDiv")
            .children()
            .last()
            .text();

          evens[i] = {
            gameDate: gameDate,
            awayTeam: $(this)
              .find(".oddsTeamWLink")
              .first()
              .text(),
            awayTeamPitcher: awayTeamPitcher,
            homeTeam: $(this)
              .find(".oddsTeamWLink")
              .last()
              .text(),
            homeTeamPitcher: homeTeamPitcher
          };

          if (parseFloat(spreadOrOU1) > 1) {
            overUnder = spreadOrOU1;
            pointSpread = spreadOrOU2;

            evens[i].favorite = $(this)
              .find(".oddsTeamWLink")
              .last()
              .text();
            evens[i].overUnder = overUnder;
            evens[i].pointSpread = pointSpread;
          } else {
            pointSpread = spreadOrOU1;
            overUnder = spreadOrOU2;

            evens[i].favorite = $(this)
              .find(".oddsTeamWLink")
              .first()
              .text();
            evens[i].overUnder = overUnder;
            evens[i].pointSpread = pointSpread;
          }
        });

        var allGames = odds.concat(evens);

        console.log(allGames);
      }
    });
  }
};

// Original Function left intact:

// function basketballScrape(){
//     console.log("Running Scrape");

//     url = 'http://www.donbest.com/nba/odds/';

//     request(url, function(error, response, html) {
//         if (!error && response.statusCode == 200) {
//             let $ = cheerio.load(html);

//          let gameDate = $(".odds_dateRow").children().first().text();

//         //  console.log(gameDate);

//             let odds = [];
//           $("tr.statistics_table_alternateRow").each(function(i, e){
//             let spreadOrOU1 = $(this).find("td.bookColumn").children().first().text()
//             let spreadOrOU2 = $(this).find("td.bookColumn").children().last().text()
//             let overUnder;
//             let pointSpread;

//             if(parseFloat(spreadOrOU1) > 1) {
//               overUnder = spreadOrOU1;
//               pointSpread = spreadOrOU2;
//             }
//             else {
//               pointSpread = spreadOrOU1;
//               overUnder = spreadOrOU2;
//             }

//             odds[i] = {
//               gameDate: gameDate,
//               awayTeam: $(this).find(".oddsTeamWLink").first().text(),
//               homeTeam: $(this).find(".oddsTeamWLink").last().text(),
//               pointSpread: pointSpread,
//               overUnder: overUnder
//             }
//           });

//           var evens = [];
//           $("tr.statistics_table_row").each(function(i, e){
//             let spreadOrOU1 = $(this).find("td.bookColumn").children().first().text()
//             let spreadOrOU2 = $(this).find("td.bookColumn").children().last().text()
//             let overUnder;
//             let pointSpread;

//             if(parseFloat(spreadOrOU1) > 1) {
//               overUnder = spreadOrOU1;
//               pointSpread = spreadOrOU2;
//             }
//             else {
//               pointSpread = spreadOrOU1;
//               overUnder = spreadOrOU2;
//             }

//             evens[i] = {
//               gameDate: gameDate,
//               awayTeam: $(this).find(".oddsTeamWLink").first().text(),
//               homeTeam: $(this).find(".oddsTeamWLink").last().text(),
//               pointSpread: pointSpread,
//               overUnder: overUnder
//             }
//           });

//           var allGames = odds.concat(evens);

//           console.log(allGames);

//         }
//     });
//   }

// Original function left intact:

//   function baseballScrape(){
//     console.log("Running Scrape");

//     url = 'http://www.donbest.com/mlb/odds/';

//     request(url, function(error, response, html) {
//         if (!error && response.statusCode == 200) {
//             let $ = cheerio.load(html);

//         //  let gameDate = $(".odds_dateRow").children().first().text();

//         // Displays date only:
//         let gameDate = $(".odds_dateRow").children().first().text().split("-")[1];

//         //  console.log(gameDate);

//             let odds = [];
//           $("tr.statistics_table_alternateRow").each(function(i, e){
//             let spreadOrOU1 = $(this).find("td.bookColumn").children().first().text()
//             let spreadOrOU2 = $(this).find("td.bookColumn").children().last().text()
//             let overUnder;
//             let pointSpread;

//             if(parseFloat(spreadOrOU1) > 1) {
//               overUnder = spreadOrOU1;
//               pointSpread = spreadOrOU2;
//               odds[i] = {
//                 gameDate: gameDate,
//                 awayTeam: $(this).find(".oddsTeamWLink").first().text(),
//                 homeTeam: $(this).find(".oddsTeamWLink").last().text(),
//                 favorite: $(this).find(".oddsTeamWLink").last().text(),
//                 overUnder: overUnder,
//                 pointSpread: pointSpread
//               }
//             }
//             else {
//               pointSpread = spreadOrOU1;
//               overUnder = spreadOrOU2;
//               odds[i] = {
//                 gameDate: gameDate,
//                 awayTeam: $(this).find(".oddsTeamWLink").first().text(),
//                 homeTeam: $(this).find(".oddsTeamWLink").last().text(),
//                 favorite: $(this).find(".oddsTeamWLink").first().text(),
//                 pointSpread: pointSpread,
//                 overUnder: overUnder
//               }
//             }

//           });

//           var evens = [];
//           $("tr.statistics_table_row").each(function(i, e){
//             let spreadOrOU1 = $(this).find("td.bookColumn").children().first().text()
//             let spreadOrOU2 = $(this).find("td.bookColumn").children().last().text()
//             let overUnder;
//             let pointSpread;

//             if(parseFloat(spreadOrOU1) > 1) {
//               overUnder = spreadOrOU1;
//               pointSpread = spreadOrOU2;
//               evens[i] = {
//                 gameDate: gameDate,
//                 awayTeam: $(this).find(".oddsTeamWLink").first().text(),
//                 homeTeam: $(this).find(".oddsTeamWLink").last().text(),
//                 favorite: $(this).find(".oddsTeamWLink").last().text(),
//                 overUnder: overUnder,
//                 pointSpread: pointSpread
//               }
//             }
//             else {
//               pointSpread = spreadOrOU1;
//               overUnder = spreadOrOU2;
//               evens[i] = {
//                 gameDate: gameDate,
//                 awayTeam: $(this).find(".oddsTeamWLink").first().text(),
//                 homeTeam: $(this).find(".oddsTeamWLink").last().text(),
//                 favorite: $(this).find(".oddsTeamWLink").first().text(),
//                 pointSpread: pointSpread,
//                 overUnder: overUnder
//               }
//             }

//           });

//           var allGames = odds.concat(evens);

//           console.log(allGames);

//         }
//     });
//   }
