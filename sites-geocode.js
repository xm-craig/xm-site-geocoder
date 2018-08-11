var googleMaps  = require('@google/maps');
var xmattersApi = require('xm-api-services-js');

const _DEBUG = true;

// TODO - Update the API key with on of your own
var googleMapsClient = googleMaps.createClient({
    key: '<GOOGLE_API_KEY>',
    Promise: Promise
});

// TODO - Update the host and user credentials
var xMClient = xmattersApi.createClient({
    host:'<XMATTERS_DOMAIN_NAME>',
    username: '<XMATTERS_USERNAME>',
    password:'<XMATTERS_PASSWORD>',
    debug: _DEBUG
});


xMClient.get('sites', function(err, response) {
    if (!err) {
        for(var i in response.data) {
            var site = response.data[i];

            if (site.address1 && site.city && site.state && site.country && site.postalCode) {
                var siteAddress = {
                    address: site.address1 + " " + site.address2 + ", " + site.city + ", " + site.state + " " + site.country + " " + site.postalCode
                };

                if (_DEBUG) console.log("Requesting geocode for site: " + site.name);
                // Geocode an address.
                try {
                    googleMapsClient.geocode(siteAddress).asPromise()
                   .then((function() {
                        // we use an inline closure to scope the site variable before the var is overwritten in the next iteration of the for loop
                        var siteData = response.data[i];
                        return function(resp) {
                            if (_DEBUG) console.log("Geocode response: " + resp);
                            if (_DEBUG) console.log("Successful geocode request: " + siteData.name);
                            var geocode = resp.json.results[0];
                            if (geocode.geometry.location) {
                                siteData.latitude = geocode.geometry.location.lat;
                                siteData.longitude = geocode.geometry.location.lng;
                                xMClient.post('sites', siteData, function(err, response) {
                                    if (err) {
                                        console.error("ERROR An error occurred while updating site: " + siteData.name);
                                    }
                                });
                            }
                        }
                    })())
                    .catch((function() {
                        // we use an inline closure to scope the site variable before the var is overwritten in the next iteration of the for loop
                        var siteData = response.data[i];
                        return function(err) {
                            console.error("ERROR An error occurred while geocoding site: " + siteData.name, err);
                        }
                    })());

                } catch (e) {
                   console.error('GoogleMaps Service API Request Failed ', e)
                }
            } else {
                console.error("ERROR - " + site.name + " has incomplete information for geocoding.");
            }
        }
    } else {
        console.error('xMatters request failed', err);
    }
});
