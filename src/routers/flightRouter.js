import '../config.js';
import express from 'express';
import * as flightController from '../controllers/flightController.js';

const flightRouter = express.Router();

// READ ALL
flightRouter.get('/', async (_req, res) => {
  const flights = await flightController.readAllFlights();
  res.json(flights);
});
flightRouter.get('/date', async (_req, res) => {
  const flights = await flightController.readAllFlightsSortDate();
  res.json(flights);
});

export { flightRouter };
