import geoCoder from "node-open-geocoder";
import { getDistance } from "geolib";
import moment from "moment";
import { airports } from "../data/airports.js";
import * as functions from "./functions.js";

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
      const averageFlightSpeed = 800;
      const flightDurationInHours =
        distance / averageFlightSpeed + landingAndBoardingTime;

      // HOW MANY DAYS OF FLIGHTS
      const amountFlights = 7;

      //ITERATION X DAYS TO ADD 1 DAY EVRY TIME
      // let tomorrowDate = moment("2022-01-16 05:00:00");

      for (let x = 0; x < amountFlights; x++) {
        const departureDate1 = moment("2022-01-16 05:00:00")
          .add(x, "days")
          .add(Math.round(Math.random() * (0 + 15)), "hours");

        if (
          !functions.flightsConditions(
            airports[i].range,
            airports[j].range,
            departureDate1.isoWeekday(),
            functions.Month(departureDate1)
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
          arrival: functions
            .arrival(departureDate1, flightDurationInHours)
            .format("YYYY-MM-DD HH:mm"),
          day: functions.dayOfWeek(departureDate1),
          month: functions.Month(departureDate1),
          distance: `${distance} km`,
          flightDuration: functions.getFlightDuration(flightDurationInHours),
          flightDurationInHours,
          price: functions.getFLightPrice(
            functions.purchasingSeason(departureDate1),
            flightDurationInHours
          ),
        });

        //second flight

        flights.push({
          from: airports[j].name,
          to: airports[i].name,
          countryFrom: airports[j].country,
          countryTo: airports[i].country,
          departure: functions
            .departureDate2(departureDate1, 1)
            .format("YYYY-MM-DD HH:mm"),
          arrival: functions
            .arrival(
              functions.departureDate2(departureDate1, 0),
              flightDurationInHours
            )
            .format("YYYY-MM-DD HH:mm"),
          day: functions.dayOfWeek(
            functions.departureDate2(
              functions.arrival(departureDate1, flightDurationInHours)
            )
          ),
          month: functions.Month(
            functions.departureDate2(
              functions.arrival(departureDate1, flightDurationInHours)
            )
          ),
          distance: `${distance} km`,
          flightDuration: functions.getFlightDuration(flightDurationInHours),
          flightDurationInHours,
          price: functions.getFLightPrice(
            functions.purchasingSeason(
              functions.departureDate2(
                functions.arrival(departureDate1, flightDurationInHours)
              )
            ),
            flightDurationInHours
          ),
        });
      }
    }
  }
  return flights;
};

export default getFlightsAPI;
