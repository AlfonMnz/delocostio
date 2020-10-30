require('dotenv').config();
const response = require('./response');
const Twit = require('twit');
const T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

var stream = T.stream('statuses/filter', {follow: response.accounts})

stream.on('tweet', function (tweet){
    replyTweet(tweet)
})

function replyTweet (tweet){

    if (!response.accounts.includes(tweet.user.id_str))
        return;
    console.log(`USERNAME: ${tweet.user.screen_name} - TEXT: ${tweet.text}`)
    let id = tweet.id_str;
    let text =  response.responses[Math.floor(Math.random() * response.responses.length)];
    let userScreenName = tweet.user.screen_name;
    let tweetText = `@${userScreenName} ${text}`;
    T.post('statuses/update', {status: tweetText, in_reply_to_status_id: id}, function (err, data, response){
        if (err){
            console.log('Something went wrong!');
        }else{
            console.log(`tweet send ${text}`);
        }
    });

}