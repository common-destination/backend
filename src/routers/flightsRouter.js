import '../config.js';
import express from 'express';
import * as flightsController from '../controllers/flightsController.js';

const flightsRouter = express.Router();

// READ ALL
flightsRouter.get('/', async (_req, res) => {
  const flights = await flightsController.readAllFlights();
  res.json(flights);
});
flightsRouter.get('/date', async (_req, res) => {
  const flights = await flightsController.readAllFlightsSortDate();
  res.json(flights);
});

export { flightsRouter };
