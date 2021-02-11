const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=810d493e5f02131d8f8bf5049959358d&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
        const { temperature, feelslike, weather_descriptions } = response.body.current;
      const data = `Current Temperature is: ${temperature} degree. Feels like ${feelslike} degree.\nWeather description: ${weather_descriptions[0]}`;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
