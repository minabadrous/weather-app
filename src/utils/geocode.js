const request = require("request");

const geocode = (zone, callback) => {
    zone = zone.split(" ").join("%20");
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(zone) +
        ".json?access_token=pk.eyJ1IjoiYmFkcm91cyIsImEiOiJja3Rmb2l1OXMwM3J4MnVxNGV4MXVrc2kyIn0.XjhB_QtlrZmpPjmDz8fQYw&limit=1";

    request({ url, json: true }, (error, { body }) => {
        const features = body.features;

        if (error) {
            callback("cannot connect to network", undefined);
        } else if (!features.length) {
            callback("unable to find location geocode.", undefined);
        } else {
            const coordinates = features[0].center;
            callback(undefined, {
                lat: coordinates[0],
                lon: coordinates[1],
                location: features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
