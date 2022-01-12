import FlightModel from "../models/flightModel.js";

export const readAllFlights = async () => {
  return await FlightModel.find({});
};

// ALL SORTED FLIGHTS
export const readAllSortedFlightsPerPrice = async () => {
  return await FlightModel.find({}).sort({ price: -1 });
};

export const readAllSortedFlightsPerDeparture = async () => {
  return await FlightModel.find({}).sort({ departure: 1 });
};

export const readAllSortedFlightsPerArrival = async () => {
  return await FlightModel.find({}).sort({ arrive: 1 });
};

export const readAllSortedFlightsPerFlightDuration = async () => {
  return await FlightModel.find({}).sort({ flightDurationInHours: 1 });
};

export const readAllSortedFlightsPerFlightFrom = async () => {
  return await FlightModel.find({}).sort({ from: 1 });
};

export const readAllSortedFlightsPerFlightTo = async () => {
  return await FlightModel.find({}).sort({ to: 1 });
};

// ALL FILTERED FLIGHTS
export const readAllFilteredFlightsPerPriceLevel = async () => {
  return await FlightModel.find({ flightDurationInHours: { $lte: 2 } });
};
