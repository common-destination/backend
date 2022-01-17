import geoCoder from "node-open-geocoder";
import { getDistance } from "geolib";
import moment from "moment";
import { airports } from "../data/airports.js";

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

const getFlightsAPI = async () => {
  let flights = [];

  // function addDuration(date, m) {
  //   date = new Date(date);
  //   const newDate = date.setTime(date.getTime() + m * 1000 * 60);
  //   return newDate;
  // }

  const flightsConditions = (fromRange, toRange, day, season) => {
    if (
      season === "May" ||
      season === "June" ||
      season === "July" ||
      season === "August" ||
      season === "September"
    ) {
      return day + 0.5;
    }

    return (
      toRange + fromRange >= 9 && day >= Math.round(Math.random() * (0 + 10))
    );
  };

  const dayOfWeek = (dailydate) => {
    let dayInNum = dailydate.isoWeekday();
    if (dayInNum === 1) return "Monday";
    if (dayInNum === 2) return "Tuesday";
    if (dayInNum === 3) return "Wednesday";
    if (dayInNum === 4) return "Thursday";
    if (dayInNum === 5) return "Friday";
    if (dayInNum === 6) return "Saturday";
    if (dayInNum === 7) return "Sunday";
  };

  const Month = (dailydate) => {
    let monthInNum = moment(dailydate).format("M");
    if (monthInNum === "1") return "January";
    if (monthInNum === "2") return "February";
    if (monthInNum === "3") return "March";
    if (monthInNum === "4") return "April";
    if (monthInNum === "5") return "May";
    if (monthInNum === "6") return "June";
    if (monthInNum === "7") return "July";
    if (monthInNum === "8") return "August";
    if (monthInNum === "9") return "September";
    if (monthInNum === "10") return "October";
    if (monthInNum === "11") return "November";
    if (monthInNum === "12") return "December";
  };

  const purchasingSeason = (dailydate) => {
    let monthInNum = moment(dailydate).format("M");
    if (monthInNum === "1") return 1;
    if (monthInNum === "2") return 1;
    if (monthInNum === "3") return 1;
    if (monthInNum === "4") return 10;
    if (monthInNum === "5") return 15;
    if (monthInNum === "6") return 20;
    if (monthInNum === "7") return 30;
    if (monthInNum === "8") return 40;
    if (monthInNum === "9") return 25;
    if (monthInNum === "10") return 10;
    if (monthInNum === "11") return 5;
    if (monthInNum === "12") return 35;
  };

  // outer loop
  for (let i = 0; i < airports.length; i++) {
    // combine with every other airport
    for (let j = i + 1; j < airports.length; j++) {
      const distance = Math.round(
        (await getGeoData(
          `${airports[i].name} Airport, ${airports[i].country}`,
          `${airports[j].name} Airport, ${airports[j].country}`
        )) / 1000
      );

      const landingAndBoardingTime = 0.5;
      let flightDurationInHours = distance / 800 + landingAndBoardingTime;

      const arrival = (departureDate) => {
        return departureDate
          .add(flightDurationInHours, "hours")
          // .format("YYYY-MM-DD HH:mm");
      };

      const getFLightPrice = (percentage) => {
        return (
          15 +
          Math.floor(Math.random() * (flightDurationInHours * 120)) +
          100 / percentage
        );
      };

      function getFlightDuration() {
        const rhours = Math.floor(flightDurationInHours);
        const flightDurationInMinutes = (flightDurationInHours - rhours) * 60;
        const rminutes = Math.round(flightDurationInMinutes);
        return `${rhours} ${rhours === 1 ? "hour" : "hours"} and ${rminutes} ${
          rminutes === 1 ? "minute" : "minutes"
        }`;
      }

      // HOW MANY DAYS OF FLIGHTS
      const amountFlights = 10;

      //ITERATION X DAYS TO ADD 1 DAY EVRY TIME
      // let tomorrowDate = moment("2022-01-16 05:00:00");

      for (let x = 0; x < amountFlights; x++) {
        const departureDate1 = moment("2022-01-16 05:00:00")
          .add(x, "days")
          .add(Math.round(Math.random() * (0 + 15)), "hours");

        let arrival1 = arrival(departureDate1);

        let departureDate2 = arrival1.add(1, "hours");

        let arrival2 = arrival(departureDate2);


        if (
          !flightsConditions(
            airports[i].range,
            airports[j].range,
            departureDate1.isoWeekday(),
            Month(departureDate1)
          )
        ) {
          continue;
        }

        //first flight

        flights.push({
          from: airports[i].name,
          to: airports[j].name,
          countryFrom: airports[i].country,
          countryTo: airports[j].country,
          departure: departureDate1.format("YYYY-MM-DD HH:mm"),
          arrival: arrival(departureDate1),
          day: dayOfWeek(departureDate1),
          month: Month(departureDate1),
          distance: `${distance} km`,
          flightDuration: getFlightDuration(),
          flightDurationInHours,
          price: getFLightPrice(purchasingSeason(departureDate1)),
        });

        //second flight

        flights.push({
          from: airports[j].name,
          to: airports[i].name,
          countryFrom: airports[j].country,
          countryTo: airports[i].country,
          departure: departureDate2.format("YYYY-MM-DD HH:mm"),
          arrival: arrival2.format("YYYY-MM-DD HH:mm"),
          day: dayOfWeek(departureDate2),
          month: Month(departureDate2),
          distance: `${distance} km`,
          flightDuration: getFlightDuration(),
          flightDurationInHours,
          price: getFLightPrice(purchasingSeason(departureDate2)),
        });
      }
    }
  }
  return flights;
};

export default getFlightsAPI;
