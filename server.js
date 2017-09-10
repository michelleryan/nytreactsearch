// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//include my Headline.js and Comment.js
var Article = require("./models/article");


//Leverage built in JS ES6 Promises
mongoose.Promise = Promise;

var PORT = 4000;

// Initialize Express
var app = express();


// Set up a static folder (public) for our web app
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: false
  }));

//Database configuration with mongoose when deployed
// mongoose.connect("mongodb://heroku_fpl41ksr:pqc91djlcafhpjj9m4rr5g34ih@ds121674.mlab.com:21674/heroku_fpl41ksr",
// {
//   useMongoClient: true
// });

//Database configuration with mongoose local
mongoose.connect("mongodb://localhost/nytreact");
const db = mongoose.connection;

//Show any mongoose errors
db.on("error", function(error){
  console.log("Mongoose Error: ", error);
});

//Log success message once logged into mongoose
db.once("open", function(){
  console.log("Mongoose connection successful.");
});



// Routes

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// app.get("/articles", function(req, res){
//     console.log("I am getting the articles");
//    // var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
//     var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=dogs";
//     $.ajax({
//         method:"GET",
//         url:queryURL
//     }).done(function(response){
//         console.log(response);
//     });

// /api/saved (get) - your components will use this to query MongoDB for all saved articles
// /api/saved (post) - your components will use this to save an article to the database
// /api/saved (delete) - your components will use this to delete a saved article in the database
// * (get) - will load your single HTML page (with ReactJS) in public/index.html. Make sure you put this after all other GET routes
app.get("/api/all", function(req, res){
    //query for all saved articles
    console.log("I am in the get all route in server.js");
    Article.find({}, function(error, doc){
        if (error){
            console.log("error in get all articles", error);

        }
        else{
            console.log(doc);
            res.json(doc);
        }
    });
});





// Set the app to listen on port 4000
app.listen(PORT, function() {
  console.log("App running on port: " + PORT);
});
