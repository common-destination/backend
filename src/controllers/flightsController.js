import FlightsModel from '../models/flightsModel.js';

export const readAllFlights = async () => {
  return await FlightsModel.find({});
};

// ALL SORTED FLIGHTS
export const readAllSortedFlightsPerPrice = async () => {
  return await FlightsModel.find({}).sort({ price: 1 });
};

export const readAllSortedFlightsPerDeparture = async () => {
  return await FlightsModel.find({}).sort({ departure: 1 });
};

export const readAllSortedFlightsPerArrival = async () => {
  return await FlightsModel.find({}).sort({ arrive: 1 });
};

export const readAllSortedFlightsPerFlightDuration = async () => {
  return await FlightsModel.find({}).sort({ flightDurationInHours: 1 });
};

export const readAllSortedFlightsPerFlightFrom = async () => {
  return await FlightsModel.find({}).sort({ from: 1 });
};

export const readAllSortedFlightsPerFlightTo = async () => {
  return await FlightsModel.find({}).sort({ to: 1 });
};

// ALL FILTERED FLIGHTS
