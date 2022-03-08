const { response } = require("express");
const express = require("express");
const { STATUS_CODES } = require("http");

const bodyParser = require("body-parser");

const https = require("https");
const { query } = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req, res) {
    const apiKey = "ec11949e5660fd669cf342668e7ae9e0";
    const query = req.body.cityName;
    const unit = "metric";
    const urlAddress = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";

    https.get(urlAddress, function(response) {
        console.log(response);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temperature = weatherData.main.temp;
            console.log(temperature);

            const weatherDiscription = weatherData.weather[0].description;
            console.log(weatherDiscription);

            const icon = weatherData.weather[0].icon;
            const imageUrl = '"http://openweathermap.org/img/wn/' + icon + '@2x.png"';

            res.write(
                "<p>The weather currently in " + query + " is " + weatherDiscription + "</p>"
            );
            res.write(
                "<h1>The temperature in " + query + " is " +
                temperature +
                " degree celcious</h1>"
            );
            res.write("<img src=" + imageUrl + "/>");
            res.send();
        });
    });

})



app.listen(3000, function(req, res) {
    console.log("Server is running on port 3000");
});