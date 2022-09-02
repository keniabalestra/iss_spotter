// const { fetchMyIP } = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });



// const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('70.50.165.31', (err, data) => {
//   if (err) {
//     console.log(err.message);
//         return;
//   }
//   console.log(data);
// });

// const { fetchISSFlyOverTimes } = require('./iss');
// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-193.13000' }, (err, data) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log('It worked! Returned flyover times:' , data);
// });


const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

module.exports = {printPassTimes};


