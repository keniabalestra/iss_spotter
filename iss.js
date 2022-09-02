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

module.exports = { fetchMyIP, fetchCoordsByIP };