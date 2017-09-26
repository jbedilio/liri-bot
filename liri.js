var fs = require('fs');

var request = require('request');

var Twitter = require('twitter');

var keys = require('./twitkeys.js');

var SpotifyWebApi = require('spotify-web-api-node');

var key = require('./spotkeys.js');

var log = "";


if(process.argv.length < 3){
    console.log("*****Throw me a freakin bone*****\n" + 
    'Follow this pattern to get\n' + 
    ' my tweets:   node liri.js my-tweets\n' + 
    ' my music:    node liri.js spotify-this-song title\n' + 
    ' my movies:   node liri.js movie-this title\n' + 
    ' random.txt:  node liri.js do-what-it-says');
    return;

}else{
    /*for(let i = 2; i < process.argv.length; i++){

        ops += process.argv[i] + "-";
    }*/
    var ops = process.argv[2];

    console.log(ops);

    switch(ops){

        case 'tweets':

        case 'my-tweets':
        
        case 'my-tweets-':

        var client = new Twitter(keys);

        var params = { screen_name: 'joecitizn', count: 20};

        client.get('statuses/user_timeline', params, (error, tweets, response) => {

        if (error) {

            throw error;
        }
            if(response.statusCode == 200){

                for(let i = 0; i < tweets.length; i++){

                    process.argv[2] = tweets[i].text;

                    process.argv[3] = tweets[i].created_at;

                    console.log(process.argv[2] + " " + process.argv[3]);

                    log = process.argv[2] + " " + process.argv[3];

                    fs.appendFile('log.txt', log, (error) => {

                        if(error){

                            throw error;
                        }
                    });
                }
            }
        });

        break;

        case 'spotify':
        
        case 'spotify-this-song':

        case 'spotify-this-song-':

        var title = "";

        if (process.argv.length < 4) {

            title = 'the sign, ace of base';

        }

        for(let i = 3; i < process.argv.length; i++){

            title += process.argv[i] + " ";
        }

        console.log(title);

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
                spotifyApi.searchTracks('track:' + title, { limit: 1})
                    
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

        case 'movie-this-':

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

        if(process.argv.length < 4){

            text = 'spotify-this-song' +  " " + "I Want it That Way"; 
        };

        fs.writeFile('random.txt', text, (error) => {

                if (error){

                    throw error;
                }

                console.log(text);

            });
        
        fs.appendFile('log.txt', text, (error) => {

            if (error) {

                throw error;
            }

            console.log(log);
        })

        break;

    };
};





/*var log = "";

;*/