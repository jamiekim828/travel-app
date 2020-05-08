# Travel Application

- Nanodegree : Front End Developer
- Module : Capstone
- **_Extend Option: Added end date and displays length of trip_**

## Main technologies

- HTML
- sass
- JavaScript
- Fetch API
- Express.js
- Webpack

## Third party API

- Geonames API
- Weatherbit API
- Pixabay API

## Get Up and Running

Fork this repo, then change the current working directory to the location where you want the cloned directory to be made:

```
$ git clone https://github.com/jamiekim828/travel-app
```

Install dependencies:

```
$ npm install
```

_Note: dark sky api and pixabay api keys are stored in env folder._

or Sign up for achieve api credentials
[Geonames](http://www.geonames.org/login), [Weatherbit](https://www.weatherbit.io/), [Pixabay](https://pixabay.com/accounts/register/?source=signup_button_header)

Add your API credentials in .env file:

```
GEO_ID=your_api_username
WEATHERBIT_KEY=your_api_key
PIXABAY_KEY=your_api_key
```

**Project running on: http://localhost:8080**

Run npm script for start up the project:

```
$ npm run start
```

`$ npm run build-dev` to build development environment
`$ npm run build-prod` to build production environment
`$ npm run test` to test the app
