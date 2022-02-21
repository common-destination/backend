import "../config.js";
import express from "express";
import moment from "moment";
import * as commonDestinationsController from "../controllers/commonDestinationController.js";
import { CommonDestinationsBuilder } from "../classes/commonDestinationsBuilder.js";

const commonDestinationsRouter = express.Router();

//COMPATIBLE FLIGHTS FOR EVERY PASSENGER

commonDestinationsRouter.get("/compatible-flights", async (req, res) => {
  const passengers = [
    {
      id: "1",
      airport: "London",
      minOutboundDate: moment("2022-02-01 08:02"),
      maxReturnDate: moment("2022-02-04 08:02"),
    },
    {
      id: "2",
      airport: "Hamburg",
      minOutboundDate: moment("2022-02-01 08:02"),
      maxReturnDate: moment("2022-02-04 08:02"),
    },
  ];
  const flights = await commonDestinationsController.compatibleFlights(
    passengers
  );
  res.json(flights);
});

//GET COMMON DESTINATION D

commonDestinationsRouter.post("/passengers-data", async (req, res) => {
  let passengers = req.body.passengers;
  let stayTimeTogether = req.body.stayTimeTogether;
  req.session.passengers = passengers;
  req.session.stayTimeTogether = stayTimeTogether;
  req.session.save();

  res.json({ passengers, stayTimeTogether });
});

commonDestinationsRouter.get("/two", async (req, res) => {
  // let passengers = req.session.passengers;
  // let minStayTimeTogether = req.session.minStayTimeTogether;
  // console.log({ passengers, minStayTimeTogether });
  const passengers = [
    {
      id: "1",
      airport: "Amsterdam",
      minOutboundDate: "2022-03-15T23:00:00.000Z",
      maxReturnDate: "2022-03-24T23:00:00.000Z",
    },
    {
      id: "2",
      airport: "Frankfurt",
      minOutboundDate: "2022-03-15T23:00:00.000Z",
      maxReturnDate: "2022-03-24T23:00:00.000Z",
    },
    {
      id: "3",
      airport: "London",
      minOutboundDate: "2022-03-15T23:00:00.000Z",
      maxReturnDate: "2022-03-23T23:00:00.000Z",
    },
  ];
  let minStayTimeTogether = 100;
  const individualCompatibleFlights =
    await commonDestinationsController.individualCompatibleFlights(
      passengers,
      minStayTimeTogether
    );
  // let passengerFlights = [];

  let commonDestinations = [];
  const compareFlights = (currentIndex, currentAirport = null) => {
    const flights1 = individualCompatibleFlights[currentIndex];
    const flights2 = individualCompatibleFlights[currentIndex + 1];
    const atEnd = individualCompatibleFlights.length - currentIndex === 2;
    const flightsAreCompatible = (currentAirport, flightA, flightB) => {
      return (
        (currentAirport === null ||
          flightA.outboundFlight.to === currentAirport) &&
        flightA.outboundFlight.to === flightB.outboundFlight.to &&
        commonDestinationsController.getTimeTogether(
          [flightA.outboundFlight.arrival, flightB.outboundFlight.arrival],
          [flightA.returnFlight.departure, flightB.returnFlight.departure]
        ) >= minStayTimeTogether
      );
    };

    if (!atEnd) {
      flights1.forEach((flightA) => {
        flights2.forEach((flightB) => {
          if (flightsAreCompatible(currentAirport, flightA, flightB)) {
            compareFlights(currentIndex + 1, flightA.outboundFlight.to);
          }
        });
      });
    } else {
      flights1.forEach((flightA) => {
        flights2.forEach((flightB) => {
          if (flightsAreCompatible(currentAirport, flightA, flightB)) {
            commonDestinations.push({
              airport: flightA.outboundFlight.to,
              passengerFlights: [flightA, flightB],
              howManyTimeTogether: 33,
              groupPrice: 2200,
            });
          }
        });
      });
    }
  };

  compareFlights(0);

  res.json(commonDestinations.length > 0 ? commonDestinations : "");
});

commonDestinationsRouter.get("/", async (req, res) => {
  let passengers = req.session.passengers;
  let stayTimeTogether = req.session.stayTimeTogether;
  console.log(passengers)

  // const passengers = [
  //   {
  //     id: "1",
  //     airport: "Amsterdam",
  //     minOutboundDate: "2022-03-15T23:00:00.000Z",
  //     maxReturnDate: "2022-03-24T23:00:00.000Z",
  //   },
  //   {
  //     id: "2",
  //     airport: "Frankfurt",
  //     minOutboundDate: "2022-03-15T23:00:00.000Z",
  //     maxReturnDate: "2022-03-24T23:00:00.000Z",
  //   },
  //   {
  //     id: "3",
  //     airport: "London",
  //     minOutboundDate: "2022-03-15T23:00:00.000Z",
  //     maxReturnDate: "2022-03-23T23:00:00.000Z",
  //   },
  // ];
  // let minStayTimeTogether = 10;
  const individualCompatibleTrips =
    await commonDestinationsController.individualCompatibleFlights(
      passengers,
      stayTimeTogether
    );
  const commonDestinationsBuilder = new CommonDestinationsBuilder(
    commonDestinationsController,
    individualCompatibleTrips,
    passengers,
    stayTimeTogether
  );
  const commonDestinations = commonDestinationsBuilder.calculate();
  res.json(commonDestinations.length > 0 ? commonDestinations : "");
});

export { commonDestinationsRouter };
