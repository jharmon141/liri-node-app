var keys = require("./keys.js");

var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessTokenKey = keys.twitterKeys.access_token_key;
var accessTokenSecret = keys.twitterKeys.access_token_secret;

var command = process.argv[2];
var songName = "";
var spotify = require('spotify');
var nodeArgs = process.argv;

if (command === "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(err, data) {
        var outPut  = data.split(",");
        for (var i = 1; i < outPut[1].length-2; i++) {
            if (outPut[1][i] === " ") {
                outPut[1][i] = "+";
            }
        }
        songName = outPut[1];
        spotify.search({ type: 'track', query: songName}, function(err, data) {
            
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
            console.log("Title: " + JSON.stringify(data.tracks.items[0].name));
            console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
            console.log("Listen: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify));
        });
    });
}

if (command === "movie-this") {
    var request = require("request");
    var movieName = "";
    var nodeArgs = process.argv;

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i === nodeArgs.length -1 && i > 3) {
            movieName = movieName + nodeArgs[i];
        } else {
            movieName = movieName + nodeArgs[i] + "+";
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
        }
    });
}

if (command === "spotify-this-song") {

    if (process.argv[3] !== undefined){

        for (var i = 3; i < nodeArgs.length; i++) {
            if (i === nodeArgs.length -1 && i > 3) {
                songName  = songName + nodeArgs[i];
            } else {
                songName  =  songName + nodeArgs[i] + "+";
            }
        }
        
        spotify.search({ type: 'track', query: songName}, function(err, data) {
            
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
            console.log("Title: " + JSON.stringify(data.tracks.items[0].name));
            console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
            console.log("Listen: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify));
        });

    } else {
        songName = "The Sign";
        spotify.search({ type: 'track', query: songName}, function(err, data) {
            
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("Artist: " + JSON.stringify(data.tracks.items[14].artists[0].name));
            console.log("Title: " + JSON.stringify(data.tracks.items[14].name));
            console.log("Album: " + JSON.stringify(data.tracks.items[14].album.name));
            console.log("Listen: " + JSON.stringify(data.tracks.items[14].artists[0].external_urls.spotify));
        });
    }
}

if (command === "my-tweets") {
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token_key: accessTokenKey,
        access_token_secret: accessTokenSecret 
    });

    var params = {screen_name: 'jharmon141'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++){
                console.log(tweets[i].text);
                console.log("Posted: " + tweets[i].created_at);
            }
        }
    });
}
