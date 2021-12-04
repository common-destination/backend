import './config.js';
import './db-connect.js';
import express from 'express';
import cors from 'cors';
import { flightRouter } from './routers/flightRouter.js';

const app = express();
const port = process.env.PORT;

//TEST



app.use(cors());
app.use(express.json());


app.use('/', flightRouter, (req, res) => {
  res.status(404).send({
    message: "404 page not found",
    url: req.originalUrl,
  });
});
app.listen(port, () => console.log(`http://localhost:${port}`));

