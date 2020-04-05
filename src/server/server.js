var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const webpack = require('webpack');

// set environment for API
const dotenv = require('dotenv');
dotenv.config();

// set express
const app = express();

// enables cors(cross-origin resource sharing)
var cors = require('cors');
app.use(cors());

// to use json
app.use(bodyParser.json());

// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// set up static
app.use(express.static('dist'));

console.log(__dirname);

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});

// GET
app.get('/', function(req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'));
});

// empty data
const travelData = [];

// GET route: all data
app.get('/all', getData);

function getData(req, res) {
  res.send(travelData);
}

// geonames API
const GeoID = `&username=${process.env.GEO_ID}`;
const GeoUrl = 'http://api.geonames.org/searchJSON?q=';

// weatherbit API
const WeatherKey = `&key=${process.env.WEATHERBIT_KEY}`;
const WeatherUrl = 'https://api.weatherbit.io/v2.0/current?city=';

// pixabay API
const PixaKey = process.env.PIXABAY_KEY;
const PixaURL = `https://pixabay.com/api/?key=${PixaKey}&image_type=photo&q=`;

// GET route
app.get('/weather', (req, res) => {
  console.log('weather req.body', req.body);
});

// POST route
