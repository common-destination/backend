import "../config.js";
import express from "express";
import * as flightsController from "../controllers/flightsController.js";
const flightsRouter = express.Router();

// DEPARTURE AIRPORT
flightsRouter.get("/departure-airport/:airport", async (req, res) => {
  const airport = req.params.airport;
  const flights = await flightsController.getFilteredByDepartureAirport(
    airport
  );
  res.json(flights);
});

// ARRIVAL AIRPORT
flightsRouter.get("/arrival-airport/:airport", async (req, res) => {
  const airport = req.params.airport;
  const flights = await flightsController.getFilteredByArrivalAirport(airport);
  res.json(flights);
});

// DEPARTURE COUNTRY
flightsRouter.get("/departure-country/:country", async (req, res) => {
  const country = req.params.country;
  const flights = await flightsController.getFilteredByDepartureCountry(
    country
  );
  res.json(flights);
});

// ARRIVAL COUNTRY
flightsRouter.get("/arrival-country/:country", async (req, res) => {
  const country = req.params.country;
  const flights = await flightsController.getFilteredByArrivalCountry(country);
  res.json(flights);
});

// DEPARTURE DATE
flightsRouter.get("/departure-date/:departure", async (req, res) => {
  const departure = req.params.departure;
  const flights = await flightsController.getAllFlights();
  const filteredByDepartureDate = flights.filter(
    (elem) => elem.departure.slice(0, -6) === departure
  );
  res.json(filteredByDepartureDate);
});

// DEPARTURE => AIRPORT FROM => START => END
flightsRouter.get("/departure/:airport/:date/:start/:end", async (req, res) => {
  const airport = req.params.airport;
  const date = req.params.date;
  const start = req.params.start;
  const end = req.params.end;
  const flights = await flightsController.getAllFlights();
  const filteredByDepartureHour = flights.filter(
    (elem) =>
      elem.from === airport &&
      elem.arrival.slice(0, -6) === date &&
      elem.departure.slice(-5) >= start &&
      elem.departure.slice(-5) <= end
  );
  res.json(filteredByDepartureHour);
  console.log(filteredByDepartureHour);
});

// ARRIVAL => AIRPORT FROM => START => END
flightsRouter.get("/arrival/:airport/:date/:start/:end", async (req, res) => {
  const airport = req.params.airport;
  const start = req.params.start;
  const end = req.params.end;
  const date = req.params.date;
  const flights = await flightsController.getAllFlights();
  const filteredByDepartureHour = flights.filter(
    (elem) =>
      elem.from === airport &&
      elem.arrival.slice(0, -6) === date &&
      elem.arrival.slice(-5) >= start &&
      elem.arrival.slice(-5) <= end
  );
  res.json(filteredByDepartureHour);
  console.log(filteredByDepartureHour);
});

// ARRIVAL DATE
flightsRouter.get("/arrival-date/:arrival", async (req, res) => {
  const arrival = req.params.arrival;
  const flights = await flightsController.getAllFlights();
  const filteredByArrival = flights.filter(
    (elem) => elem.arrival.slice(0, -6) === arrival
  );
  res.json(filteredByArrival);
});

// FLIGHT DISTANCE
flightsRouter.get("/flight-distance", async (req, res) => {
  const distance = req.params.flightDurationInHours;
  const flights = await flightsController.getAllFlights();
  const sortedByDistance = flights
    .filter((elem) => elem.flightDurationInHours)
    .sort((min, max) => min.flightDurationInHours - max.flightDurationInHours);
  res.json(sortedByDistance);
});

// FLIGHT DURATION
flightsRouter.get("/flight-duration", async (req, res) => {
  const duration = req.params.flightDurationInHours;
  const flights = await flightsController.getAllFlights();
  const sortedByDuration = flights
    .filter((elem) => elem.flightDurationInHours)
    .sort((min, max) => min.flightDurationInHours - max.flightDurationInHours);
  res.json(sortedByDuration);
});

// MAX-PRICE
flightsRouter.get("/max-price/:price", async (req, res) => {
  const price = req.params.price;
  const flights = await flightsController.getAllFlights();
  const filteredByMaxPrice = flights
    .filter((elem) => elem.price <= price)
    .sort((min, max) => min.price - max.price);
  res.json(filteredByMaxPrice);
});

// GET ALL FLIGHTS
flightsRouter.get("/", async (_req, res) => {
  const flights = await flightsController.getAllFlights();
  res.json(flights);
});

export { flightsRouter };
