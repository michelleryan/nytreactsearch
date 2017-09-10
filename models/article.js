//indlue Mongoose dependency
var mongoose = require("mongoose");

//create schema
var Schema = mongoose.Schema;

//create the article schema
var ArticleSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    url: {
        type: String,
        require: true
    }
});

//create the article model with the Article Schema
var Article=mongoose.model("article", ArticleSchema);

//export the model
module.exports = Article;
