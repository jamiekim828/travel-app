var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const webpack = require('webpack');
const fetch = require('node-fetch');

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
  console.log('get travelData', travelData);
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

app.post('/test', addData);

function addData(req, res) {
  console.log('/test req.body', req.body);

  res.send(travelData);
}

// POST route
app.post('/add', async (req, res) => {
  console.log('/add req.body', req.body);
  const location = req.body.city_location;

  // geonames
  const geonamesUrl = geoUrl + location + geoID;
  const getGeonames = await fetch(geonamesUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const geonamesResult = await getGeonames.json();
  const firstGeoname = geonamesResult.geonames[0];
  console.log(firstGeoname);

  // weatherbit
  const cityName = firstGeoname.name;
  const weatherbitUrl = weatherUrl + cityName + weatherKey;

  const weatherbit = await fetch(weatherbitUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const weatherbitResult = await weatherbit.json();
  // const weatherbitTemp = weatherbitResult;
  console.log(weatherbitResult);

  // pixabay
  const pixabayUrl = pixaUrl + cityName;
  const pixabay = await fetch(pixabayUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const pixabayResult = await pixabay.json();
  const pixabayPhoto = pixabayResult.hits[0];
  console.log(pixabayPhoto);

  let newTravelData = {
    destination: firstGeoname.name,
    country: firstGeoname.countryName,
    temperature: weatherbitResult.data[0].temp,
    weatherinfo: weatherbitResult.data[0].weather.description,
    photoUrl: pixabayPhoto.webformatURL
  };

  travelData.unshift(newTravelData);
  res.send(newTravelData);
});
