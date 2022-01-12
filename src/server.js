import "./config.js";
import "./db-connect.js";
import express from "express";
import cors from "cors";
import { flightsRouter } from "./routers/flightsRouter.js";
import { usersRouter } from "./routers/usersRouter.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter, (req, res) => {
  res.status(404).send({
    message: "404 page not found",
    url: req.originalUrl,
  });
});

app.use("/flights", flightsRouter, (req, res) => {
  res.status(404).send({
    message: "404 page not found",
    url: req.originalUrl,
  });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
