const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
require("dotenv").config();

app.set("port", process.env.PORT || 8000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(app.get("port"), function() {
  console.log("Node running on port", app.get("port"));
});

const apiKey = process.env.API_ID;

app.get("/", function(req, res) {
  let cityName = req.query.city;
  console.log(cityName);
  let url = "";

  if (cityName == null) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=los+angeles&units=imperial&appid=${apiKey}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
  }

  request(url, function(error, response, body) {
    data = JSON.parse(body);

    let weather = {
      city: data.name,
      temp: Math.floor(data.main.temp),
      desc: data.weather[0].description,
      icon: data.weather[0].icon,
      hum: data.main.humidity,
      wind: Math.floor(data.wind.speed),
      clouds: data.clouds.all,
      date: data.dt,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    };

    // sunrise time
    let sunrise = new Date(weather.sunrise * 1000);
    let srhours = sunrise.getHours();
    let srminutes = sunrise.getMinutes();
    let srseconds = sunrise.getSeconds();
    weather.sunrise = srhours + ":" + srminutes + ":" + srseconds;

    // sunset time
    let sunset = new Date(weather.sunset * 1000);
    let sshours = sunset.getHours();
    let ssminutes = sunset.getMinutes();
    let ssseconds = sunset.getSeconds();
    weather.sunset = sshours + ":" + ssminutes + ":" + ssseconds;

    // current date / time
    let myDate = new Date(weather.date * 1000);
    let currentDate = new Date(myDate.toUTCString());
    currentDate = currentDate
      .toString()
      .replace("GMT-0700 (Pacific Daylight Time)", "");
    weather.date = currentDate;

    var weather_data = { weather: weather };
    res.render("index", weather_data);
  });
});
