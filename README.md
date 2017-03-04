# Tweet Repeater
Send and repeat tweet(s) during the day(s). Useful for marketing or social media manager.
 
## Install 

```
$ npm install tweet-repeater --save
```

## Usage

Tweet repeater is send a tweet or a list of tweet sequentially durings the day(s). It can be useful for marketing and social media manager purposes to send the same tweet at regular intervals during the day(s).

The following examples send the 2 tweets for 10 times a day (5 times for each tweet) from 10:00 to 19:00 starging from today.

### Send a tweet (without image)
Twitter desn't allow to send the same tweet multiple times in a short period. So the library randomly adds an extra "hidden" UNICODE character.

```javascript
let scheduled = tweetRepeater(
    {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        access_token_key: ACCESS_TOKEN_KEY,
        access_token_secret: ACCESS_TOKEN_SECRET
    },
    {
        startDay: new Date(), // today
        startHour: 10, 
        endHour: 19,
        nTimesPerDay: 10,
        nDays: 1
    }, [{
        status: "Hello World!!!"
    }, {
        status: "Another tweet!!"
    }], function (err, scheduledTweet) {
        // executed as a callback each time a tweet is sent
        
        // scheduledTweet contains tweet info (object from Twitter APIs)
    })

console.log(scheduled); // to see all the scheduled events
```

### Send a tweet with Image
The image is sent again for each tweet.

```javascript
let scheduled = tweetRepeater(
    {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        access_token_key: ACCESS_TOKEN_KEY,
        access_token_secret: ACCESS_TOKEN_SECRET
    },
    {
        startDay: new Date(), // today
        startHour: 10, 
        endHour: 19,
        nTimesPerDay: 10,
        nDays: 1
    }, [{
        status: "Hello World!!!"
        imagePath: "./myImage.png"
    }, {
        status: "Another tweet!!"
    }], function (err, scheduledTweet) {
        // executed as a callback each time a tweet is sent
        
        // scheduledTweet contains tweet info (object from Twitter APIs)
    })

console.log(scheduled); // to see all the scheduled events
```