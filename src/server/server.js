var path = require('path');
const webpack = require('webpack');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const GeoID = process.env.GEO_ID;
const WeatherKey = process.env.WEATHERBIT_KEY;
const PixaKey = process.env.PIXABAY_KEY;

// GeoURL = `http://api.geonames.org/searchJSON?q=${}&username=${GeoID}`;
// WeatherURL = `https://api.weatherbit.io/v2.0/current?city=${}&key=${WeatherKey}`;
// PixaURL = `https://pixabay.com/api/?key=${PixaKey}&image_type=photo&q=${}`;

const app = express();
app.use(cors());

// to use json
app.use(bodyParser.json());

// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function(req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
