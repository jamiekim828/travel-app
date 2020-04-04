document.getElementById('planbutton').addEventListener('click', performAction);

function performAction(e) {
  let cityname = document.getElementById('destination').value;

  if (cityname) {
    getLocation();
  }
}

// Geonames API
let geonames_baseURL = 'http://api.geonames.org/searchJSON?q=';
let geonames_Key = `&maxRows=10&username=jamiekim828`;

const getLocation = async () => {
  const input = document.getElementById('destination').value;

  const res = await fetch(`${geonames_baseURL}+${input}+${geonames_Key}`);
  try {
    const location = await res.json();
    console.log('location', location);
    return location;
  } catch (error) {
    console.log('error', error);
  }
};

export { performAction };
