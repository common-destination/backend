import geoCoder from 'node-open-geocoder';
import { getDistance } from 'geolib';
import moment from 'moment';

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

function addDuration(date, m) {
  date = new Date(date);
  const newDate = date.setTime(date.getTime() + m * 1000 * 60);
  // console.log(newDate, date)
  return newDate;
}
// addDuration(new Date(), 20)
const getFlightsAPI = async () => {
  // this array can also be an array of objects with more details like country, etc...

  // { airport: 'London Airport', country: 'UK', groups: [1, 4, 5] }, // 80
  // { airport:'Paris Airport',country: 'France',groups: [1, 3, 5] } // 76

  // const airportsGroups = [
  //   { one: ['London Airport, UK', 'Paris Airport, France'] },
  //   {
  //     two: [
  //       ...airportsGroups.one,
  //       'Amsterdam Airport, Netherlands',
  //       'Frankfurt Airport, Germany',
  //     ],
  //   },
  //   { three: [...airportsGroups.two, 'Madrid-Barajas Airport, Spain'] },
  //   { four: ['London Airport, UK', 'Paris Airport, France'] },
  //   { five: ['London Airport, UK', 'Paris Airport, France'] },
  //   { six: ['London Airport, UK', 'Paris Airport, France'] },
  //   { seven: ['London Airport, UK', 'Paris Airport, France'] },
  //   { eight: ['London Airport, UK', 'Paris Airport, France'] },
  // ];

  const airports = [
    {
      name: 'London Airport',
      country: 'UK',
      groups: [1, 2, 3, 4, 5, 6, 7, 8],
      passengersInMillionPerYear: 80,
    },
    {
      name: 'Paris Airport',
      country: 'France',
      groups: [1, 2, 3, 4, 5, 6, 7],
      passengersInMillionPerYear: 76,
    },
    {
      name: 'Amsterdam Airport',
      country: 'Netherlands',
      groups: [1, 2, 3, 4, 5, 6, 7],
      passengersInMillionPerYear: 71,
    },
    // {
    //   name: 'Frankfurt Airport',
    //   country: 'Germany',
    //   groups: [1, 2, 3, 4, 5, 6, 7],
    //   passengersInMillionPerYear: 70,
    // },
    // {
    //   name: 'Madrid-Barajas Airport',
    //   country: 'Spain',
    //   groups: [1, 2, 3, 4, 5, 6],
    //   passengersInMillionPerYear: 61,
    // },
    // {
    //   name: 'Barcelona Airport',
    //   country: 'Spain',
    //   groups: [1, 2, 3, 4, 5],
    //   passengersInMillionPerYear: 52,
    // },
    // {
    //   name: 'Istanbul Airport',
    //   country: 'Turkey',
    //   groups: [1, 2, 3, 4, 5],
    //   passengersInMillionPerYear: 52,
    // },
    // {
    //   name: 'Moscow Airport',
    //   country: 'Russia',
    //   groups: [1, 2, 3, 4],
    //   passengersInMillionPerYear: 49,
    // },
    // {
    //   name: 'Freising Airport',
    //   country: 'Germany',
    //   groups: [1, 2, 3, 4],
    //   passengersInMillionPerYear: 47,
    // },
    // {
    //   name: 'Rome Airport',
    //   country: 'Italy',
    //   passengersInMillionPerYear: 43,
    //   groups: [1, 2, 3, 4],
    // },
    // {
    //   name: 'Dublin Airport',
    //   country: 'Ireland',
    //   passengersInMillionPerYear: 32,
    //   groups: [1, 2, 3],
    // },
    // {
    //   name: 'Vienna Airport',
    //   country: 'Austria',
    //   passengersInMillionPerYear: 31,
    //   groups: [1, 2, 3],
    // },
    // {
    //   name: 'Zurich Airport',
    //   country: 'Switzerland',
    //   passengersInMillionPerYear: 31,
    //   groups: [1, 2, 3],
    // },
    // {
    //   name: 'Lisbon Airport',
    //   country: 'Portugal',
    //   passengersInMillionPerYear: 31,
    //   groups: [1, 2, 3],
    // },
    // {
    //   name: 'Copenhagen Airport',
    //   country: 'Denmark',
    //   passengersInMillionPerYear: 30,
    //   groups: [1, 2, 3],
    // },
    // {
    //   name: 'Palma de Mallorca Airport',
    //   country: 'Spain',
    //   groups: [1, 2],
    //   passengersInMillionPerYear: 29,
    // },
    // {
    //   name: 'Milan Airport',
    //   country: 'Italy',
    //   groups: [1, 2],
    //   passengersInMillionPerYear: 28,
    // },
    // {
    //   name: 'Oslo Airport',
    //   country: 'Norway',
    //   groups: [1, 2],
    //   passengersInMillionPerYear: 28,
    // },
    // {
    //   name: 'Brussels Airport',
    //   country: 'Belgium',
    //   groups: [1, 2],
    //   passengersInMillionPerYear: 26,
    // },
    // {
    //   name: 'Stockholm Airport',
    //   country: 'Sweden',
    //   groups: [1, 2],
    //   passengersInMillionPerYear: 25,
    // },
    // {
    //   name: 'Athens Airport',
    //   country: 'Greece',
    //   groups: [1, 2],
    //   passengersInMillionPerYear: 25,
    // },
    // {
    //   name: 'Dusseldorf Airport',
    //   country: 'Germany',
    //   groups: [1, 2],
    //   passengersInMillionPerYear: 25,
    // },
    // {
    //   name: 'Berlin Airport',
    //   country: 'Germany',
    //   groups: [1, 2],
    //   passengersInMillionPerYear: 24,
    // },
    // {
    //   name: 'Helsinki Airport',
    //   country: 'Finland',
    //   groups: [1, 2],
    //   passengersInMillionPerYear: 21,
    // },
    // {
    //   name: 'Saint Petersburg Airport',
    //   country: 'Russia',
    //   groups: [1],
    //   passengersInMillionPerYear: 19,
    // },
    // {
    //   name: 'Warsaw Airport',
    //   country: 'Poland',
    //   groups: [1],
    //   passengersInMillionPerYear: 18,
    // },
    // {
    //   name: 'Prague Airport',
    //   country: 'Czech Republic',
    //   groups: [1],
    //   passengersInMillionPerYear: 17,
    // },
    // {
    //   name: 'Hamburg Airport',
    //   country: 'Germany',
    //   groups: [1],
    //   passengersInMillionPerYear: 17,
    // },
    // {
    //   name: 'Budapest Airport',
    //   country: 'Hungary',
    //   groups: [1],
    //   passengersInMillionPerYear: 16,
    // },
    // 'Amsterdam Airport, Netherlands', // 71
    // 'Frankfurt Airport, Germany',            // 70
    // 'Madrid-Barajas Airport, Spain',                 // 61
    // 'Barcelona Airport, Spain',              // 52
    // 'Istanbul Airport, Turkey',              // 52
    // 'Moscow Airport, Russia',                // 49
    // 'Freising Airport, Germany',             // 47 => it's Munich
    // 'Rome Airport, Italy',                   // 43
    // 'Dublin Airport, Ireland',               // 32
    // 'Vienna Airport, Austria',               // 31
    // 'Zurich Airport, Switzerland',           // 31
    // 'Lisbon Airport, Portugal',              // 31
    // 'Copenhagen Airport, Denmark',           // 30
    // 'Palma de Mallorca Airport, Spain',      // 29
    // 'Milan Airport, Italy',                  // 28
    // 'Oslo Airport, Norway',                  // 28
    // 'Brussels Airport, Belgium',             // 26
    // 'Stockholm Airport, Sweden',             // 25
    // 'Athens Airport, Greece',                // 25
    // 'Dusseldorf Airport, Germany',           // 25
    // 'Berlin Airport, Germany',               // 24
    // 'Helsinki Airport, Finland',             // 21
    // 'Saint Petersburg Airport, Russia',      // 19
    // 'Warsaw Airport, Poland',                // 18
    // 'Prague Airport, Czech Republic',        // 17
    // 'Hamburg Airport, Germany',              // 17
    // 'Budapest Airport, Hungary',             // 16
    // 'Stuttgart Airport, Germany',            // 12
  ];
  let flights = [];
  // function randomDate(start, end) {
  //   return new Date(start.getTime() + 3 * (end.getTime() - start.getTime()));
  // }

  // console.log(randomDate(new Date(2022, 1, 1), new Date(2022, 2, 1)));

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

  // function generateRandomDate() {
  //   return new Date(+new Date() + Math.floor(Math.random() * 10));
  // }

  //   // Calculate milliseconds in a year
  // const minute = 1000 * 60;
  // const hour = minute * 60;
  // const day = hour * 24;
  // const year = day * 365;

  // // Divide Date.now() with a year
  // let years = Math.round(Date.now() / year);

  // console.log(new generateRandomDate().toLocaleDateString('en-EN'));
  // outer loop
  for (let i = 0; i < airports.length; i++) {
    // combine with every other airport
    for (let j = i + 1; j < airports.length; j++) {
      const distance = Math.round(
        (await getGeoData(
          `${airports[i].name}, ${airports[i].country}`,
          `${airports[j].name}, ${airports[j].country}`
        )) / 1000
      );

      const landingAndBoardingTime = 0.5;
      let flightDurationInHours = distance / 800 + landingAndBoardingTime;

      const getFLightPrice =
        15 + Math.floor(Math.random() * (flightDurationInHours * 120));
      // console.log(getFLightPrice);

      function getFlightDuration() {
        const rhours = Math.floor(flightDurationInHours);
        const flightDurationInMinutes = (flightDurationInHours - rhours) * 60;
        const rminutes = Math.round(flightDurationInMinutes);
        return `${rhours} ${rhours === 1 ? 'hour' : 'hours'} and ${rminutes} ${
          rminutes === 1 ? 'minute' : 'minutes'
        }`;
      }

      // console.log( `Hin: ${airports[i]} - ${airports[j]} - ${Math.round(distance/1000)}` )
      // console.log( `Zurueck: ${airports[j]} - ${airports[i]} - ${Math.round(distance/1000)}` )

      // next for loop for a bunch of flights between these two airports
      // TODO: generate some random start date...
      const amountFlights = 3;
      //ITERATION Y DAYS TO ADD 1 DAY EVRY TIME

      for (let x = 0; x < amountFlights; x++) {
        let departureDate = moment().add(x, 'days');
        // console.log(departureDate.toString().slice(0, -12));
        // console.log(typeof departureDate.toString());
        // departureDate.toString().slice(0,-8)
        let departureDate2 = moment()
          .add(x, 'days')
          .add(flightDurationInHours + 1, 'hours');

        flights.push({
          from: airports[i].name,
          to: airports[j].name,
          countryFrom: airports[i].country,
          countryTo: airports[j].country,
          departure: departureDate,
          arrive: addDuration(departureDate, flightDurationInHours * 60),
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
          departure: departureDate2, // https://momentjscom.readthedocs.io/en/latest/moment/03-manipulating/01-add/   add hours?
          arrive: addDuration(departureDate2, flightDurationInHours * 60),
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

  const filteredFlights = flights.filter(
    (element) =>
      element.from !== 'London Airport' && element.to !== 'Paris Airport'
  );
  return filteredFlights.sort((a, b) => a.departure - b.departure);
};

export default getFlightsAPI;

// return flights.filter(
//   (element) =>
//     element.from !== 'London Airport' && element.to !== 'Paris Airport'
// );
