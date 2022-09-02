const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const fetchMyIP = (callback) => {
  // error can be set if invalid domain, user is offline, etc.
  request('https://api.ipify.org?format=json', (err, response, body) => {

    if (err) {
      return callback(err, null);
    }
    // if non-200 status, assume server error
    if (response.statuscode !== 200) {
      const msg = `Status Code ${response.statuscode} when fetching IP.Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;

    callback(null, ip);
  });
};



const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (err, response, body) => {

    if (err) {
      return callback(err, null);
    }
    const data = JSON.parse(body);

    if (!data.success) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      return callback(Error(msg), null);
    } else {
      let coordinates = {};
      coordinates.latitude = data.latitude;
      coordinates.longitude = data.longitude;
      callback(null, coordinates);
    }

  });

};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};



/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const nextISSTimesForMyLocation = function(callback) {
  // empty for now
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };