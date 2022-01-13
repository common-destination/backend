import "../config.js";
import express from "express";
import * as flightsController from "../controllers/flightsController.js";

const flightsRouter = express.Router();

// SORTED BY ASCENDING PRICE
flightsRouter.get("/price", async (_req, res) => {
  const flights = await flightsController.getFlightsSortedByPrice();
  res.json(flights);
});

// READ ALL
flightsRouter.get("/", async (_req, res) => {
  const flights = await flightsController.readAllFlights();
  res.json(flights);
});
export { flightsRouter };
