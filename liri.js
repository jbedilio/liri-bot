var Twitter = require('twitter');

var keys = require('./keys.js');

var client = new Twitter(keys);

var params = { screen_name: 'joecitizn', count: 20};

client.get('statuses/user_timeline', params, (error, tweets, response) => {

    if (error) {

        throw error;
    }
    if(response.statusCode == 200){

        for(var i = 0; i < tweets.length; i++){

            process.argv[2] = tweets[i].text;

            process.argv[3] = tweets[i].created_at;

            console.log(process.argv[2] + " " + process.argv[3]);
        }

        //console.log(JSON.parse(tweets));

    }
});


























/*var keys = require('./keys.js');

//var queryUrl = "https://api.twitter.com/1.1/search/tweets.json?q=%40joecitizn&result_type=recent&count=20";

var param = { screen_name: 'joecitizn' };

keys.get('search/tweets', param, function (error, tweets, response) {

    if (error) {

        throw error;

    }
    if (response.statusCode == 200) {

        //var jp = JSON.parse(tweets);

        console.log('My latest tweets: ' + JSON.parse(tweets));

    }

});*/