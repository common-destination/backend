import './config.js';
import './db-connect.js';
import mongoose from 'mongoose';
import FlightModel from "./models/flightModel.js";
import flights from "../src/fakeDatas/flights.js"

// clear dummy data
await FlightModel.deleteMany({})

// SEED flights first
const flightsDb = await FlightModel.create(flights);

console.log(flightsDb);

mongoose.connection.close(); // close connection and quit script