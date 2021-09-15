console.log("client side javascript is loaded");

const getElement = (id) => document.getElementById(id);

const weatherForm = getElement("weather-form");
const weatherAddress = getElement("weather-address");
const weatherForecast = getElement("weaher-forecast");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    weatherForecast.textContent = "loading...";

    fetch("/weather?address=" + weatherAddress.value).then((response) => {
        response.json().then((data) => {
            if (data.error)
                return (weatherForecast.textContent = data.error.error);

            const { describtion, feelslike, temperature, location } = data;
            const forecast =
                location +
                " is " +
                describtion +
                ". It is " +
                temperature +
                " but, it feels like " +
                feelslike +
                " out there.";

            weatherForecast.textContent = forecast;
        });
    });
});
