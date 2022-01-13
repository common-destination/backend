import geoCoder from 'node-open-geocoder';
import { getDistance } from 'geolib';
import moment from 'moment';
import {airports} from '../data/airports.js'

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
            const dist = getDistance(coordAirport1, coordAirport2);
            resolve(dist);
          });
      });
  });
};
function addDuration(date, m) {
  date = new Date(date);
  const newDate = date.setTime(date.getTime() + m * 1000 * 60);
  return newDate;
}
const getFlightsAPI = async () => {
  // this array can also be an array of objects with more details like country, etc...


  let flights = [];
  // function randomDate(start, end) {
  //   return new Date(start.getTime() + 3 * (end.getTime() - start.getTime()));
  // }
  // console.log(randomDate(new Date(2022, 1, 1), new Date(2022, 2, 1)));
  const flightsConditions = (fromRange, toRange) => {
    return toRange + fromRange >= 9; //flights only to airport with range 8
  };

  const dayOfWeek = (dailydate) => {
    let dayInNum = dailydate.isoWeekday();
    if (dayInNum === 1) return 'Monday';
    if (dayInNum === 2) return 'Tuesday';
    if (dayInNum === 3) return 'Wednesday';
    if (dayInNum === 4) return 'Thurday';
    if (dayInNum === 5) return 'Friday';
    if (dayInNum === 6) return 'Saturday';
    if (dayInNum === 7) return 'Sunday';
  };

  const Month = (dailydate) => {
    let monthInNum = moment(dailydate).format('M');
    if (monthInNum === '1') return 'January';
    if (monthInNum === '2') return 'February';
    if (monthInNum === '3') return 'March';
    if (monthInNum === '4') return 'April';
    if (monthInNum === '5') return 'May';
    if (monthInNum === '6') return 'June';
    if (monthInNum === '7') return 'July';
    if (monthInNum === '8') return 'August';
    if (monthInNum === '9') return 'September';
    if (monthInNum === '10') return 'October';
    if (monthInNum === '11') return 'November';
    if (monthInNum === '12') return 'December';
  };

  // outer loop
  for (let i = 0; i < airports.length; i++) {
    // combine with every other airport
    for (let j = i + 1; j < airports.length; j++) {
      if (!flightsConditions(airports[i].range, airports[j].range)) {
        continue;
      }
      const distance = Math.round(
        (await getGeoData(
          `${airports[i].name} Airport, ${airports[i].country}`,
          `${airports[j].name} Airport, ${airports[j].country}`
        )) / 1000
      );
      const landingAndBoardingTime = 0.5;
      let flightDurationInHours = distance / 800 + landingAndBoardingTime;
      const getFLightPrice =
        15 + Math.floor(Math.random() * (flightDurationInHours * 120));
      function getFlightDuration() {
        const rhours = Math.floor(flightDurationInHours);
        const flightDurationInMinutes = (flightDurationInHours - rhours) * 60;
        const rminutes = Math.round(flightDurationInMinutes);
        return `${rhours} ${rhours === 1 ? 'hour' : 'hours'} and ${rminutes} ${
          rminutes === 1 ? 'minute' : 'minutes'
        }`;
      }

      const amountFlights = 30;
      //ITERATION Y DAYS TO ADD 1 DAY EVRY TIME

      for (let x = 0; x < amountFlights; x++) {
        let departureDate = moment().add(x, 'days');
        let departureDate2 = moment()
          .add(x, 'days')
          .add(flightDurationInHours + 1, 'hours');

        flights.push({
          from: airports[i].name,
          to: airports[j].name,
          countryFrom: airports[i].country,
          countryTo: airports[j].country,
          departure: departureDate.toString().slice(0, -12),
          arrival: new Date(
            addDuration(departureDate, flightDurationInHours * 60)
          )
            .toString()
            .split('G')[0]
            .slice(0, -4),
          distance: `${distance} km`,
          flightDuration: getFlightDuration(),
          flightDurationInHours,
          day: dayOfWeek(departureDate),
          month: Month(departureDate),
          price: getFLightPrice,
        });
        flights.push({
          from: airports[j].name,
          to: airports[i].name,
          countryFrom: airports[j].country,
          countryTo: airports[i].country,
          departure: departureDate2.toString().slice(0, -12),
          arrival: new Date(
            addDuration(departureDate2, flightDurationInHours * 60)
          )
            .toString()
            .split('G')[0]
            .slice(0, -4),
          distance: `${distance} km`,
          flightDuration: getFlightDuration(),
          flightDurationInHours,
          day: dayOfWeek(departureDate2),
          month: Month(departureDate2),
          price: getFLightPrice,
        });
      }
    }
  }
  return flights;
};
// const filteredFlights = flights.filter(
//   (element) =>
//     element.from !== 'London Airport' && element.to !== 'Paris Airport'
// );
// return filteredFlights.sort((a, b) => a.departure - b.departure);
export default getFlightsAPI;