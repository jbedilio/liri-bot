var fs = require('fs');

var request = require('request');

var Twitter = require('twitter');

var keys = require('./twitkeys.js');

var SpotifyWebApi = require('spotify-web-api-node');

var key = require('./spotkeys.js');

var log = "";

//setting user instructions
if(process.argv.length < 3){
    console.log("*****Throw me a freakin bone*****\n" + 
    'Follow this pattern to get\n' + 
    ' my tweets:   node liri.js my-tweets\n' + 
    ' my music:    node liri.js spotify-this-song title\n' + 
    ' my movies:   node liri.js movie-this title\n' + 
    ' random.txt:  node liri.js do-what-it-says');
    return;

}else{
    //setting the cmd var to grab process.argv[2]
    var cmd = process.argv[2];

    console.log(cmd);
//setting the switch to operate based on the cmd set by process.argv[2]
    switch(cmd){
        //setting different cases
        case 'my':

        case 'tweets':
        
        case 'my-tweets':
        //establishing the Twitter bot with user credentials 
        var client = new Twitter(keys);
        //setting parameters for the twitter api call
        var params = { screen_name: 'joecitizn', count: 20};
        //making the api call with a specified end point
        client.get('statuses/user_timeline', params, (error, tweets, response) => {
        //handeling the error, if there is one
        if (error) {

            throw error;
        }
            //handeling the response if no error
            if(response.statusCode == 200){
                //looping through the data
                for(let i = 0; i < tweets.length; i++){
                    //placing the data in the argument variable
                    process.argv[2] = tweets[i].text;
                    
                    process.argv[3] = tweets[i].created_at;

                    console.log(process.argv[2] + " " + process.argv[3]);
                    //setting the log var to the resulting data
                    log = process.argv[2] + " " + process.argv[3];
                    //logging the data onto log.txt
                    fs.appendFile('log.txt', log, (error) => {
                        //handeling errors
                        if(error){

                            throw error;
                        }
                    });
                }
            }
        });
        
        break;
        //setting cases for user input in var cmd
        case 'spotify':
        
        case 'spotify-this':

        case 'spotify-this-song':
        //setting the var song to hold the song
        var song = "";
        //setting a default song in the event the user doesn't enter one
        if (process.argv.length < 4) {

            song = 'the sign, ace of base';

        }
        //looping the terms entered following the cmd var to concatenate the remaining terms intp one song
        for(let i = 3; i < process.argv.length; i++){

            song += process.argv[i] + " ";
        }

        console.log(song);

        // credentials are optional
        var spotifyApi = new SpotifyWebApi(key);        

        // Retrieve an access token.
        spotifyApi.clientCredentialsGrant()
        
            .then((data)=> {

                //console.log('The access token expires in ' + data.body['expires_in']);

                //console.log('The access token is ' + data.body['access_token']);

                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);

                // Search tracks whose name, album or artist contains song
                spotifyApi.searchTracks('track:' + song, { limit: 1})
                    
                    .then((data) => {

                        var music = data.body.tracks.items[0];

                        console.log('Artist: ' + music.artists[0].name);

                        console.log('Album: ' + music.album.name);

                        console.log('Title: ' + music.name);
                        
                        console.log('Preview: ' + music.preview_url);

                        log = ['Artist: ' + music.artists[0].name + '\n',

                            'Album: ' + music.album.name + '\n',

                            'Title: ' + music.name + '\n',

                            'Preview: ' + music.preview_url];

                        fs.appendFile('log.txt', log, (error) => {

                            if (error) {

                                throw error;
                            }
                        });

                        }),(err) => {

                        console.error('Something went wrong with the search', err);
                    };
                });
        break;
        
        case 'movie':
        
        case 'movie-this':

        var film = "";

        if (process.argv.length < 4) {

            film = 'Mr. Nobody';

        }

        for(let i = 3; i < process.argv.length; i++){

            film += process.argv[i] + " ";
        }

        request("http://www.omdbapi.com/?t=" + film + "&y=&plot=short&apikey=40e9cece", (error, response, body) => {

            if(error){

                console.log('error:', error); // Print the error if one occurred
            };

            if(response.statusCode == 200){

                var jp = JSON.parse(body);

                console.log(jp.Title + "(" + jp.Year + ")" + " " + jp.Country + " " + jp.Language);

                console.log(jp.Actors)

                console.log("IMDB rating of " + jp.imdbRating + " & Rotten Tomatoes rating of " + jp.Ratings[1].Value);

                console.log(jp.Plot);

                log = [jp.Title + "(" + jp.Year + ")" + " " + jp.Country + " " + jp.Language + '\n',

                    jp.Actors + '\n',

                    "IMDB rating of " + jp.imdbRating + " & Rotten Tomatoes rating of " + jp.Ratings[1].Value + '\n',

                    jp.Plot];

                fs.appendFile('log.txt', log, (error) => {

                    if (error) {
                        throw error;
                    }
                });

                }
            });
        break;

        case 'do':

        case 'do-what':

        case 'do-what-it':

        case 'do-what-it-says':

        var text = "";

        if(process.argv.length < 3){

            text = 'spotify-this-song' +  " " + "I Want it That Way"; 
        };

        fs.readFile('random.txt', 'utf8', (error, data) => {

            if (error){

                throw error;
            }

            var dataArr = data.split(',');

            var song = dataArr[1];

            console.log(dataArr[1]);

            spotifyApi = new SpotifyWebApi(key);

            spotifyApi.clientCredentialsGrant()

                .then((data) => {

                    spotifyApi.setAccessToken(data.body['access_token']);

                    spotifyApi.searchTracks('track:' + song, { limit: 1 })

                    .then((data) => {

                        var music = data.body.tracks.items[0];

                        console.log('Artist: ' + music.artists[0].name);

                        console.log('Album: ' + music.album.name);

                        console.log('Title: ' + music.name);

                        console.log('Preview: ' + music.preview_url);

                        log = ['Artist: ' + music.artists[0].name + '\n',

                               'Album: ' + music.album.name + '\n',

                               'Title: ' + music.name + '\n',

                               'Preview: ' + music.preview_url];

                    fs.appendFile('log.txt', log, (error) => {

                        if (error) {

                            throw error;
                        }
                    }); (err) => {

                        console.error('Something went wrong with the search', err);
                        };
                    });
                });
            });
        break;
    };
};