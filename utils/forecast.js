const request = require("request");

const forecast = (lat, lon, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=a1c0ac257e465448ea123416ee656299&query=" +
        lat +
        "," +
        lon +
        "&units=m";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("cannot connect to network.", undefined);
        } else if (body.error) {
            callback("unable to find location weather", undefined);
        } else {
            const { temperature, feelslike, weather_descriptions } =
                body.current;

            callback(undefined, {
                describtion: weather_descriptions[0],
                temperature,
                feelslike,
            });
        }
    });
};

module.exports = forecast;
