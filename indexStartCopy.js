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

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(passTimes);
});
