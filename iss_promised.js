
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

 
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);

};

const fetchISSFlyOverTimes = function(body) {
  const latitude = JSON.parse(body).latitude;
  const longitude = JSON.parse(body).longitude;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(data => {
      return fetchCoordsByIP(data);
    })
    .then(data => {
      //console.log('FetchCoordsByIP',data);
      return fetchISSFlyOverTimes(data);
    })
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};




module.exports = { nextISSTimesForMyLocation };