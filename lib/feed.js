var Feed = require('feed');

module.exports = createFeed;

function createFeed (items) {
  var feed = new Feed({
    title: items[0].type + 's' + ' - ' + geddy.config.eventName,
    link: 'http://example.com/',
    image: geddy.config.domain + '/img/logo-200.png',
    author: {
      name: geddy.config.eventName
    }
  });

  var itemtype = (items[0].type + '').toLowerCase();
  var author = items[0].contributor ? 'contributor' : 'prospect';
  for (var key in items) {
    feed.item({
      title: items[key].title,
      link: geddy.viewHelpers[itemtype + 'Path'](items[key].id),
      description: items[key].description,
      author: [{name: items[key][author]}],
      date: items[key].updatedAt || items[key].createdAt
    });
  }

  return feed;
}
