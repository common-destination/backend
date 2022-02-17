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
      id: "passenger2",
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
  let minStayTimeTogether = req.body.minStayTimeTogether;
  req.session.passengers = passengers;
  req.session.minStayTimeTogether = minStayTimeTogether;
  req.session.save();

  res.json({ passengers, minStayTimeTogether });
});

commonDestinationsRouter.get("/", async (req, res) => {
  // let passengers = req.session.passengers;
  // let minStayTimeTogether = req.session.minStayTimeTogether;
  const passengers = [
    {
      id: "1",
      airport: "Barcelona",
      minOutboundDate: "2022-02-08T23:00:00.000Z",
      maxReturnDate: "2022-02-14T23:00:00.000Z",
    },
    {
      id: "2",
      airport: "Amsterdam",
      minOutboundDate: "2022-02-08T23:00:00.000Z",
      maxReturnDate: "2022-02-14T23:00:00.000Z",
    },
    {
      id: "3",
      airport: "London",
      minOutboundDate: "2022-02-08T23:00:00.000Z",
      maxReturnDate: "2022-02-13T23:00:00.000Z",
    },
  ];
  let minStayTimeTogether = 10;
  const individualCompatibleFlights =
    await commonDestinationsController.individualCompatibleFlights(passengers);
  const commonDestinationsBuilder = new CommonDestinationsBuilder(
    commonDestinationsController,
    individualCompatibleFlights,
    passengers,
    minStayTimeTogether
  );
  const commonDestinations = commonDestinationsBuilder.calculate();
  const debug = commonDestinationsBuilder.debug();
  console.log(debug);
  res.json(debug);
  // res.json(commonDestinations);
});

commonDestinationsRouter.get("/two", async (req, res) => {
  // let passengers = req.session.passengers;
  // let minStayTimeTogether = req.session.minStayTimeTogether;
  // console.log({ passengers, minStayTimeTogether });
  const passengers = [
    {
      id: "1",
      airport: "Barcelona",
      minOutboundDate: "2022-02-08T23:00:00.000Z",
      maxReturnDate: "2022-02-14T23:00:00.000Z",
    },
    {
      id: "2",
      airport: "Amsterdam",
      minOutboundDate: "2022-02-08T23:00:00.000Z",
      maxReturnDate: "2022-02-14T23:00:00.000Z",
    },
    {
      id: "3",
      airport: "London",
      minOutboundDate: "2022-02-08T23:00:00.000Z",
      maxReturnDate: "2022-02-13T23:00:00.000Z",
    },
  ];
  let minStayTimeTogether = 25;
  const individualCompatibleFlights =
    await commonDestinationsController.individualCompatibleFlights(passengers);
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
            // console.log(passengerFlights);
            // const outbounds = passengerFlights.map(
            //   (flight) => flight.outboundFlight.arrival
            // );
            // const returns = passengerFlights.map(
            //   (flight) => flight.returnFlight.departure
            // );
            // if (outbounds.length > 0 && returns.length > 0) {
            //   const earliestReturn = moment(
            //     returns.reduce((a, b) => Math.min(moment(a), moment(b)))
            //   );
            //   const lastestOutbound = moment(
            //     outbounds.reduce((a, b) => Math.max(moment(b), moment(a)))
            //   );

            //   const howManyTimeTogether = moment(earliestReturn).diff(
            //     moment(lastestOutbound),
            //     "hours"
            //   );
            // console.log(howManyTimeTogether)
            // if (howManyTimeTogether >= minStayTimeTogether) {
            commonDestinations.push({
              airport: currentAirport,
              passengerFlights: [flightA, flightB],
              howManyTimeTogether: 33,
              groupPrice: 2200,
            });
            // }
            // }
          }
        });
      });
    }
  };

  compareFlights(0);

  res.json(commonDestinations);
});

export { commonDestinationsRouter };
