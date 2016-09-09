var request = require('request');

var fsConfig = {
  base_url: 'https://api.foursquare.com/v2/venues/explore?',
  client_id: 'Your ID',
  client_secret: 'Your Secret',
};

var fsCredentials = '&client_id=' + fsConfig.client_id + '&client_secret=' + fsConfig.client_secret + '&v=20140601';

console.log(fsConfig.base_url + 'near=Waterford,IE' + fsCredentials);

function loadVenues(locationName, venueKeyword) {
  var requestOptions = {
    url: fsConfig.base_url + 'near=' + locationName + '&query=' + venueKeyword + fsCredentials,
    method: 'GET',
    json: {},
  };
  request(requestOptions, function (err, response, body) {
    const venues = body.response.groups[0].items;
    const checkins = [];
    for (let i = 0; i < venues.length; i++) {
      const venue = venues[i];
      const checkin = {
        name: venue.venue.name,
        checkins: venue.venue.stats.checkinsCount,
        users: venue.venue.stats.usersCount,
      };
      checkins.push(checkin);
    }

    console.log(checkins);
  });
}

var locationName = 'Waterford, IE';
loadVenues(locationName, '');