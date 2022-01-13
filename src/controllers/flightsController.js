import FlightsModel from '../models/flightsModel.js';

export const readAllFlights = async () => {
  return await FlightsModel.find({});
};

// ALL SORTED FLIGHTS
export const getFlightsSortedByPrice = async () => {
  return await FlightsModel.find({}).sort({ price: 1 });
};

export const readAllSortedFlightsByDeparture = async () => {
  return await FlightsModel.find({}).sort({ departure: 1 });
};

export const readAllSortedFlightsByArrival = async () => {
  return await FlightsModel.find({}).sort({ arrival: 1 });
};

export const readAllSortedFlightsByFlightDuration = async () => {
  return await FlightsModel.find({}).sort({ flightDurationInHours: 1 });
};

export const readAllSortedFlightsByFlightFrom = async () => {
  return await FlightsModel.find({}).sort({ from: 1 });
};

export const readAllSortedFlightsByFlightTo = async () => {
  return await FlightsModel.find({}).sort({ to: 1 });
};

// ALL FILTERED FLIGHTS
