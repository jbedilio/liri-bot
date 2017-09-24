var ops = "";

if(process.argv.length == 2){
    console.log("*****Throw me a freaken bone*****\n" + 
    'Follow this pattern to get\n' + 
    ' my tweets: enter - node liri.js my-tweets\n' + 
    ' my music: enter - node liri.js spotify-this-song "<title>"\n' + 
    ' my movies: enter - node liri.js movie-this "<title>"\n' + 
    ' random.txt: enter - node liri.js do-what-it-says');
    return;

}else{

    for(let i = 2; i < process.argv.length; i++){

        ops += process.argv[i] + "-";
    }

    console.log(ops);

    switch(ops){

        case 'tweets':

        case 'my tweets':

        case 'my-tweets':
        
        case 'my-tweets-':

        var Twitter = require('twitter');           

        var keys = require('./keys.js');

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
    };
};
