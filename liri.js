if(process.argv.length == 2){
    console.log("*****Throw me a freakin bone*****\n" + 
    'Follow this pattern to get\n' + 
    ' my tweets: enter - node liri.js my-tweets\n' + 
    ' my music: enter - node liri.js spotify-this-song "<title>"\n' + 
    ' my movies: enter - node liri.js movie-this "<title>"\n' + 
    ' random.txt: enter - node liri.js do-what-it-says');
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

        var Twitter = require('twitter');           

        var keys = require('./twitkeys.js');

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
                }
            }
        });
        break;

        case 'spotify':
        
        case 'spotify-this-song':

        case 'spotify-this-song-':

        var song = "";

        for(let i = 3; i < process.argv.length; i++){

            song += process.argv[i] + " ";
        }

        song = encodeURIComponent(song);

        console.log(song);

        var SpotifyWebApi = require('spotify-web-api-node');

        var key = require('./spotkeys.js');

        // credentials are optional
        var spotifyApi = new SpotifyWebApi(key);

        // Retrieve an access token.
        spotifyApi.clientCredentialsGrant()

            .then((token) => {

                console.log('The access token expires in ' + data.body['expires_in']);

                console.log('The access token is ' + data.body['access_token']);

                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);

                }, (err) => {

                    console.log('Something went wrong when retrieving an access token', err);
                });
                // Search tracks whose name, album or artist contains song
                spotifyApi.searchTracks({q: song, type: 'track', limit: 1})

                    .then((data) => {

                        console.log('Search by song', data.body);

                    }, (err) => {

                        console.error('Something went wrong with the search', err);
                    });
        break;
    };
};
















//search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
