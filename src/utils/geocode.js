const request = require('request');

const geocode = (address, callback) => {
    address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicHJhY2hpMjciLCJhIjoiY2trcXRyNXoxMGJ2dTJ2bzZtams0dncwMiJ9.Sex4SXt3_i3pKea6VOrt7Q&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geocoding service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search.",undefined);
    } else {
        const {center, place_name } = body.features[0];
        callback(undefined, {
            latitude: center[1],
            longitude: center[0],
            location: place_name
        });
    }
  });
};

module.exports = geocode;
