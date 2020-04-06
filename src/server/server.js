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
const geoID = `&username=${process.env.GEO_ID}`;
const geoUrl = 'http://api.geonames.org/searchJSON?q=';

// weatherbit API
const weatherKey = `&key=${process.env.WEATHERBIT_KEY}`;
const weatherUrl = 'https://api.weatherbit.io/v2.0/current?city=';

// pixabay API
const pixaKey = process.env.PIXABAY_KEY;
const pixaUrl = `https://pixabay.com/api/?key=${pixaKey}&image_type=photo&q=`;

// POST route
app.post('/add/location', (req, res) => {
  // console.log('post req.body', req.body);
  res.send('Hello World!');
});

// city data from geonames
const geonames = async cityName => {
  const geonamesUrl = geoUrl + cityName + geoID;
  const res = fetch(geonamesUrl);
  let city = {};
  try {
    city = res.json();
    return city;
  } catch (error) {
    console.log('error', error);
  }
  res.send(city);
};

// weather data from weatherbit
const weatherbit = async cityName => {
  const weatherbitUrl = weatherUrl + cityName + weatherKey;
  const res = fetch(weatherbitUrl);
  let weather = {};
  try {
    weather = await res.json();
    return weather;
  } catch (error) {
    console.log('error', error);
  }
  res.send(weather);
};

// image from pixabay
const pixabay = async cityName => {
  const pixabayUrl = pixaUrl + cityName;
  const res = fetch(pixabayUrl);
  let image = {};
  try {
    image = await res.json();
    return image;
  } catch (error) {
    console.log('error', error);
  }
  res.send(image);
};
