// importing modules
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var db = require('./models');

// make a request to the Visit Seattle and scrape neighorhood names and links
request('http://www.visitseattle.org/things-to-do/neighborhoods/', function (error, response, data) {
  var $ = cheerio.load(data);

  // scrape neighborhood names and links, and store as an array of objects
  var neighborhoods = $('.info-window-content').map(function(index, element) {
    return {
      name: $(element).find('h4').text(),
      link: $(element).find('a').attr('href')
    };
  }).get();

  // pass the neighborhood data to fetchDescriptions
  fetchDescriptions(neighborhoods);
});

// this function takes neighborhood data and requests descriptions from each link
function fetchDescriptions(neighborhoodData) {
  // using async.parallel to retrieve data from all neighborhoods at once
  async.concat(neighborhoodData, getNeighborhoodDescription, function(err, results) {
    // here are the neighborhoods with descrptions. Let's print them out
    results.forEach(function(result) {
      db.area.create({
        name: result.name,
        description: result.description
      });
      console.log(result.name);
      console.log(result.description);
      console.log('----------------');
    });
  });
}

// this function runs for each neighborhood link. We'll go and scrape a descrption
function getNeighborhoodDescription(neighborhood, cb) {
  request(neighborhood.link, function(error, response, data) {
    var $ = cheerio.load(data);
    // get the first paragraph (the description) and store in the neighborhood object
    neighborhood.description = $('p').first().text();
    // return the appended neighborhood object to the async.concat call
    cb(null, neighborhood);
  });
}