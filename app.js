var irc = require('irc');
var request = require('request');
var https = require( 'https' );
var config = require('./config.json');

//create IRC bot with config.json
var bot = new irc.Client(config.server, config.botName, {
        channels: config.channels
});

bot.addListener("message", function(from, to, message) {
  message = from + ": " + message
  sendToSlack(message)
});

var sendToSlack = function (message) {
  // build JSON string
  var payload = '{"text":"' + message + '"}'
  //get slack config from config.json
  var options = {
    uri: config.uri,
    form: payload
  };

  request.post(options, function(error, response, body){
    if (!error && response.statusCode == 200) {
    } else {
      console.log('error: '+ response.statusCode + body);
    }
  });
}
