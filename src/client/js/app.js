const baseUrl = 'http://localhost:8081';

document.getElementById('planbutton').addEventListener('click', performAction);

function performAction(e) {
  let cityname = document.getElementById('destination').value;

  if (cityname) {
    getLocation();
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
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export { performAction };
