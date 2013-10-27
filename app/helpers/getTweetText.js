var qs = require('querystring');

exports.getTweetText = function (id) {
  var config = geddy.config
    , tweetText
    , url;

  url = config.domain + '/contribs/' + id;
  tweetText = 'I submitted an awesome talk for ' + config.eventName + ': ' + url;
  tweetText = qs.escape(tweetText);

  return tweetText;
};
