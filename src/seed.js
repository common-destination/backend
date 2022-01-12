import "./config.js";
import "./db-connect.js";
import mongoose from "mongoose";
import FlightModel from "./models/flightModel.js";

// import flights from "../src/fakeDatas/flights.js"
import getFlightsAPI from "./APIGenerator/api.js"

// clear dummy data
// await FlightModel.deleteMany({})

// SEED flights first
const flightsDb = await FlightModel.create(await getFlightsAPI());
// const flightsDb = await FlightModel.create(flights);

// const flightsDb = await FlightModel.create(flights);
console.log(flightsDb);

mongoose.connection.close(); // close connection and quit script
