const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const zone = process.argv[2];

if (zone) {
    geocode(zone, (error, { lat, lon, location } = {}) => {
        if (error) return console.log(error);

        forecast(lat, lon, (error, { temperature, feelslike } = {}) => {
            if (error) return console.log(error);

            console.log(
                "%s is partly cloudy now. Temperature is %s yet, it feels like %s out there.",
                location,
                temperature,
                feelslike
            );
        });
    });
} else {
    console.log("Please provide an address.");
}
