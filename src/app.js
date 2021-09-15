const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirecory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Express Config
const expressConfigs = [
    {
        config: "view engine",
        value: "hbs",
    },
    {
        config: "views",
        value: viewsPath,
    },
];
expressConfigs.map(({ config, value }) => {
    app.set(config, value);
});
hbs.registerPartials(partialsPath);

// Setting static firectory to serve
app.use(express.static(publicDirecory));

const mainData = {
    name: "mina",
};

const dynamicPages = [
    {
        link: "",
        view: "index",
        props: { ...mainData, title: "weather" },
    },
    {
        link: "/about",
        view: "about",
        props: { ...mainData, title: "about page" },
    },
    {
        link: "/help",
        view: "help",
        props: {
            ...mainData,
            title: "help page",
            message: "can I help you with smth?",
        },
    },
    {
        link: "/help/*",
        view: "404",
        props: {
            errorMessage: "Help article not found",
        },
    },
    {
        link: "*",
        view: "404",
        props: {
            ...mainData,
            errorMessage: "Page not found",
            title: "Error Page",
        },
    },
];

app.get("/weather", (req, res) => {
    const sendError = (error) => res.send({ error });
    let responseData = { address: req.query.address };

    if (!req.query.address) {
        return sendError("address is required");
    }

    geocode(responseData.address, (error, { lat, lon, location } = {}) => {
        if (error) return sendError({ error });

        forecast(
            lat,
            lon,
            (error, { describtion, temperature, feelslike } = {}) => {
                if (error) return sendError({ error });

                res.send({
                    location,
                    describtion,
                    temperature,
                    feelslike,
                });
            }
        );
    });
});

dynamicPages.forEach(({ link, view, props }) => {
    app.get(link, (req, res) => {
        res.render(view, props);
    });
});

app.listen(port, () => {
    console.log("server in running on " + port);
});
