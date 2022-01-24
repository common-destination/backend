import FlightsModel from "../models/flightsModel.js";

// GET ALL FLIGHTS
export const getAllFlights = async () => {
  return await FlightsModel.find({});
};

// GET ALL AIRPORTS
export const getAllAirports = async () => {
  return await FlightsModel.find({});
};

// DEPARTURE AIRPORT
export const getFilteredByDepartureAirport = async (airport) => {
  return await FlightsModel.find({ from: airport });
};

// ARRIVAL AIRPORT
export const getFilteredByArrivalAirport = async (airport) => {
  return await FlightsModel.find({ to: airport });
};

// DEPARTURE COUNTRIES
export const getFilteredByDepartureCountry = async (country) => {
  return await FlightsModel.find({ countryFrom: country });
};

// ARRIVAL COUNTRIES
export const getFilteredByArrivalCountry = async (country) => {
  return await FlightsModel.find({ countryTo: country });
};

//SORT BY DEPARTURE-DATE

export const getSortByDeparturedate = async (num) => {
  return await FlightsModel.find({}).sort({ departure: num });
};
