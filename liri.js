require("dotenv").config();

var axios = require("axios");

var moment = require("moment");

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


if (process.argv[2] === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp").then(
  function(response) {
    for (let i = 0; i < response.data.length; i++) {

        console.log("Venue: " + response.data[i].venue.name + "\nCity: " + response.data[i].venue.city + "\nDate: " + response.data[i].datetime);

    }
   
  }
);

}