import FlightModel from "../models/flightModel.js";



export const readAllFlights = async () => {
  return await FlightModel.find({});
};
