import "./config.js";
import "./db-connect.js";
import mongoose from "mongoose";
import FlightsModel from "./models/flightsModel.js";

import getFlightsAPI from "./APIGenerator/api.js"

// clear dummy data
await FlightsModel.deleteMany({})

// SEED flights first
const flightsDb = await FlightsModel.create(await getFlightsAPI());

console.log(flightsDb);

mongoose.connection.close(); // close connection and quit script
