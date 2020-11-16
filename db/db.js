
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const connectingURL = "mongodb+srv://petrus766hi:p@ssw0rd@lomba30.comj5.mongodb.net/Lomba30?retryWrites=true&w=majority";

module.exports = function () {
    mongoose.connect (
      connectingURL,
      {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true},
      (error, client) => {
        if (error) {
          return console.log ('DB TIDAK CONNECT');
        }
        console.log ('DB CONNECT');
      }
    );
};