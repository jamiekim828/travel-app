import fetch from 'node-fetch';
import { deleteHandle } from './deleteList';

// input destination, date then duration, d-day, weather will show
// document.getElementById('planbutton').addEventListener('click', performAction);
document.addEventListener('DOMContentLoaded', function() {
  var planbutton = document.getElementById('planbutton');
  planbutton.addEventListener('click', performAction);
});

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

// // calculate duration
const date_diff = (dt1, dt2) => {
  let date1 = document.getElementById('departure-date').value;
  let date2 = document.getElementById('return-date').value;
  if (date1 && date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  } else if (date1 == null || date2 == null) {
    console.log('date informations needed');
  }
};

// update UI (planning)
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

// To do list
// Create a "close" button and append it to each list item
var thisUL = document.getElementById('myUL');
if (thisUL) {
  var myNodelist = thisUL.getElementsByTagName('LI');
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = 'none';
  };
}

// Add a "checked" symbol when clicking on a list itemw21
var list = document.getElementById('myUL');
if (list) {
  list.addEventListener(
    'click',
    function(e) {
      if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
      }
    },
    false
  );
}

// Create a new to do list when clicking on the "Add" button
function newElement() {
  var li = document.createElement('li');
  var inputValue = document.getElementById('myInput').value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert('You must write something!');
  } else {
    document.getElementById('myUL').appendChild(li);
  }
  document.getElementById('myInput').value = '';

  var span = document.createElement('SPAN');
  var txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = 'none';
    };
  }
}

// document.getElementById('todoadd').addEventListener('click', newElement);
document.addEventListener('DOMContentLoaded', function() {
  var addaddbutton = document.getElementById('todoadd');
  addaddbutton.addEventListener('click', newElement);
});

// Create Travel List - you can see all travel list
const addToList = async () => {
  const req = await fetch('http://localhost:8080/all', {
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify()
  });
  try {
    const alltrip = await req.json();

    console.log('is this right?', alltrip);

    for (let i = 0; i <= alltrip.length - 1; i++) {
      var card = document.createElement('div');

      var desti_link = document.createElement('a');
      var tripDesti = document.createElement('h2');
      desti_link.appendChild(tripDesti);
      tripDesti.id = 'next_destination';
      tripDesti.innerHTML = `${alltrip[i].destination}/${alltrip[i].country}`;

      var tripWeather = document.createElement('h3');
      tripWeather.id = 'next_weather';
      tripWeather.innerHTML = `The weather is ${alltrip[i].weatherinfo} and the temperature is ${alltrip[i].temperature}`;

      var link = document.createElement('a');
      link.href = '#';
      var img = document.createElement('img');
      link.appendChild(img);
      img.id = 'location_img';
      img.src = `${alltrip[i].photoUrl}`;

      var del = document.createElement('button');
      del.id = `delete_list${i}`;
      del.innerHTML = 'delete';

      card.appendChild(desti_link);
      card.appendChild(tripWeather);
      card.appendChild(link);
      card.appendChild(del);

      document.getElementById('list_main').appendChild(card);
      document
        .getElementById(`delete_list${i}`)
        .addEventListener('click', async () => {
          console.log('here!!!!');
          const delReq = await fetch('http://localhost:8080/delete', {
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id: i + 1 }),
            method: 'POST'
          });
          const delTrip = await delReq.json();

          console.log('deleted', delTrip);

          const getReq = await fetch('http://localhost:8080/all', {
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(),
            method: 'GET'
          });

          const everyTrip = await req.json();

          return everyTrip;
        });
    }
  } catch (error) {
    console.log('error', error);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var addlistaction = document.getElementById('addtolist');
  addlistaction.addEventListener('click', addToList);
});

function sum(a, b) {
  return a + b;
}

export { performAction };
export { newElement };
export { sum };
