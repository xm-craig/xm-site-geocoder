Geocoding Sites In xMatters
===========================

Some simple examples of using the xMatters API services to manage sites.


## Install Requirements
Make sure that you install all of the required dependencies.
```
 $ npm install
```

## Geting Google Maps API Key
Each Google Maps Web Service request requires an API key or client ID. API keys
are freely available with a Google Account at
https://developers.google.com/console. The type of API key you need is a
**Server key**.

To get an API key:

 1. Visit https://developers.google.com/console and log in with a Google Account.
 1. Select one of your existing projects, or create a new project.
 1. Enable the Geocoding API.
 1. Create a new **Server key**.
 1. If you'd like to restrict requests to a specific IP address, do so now.

You can find instructions on their github account: https://github.com/googlemaps/google-maps-services-js/#api-keys.

## Setup the credentials

1. Open sites-geocode.js file and add your google api key.
1. For the xMatters, you can set user credentials directly to the client wrapper, or as environment variables
   1. `XMATTERS_API_USERNAME`
   1. `XMATTERS_API_PASSWORD`

## Running the examples
- `$ node sites-geocode.js` - Geocode all sites using Google Maps Service API.
- `$ node sites-clear-location.js` - Clear the geocode location for all sites.
