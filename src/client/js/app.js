import fetch from 'node-fetch';

document.getElementById('planbutton').addEventListener('click', performAction);

function performAction(e) {
  let cityname = document.getElementById('destination').value;

  if (cityname) {
    getLocation()
      .then(data => {
        console.log('data', data);
        const city_location = data[0].name;
        console.log(city_location);

        postData('http://localhost:8080/add', {
          city_location: cityname
        });
      })
      .then(
        setTimeout(function() {
          updateUI();
        }, 3000)
      );
  }
}

// Geonames API
let geonames_baseUrl = 'http://api.geonames.org/searchJSON?q=';
let geonames_Key = `&maxRows=1&username=jamiekim828`;

const getLocation = async () => {
  const input = document.getElementById('destination').value;

  const res = await fetch(`${geonames_baseUrl}+${input}+${geonames_Key}`);
  try {
    const location = await res.json();
    const cityData = location.geonames;
    console.log('cityData', cityData);
    return cityData;
  } catch (error) {
    console.log('error', error);
  }
};

// POST
const postData = async (url = '', data = {}) => {
  let input = document.getElementById('destination').value;
  console.log('what is input?', input);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const result = await res.json();
    console.log('post result', result);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

// calculate duration

const date_diff = (dt1, dt2) => {
  let date1 = document.getElementById('departure-date').value;
  let date2 = document.getElementById('return-date').value;
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
};

// update UI
const updateUI = async () => {
  let origin_city = document.getElementById('origin').value;
  let destination = document.getElementById('destination').value;

  const req = await fetch('http://localhost:8080/all', {
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify()
  });
  try {
    const trip = await req.json();
    console.log('trip', trip);
    let photoUrl = trip[0].photoUrl;
    let country = trip[0].country;
    let temperature = trip[0].temperature;
    let description = trip[0].weatherinfo;
    let daparture = document.getElementById('departure-date').value;
    let returning = document.getElementById('return-date').value;

    let duration = date_diff(daparture, returning);
    console.log('duration', duration);
    let exact_days = Number(`${duration}`) + Number(1);
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    let dDay = date_diff(date, daparture);

    document.getElementById(
      'cityphoto'
    ).innerHTML = `<img src="${photoUrl}" alt="${destination}">`;
    document.getElementById(
      'where'
    ).innerHTML = `Your itinerary to <span class='desti'>${destination}</span>`;
    document.getElementById(
      'wheretowhere'
    ).innerHTML = `[from <span class='ori'>${origin_city}</span> to <span class='des'>${destination}</span>, <span class='des'>${country}</span>]`;
    document.getElementById(
      'dateinfo'
    ).innerHTML = `Travel Dates : ${daparture} ~ ${returning}`;
    document.getElementById(
      'duration'
    ).innerHTML = `Duration : ${duration} nights & ${exact_days} days`;
    document.getElementById('daystogo').innerHTML = `D-day : ${dDay} days left`;
    document.getElementById(
      'weatherresult'
    ).innerHTML = `Weather : Current weather of <span class='des'>${destination}</span> is ${description} and temperature is ${temperature}°C`;
  } catch (error) {
    console.log('error', error);
  }
};

document.getElementById('addbutton').addEventListener('click', addList);

function addList(e) {
  console.log('e', e);
}

function generateNewTrip() {}

function removeTrip() {}

export { performAction };
