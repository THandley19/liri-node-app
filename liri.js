require("dotenv").config();

var axios = require("axios");

var moment = require("moment");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

// I would format and standardized the user input
var userinput1 = process.argv[2];
var userinput2 = process.argv[3];

switch (userinput1) {
  case ("concert-this"):
    concertThis();
    break;
  case ("spotify-this-song"):
    spotifyThis();
    break;
  // Always indent your code for easy readability 
  case ("movie-this"):
    movieThis();
    break;
  default:
    console.log("Please enter something else.")
};


function concertThis() {
  // APi Keys should never be expose like this when you can hide them in an .env file
  axios.get("https://rest.bandsintown.com/artists/" + userinput2 + "/events?app_id=codingbootcamp").then(
    function (response) {
      for (let i = 0; i < response.data.length; i++) {
        var convDate = moment(response.data[0].datetime).format('MM/DD/YYYY')
        console.log("Venue: " + response.data[i].venue.name + "\nCity: " + response.data[i].venue.city);
        console.log("Date: " + convDate)


        console.log("===============================")

      }

    }
  );
}

function spotifyThis() {
  spotify.search({type: 'track', query: userinput2, limit: 10}, function(error, data) {
      if (error) {
        console.log("Something went wrong.")
        console.log(error)
      } else {
        for (let i = 0; i < data.tracks.items.length; i++) {
          console.log(
          "Artist: " + data.tracks.items[i].artists[0].name + 
          "\nSong: " + data.tracks.items[i].name +
          "\nPreview URL: " + data.tracks.items[i].preview_url +
          "\nAlbum: " + data.tracks.items[i].album.name)

          console.log("===============================")
          
        }
      }
  })
}

function movieThis() {
  // APi Keys should never be expose like this when you can hide them in an .env file
  axios.get("http://www.omdbapi.com/?apikey=trilogy&" + "t=" + userinput2).then(
    function (response) {
      console.log("==================")
      console.log("Title: " + response.data.Title +
      "\nYear Released: " + response.data.Year + 
      "\nIMDB Rating: " + response.data.imdbRating +
      "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
      "\nCountry of Production: " + response.data.Country + 
      "\nLanguage: " + response.data.Language + 
      "\nPlot: " + response.data.Plot + 
      "\nActors: " + response.data.Actors)
      console.log("==================")

    }
  );
 if (userinput2 === "Mr.Nobody") {
  console.log("==================")
  console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
  console.log("It's on Netflix!");
 }
}
