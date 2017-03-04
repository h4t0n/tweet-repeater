let Twitter = require('fast-tweet');
let scheduler = require('day-schedule');

let UNICODE_INVISIBLE = "\u2063";

module.exports = function (twitterConfig, scheduleConfig, tweets, scheduleCallback) {

    let client = new Twitter(twitterConfig);

    let innerTweets = JSON.parse(JSON.stringify(tweets));
    let tweetFunctions = [];
    if (Array.isArray(innerTweets)) {
        for (let i in innerTweets) {
            tweetFunctions[i] = getTweetFunction(client, innerTweets[i], scheduleCallback);
        }
    } else {
        tweetFunctions.push(getTweetFunction(client, innerTweets, scheduleCallback));
    }

    return scheduler.daySchedule(scheduleConfig, tweetFunctions);
}

function getTweetFunction(client, tweet, callback) {

    return function sendTweet(date) {

        function simpleTweet(_tweet) {
            return client.tweet(_tweet).then(function (par) {
                return callback(null, { date: date, tweet: par });
            }).catch(callback);
        }

        if (!tweet.imagePath) {
            let words = tweet.status.split(" ");
            console.log(tweet.status.length);
            let random = randomIntFromInterval(0, words.length - 1);
            words[random] = words[random].concat(UNICODE_INVISIBLE);
            console.log(random);
            console.log(words.join(" ").length)
            return simpleTweet({
                status: words.join(" ")
            });
        }

        return simpleTweet(tweet);
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}