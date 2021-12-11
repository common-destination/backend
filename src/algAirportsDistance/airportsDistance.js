import geoCoder from "node-open-geocoder";
import { getDistance } from "geolib";

// get distance between two addresses / geo points in meters
const getGeoData = (strLocation1, strLocation2) => {
  return new Promise((resolve, reject) => {
    geoCoder()
      .geocode(strLocation1)
      .end((err, res) => {
        const coordAirport1 = { latitude: res[0].lat, longitude: res[0].lon };
        geoCoder()
          .geocode(strLocation2)
          .end((err, res) => {
            const coordAirport2 = {
              latitude: res[0].lat,
              longitude: res[0].lon,
            };
            // const dist = geoDistance.vincentySync(coordAirport1, coordAirport2);
            const dist = getDistance(coordAirport1, coordAirport2);
            resolve(dist);
          });
      });
  });
};

const getGeoDataTest = async () => {
  // this array can also be an array of objects with more details like country, etc...

  const arrAirports = [
    "Turin Airport, Italy",
    "Milan Airport, Italy",
    "Berlin Airport, Germany",
    "Moscow Airport, Russia",
    "Rome Airport, Italy",
  ];
  const flights = [];
  // function randomDate(start, end) {
  //   return new Date(
  //     start.getTime() + Math.random() * (end.getTime() - start.getTime())
  //   );
  // }

  // console.log(randomDate(new Date(2022, 1, 1), new Date()));

  function generateRandomDate() {
    return new Date(+new Date() + Math.floor(Math.random() * 10000000000));
  }
  console.log(new generateRandomDate().toLocaleDateString("en-EN"));
  // outer loop
  for (let i = 0; i < arrAirports.length; i++) {
    // combine with every other airport
    for (let j = i + 1; j < arrAirports.length; j++) {
      const distance = Math.round(
        (await getGeoData(arrAirports[i], arrAirports[j])) / 1000
      );

      const landingAndBoardingTime = 400;
      const flightDurationInHours = (landingAndBoardingTime + distance) / 800;

      function getFlightDuration() {
        const rhours = Math.floor(flightDurationInHours);
        const flightDurationInMinutes = (flightDurationInHours - rhours) * 60;
        const rminutes = Math.round(flightDurationInMinutes);
        return `${rhours} ${rhours === 1 ? "hour" : "hours"} and ${rminutes} ${
          rminutes === 1 ? "minute" : "minutes"
        }`;
      }

      // console.log( `Hin: ${arrAirports[i]} - ${arrAirports[j]} - ${Math.round(distance/1000)}` )
      // console.log( `Zurueck: ${arrAirports[j]} - ${arrAirports[i]} - ${Math.round(distance/1000)}` )

      // next for loop for a bunch of flights between these two airports
      // TODO: generate some random start date...
      const amountFlights = 1;

      for (let x = 0; x < amountFlights; x++) {
        flights.push({
          from: arrAirports[i].split(",")[0],
          to: arrAirports[j].split(",")[0],
          countryFrom: arrAirports[i].split(",")[1],
          countryTo: arrAirports[j].split(",")[1],
          distance: `${distance} km`,
          flightDuration: getFlightDuration(),
          flightDurationInHours,
          timestampsDeparture: generateRandomDate(),
        });
        flights.push({
          from: arrAirports[j].split(",")[0],
          to: arrAirports[i].split(",")[0],
          countryFrom: arrAirports[j].split(",")[1],
          countryTo: arrAirports[i].split(",")[1],
          distance: `${distance} km`,
          flightDuration: getFlightDuration(),
          flightDurationInHours,
          timestampsDeparture: generateRandomDate(),
        });
      }
    }
  }

  // departure: '2022-01-22T14:00',
  // arrive: '2022-01-22T15:30',

  // randomTime = () => {
  //   hrs = Math.round(Math.random() * 24);
  //   mins = Math.round(Math.random() * 60);
  //   const hFormat = hrs < 10 ? '0' : '';
  //   var mFormat = mins < 10 ? '0' : '';
  //   var amPm = hrs < 12 ? 'AM' : 'PM';
  //   var is12 = hrs % 12 === 0;

  //   return amPm === 'AM' && !is12
  //     ? String(hFormat + hrs + ':' + mFormat + mins + ' ' + amPm)
  //     : 'AM' && is12
  //     ? String(12 + ':' + mFormat + mins + ' ' + amPm)
  //     : is12
  //     ? String(hFormat + hrs + ':' + mFormat + mins + ' ' + amPm)
  //     : String(hFormat + (hrs - 12) + ':' + mFormat + mins + ' ' + amPm);
  // };

  // var resultTime = this.randomTime();
  // console.log(resultTime);

  console.log(flights);
};

getGeoDataTest();