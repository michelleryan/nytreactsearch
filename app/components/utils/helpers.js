// Here we will utilize the axios library to perform GET/POST requests
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(search) {

    console.log("I am searching for : ", search);

    // Figure out the geolocation
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=" + search;
    console.log(queryURL);
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.response.docs[0]) {
        console.log(response.data.response.docs);
        return response.data.response.docs[0].web_url;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  }

  // This function hits our own server to retrieve the record of query results
//   getHistory: function() {
//     return axios.get("/api");
//   }
};

// We export the API helper
module.exports = helper;