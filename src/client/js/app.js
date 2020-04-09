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

        postData('http://localhost:8080/add', { city_location: cityname });
      })
      .then(
        setTimeout(function() {
          updateUI();
        }, 1000)
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

// update UI
const updateUI = async () => {
  let origin_city = document.getElementById('origin').value;

  const req = await fetch('http://localhost:8080/all', {
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify()
  });
  try {
    const trip = await req.json();
    console.log('trip', trip);
  } catch (error) {
    console.log('error', error);
  }
};

export { performAction };
