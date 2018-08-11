var googleMaps  = require('@google/maps');
var xmattersApi = require('xm-api-services-js');

const _DEBUG = true;

var googleMapsClient = googleMaps.createClient({
    key: 'AIzaSyBt64hHNgKbFo7_4UifGY_RDmiuZcOTOKM',
    Promise: Promise
});

var xMClient = xmattersApi.createClient({
    host:'craiggulliver.xmatters.com',
    username: 'rest-admin',
    password:'1234',
    debug: _DEBUG
});


xMClient.get('sites', function(err, response) {
    if (!err) {
        for(var i = 0; i < 5; i++) {
            var site = response.data[i];

            if (site.latitude || site.longitude) {
                site.latitude = '';
                site.longitude = '';
                if (_DEBUG) console.log("Clearing location for: " + site.name);
                xMClient.post('sites', site, function(err, response) {
                    if (err) {
                        console.error("ERROR An error occurred while updating site: " + siteData.name, err);
                    }
                });
            }
        }
    } else {
        console.error('xMatters request failed', err);
    }
});
