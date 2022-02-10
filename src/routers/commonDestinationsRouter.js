import "../config.js";
import express from "express";
import moment from "moment";
import * as commonDestinationsController from "../controllers/commonDestinationController.js";

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
  let stayTimeTogether = req.body.stayTimeTogether;
  req.session.passengers = passengers;
  req.session.stayTimeTogether = stayTimeTogether;
  req.session.save();

  res.json({ passengers, stayTimeTogether });
});

commonDestinationsRouter.get("/", async (req, res) => {
  // let passengers = req.session.passengers;
  // let stayTimeTogether = req.session.stayTimeTogether;
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
  let stayTimeTogether = 1;
  const individualCompatibleFlights =
    await commonDestinationsController.individualCompatibleFlights(passengers);
  let commonDestinations = [];

  const compareFlights = (currentIndex, currentAirport = null) => {
    const flights1 = individualCompatibleFlights[currentIndex];
    const flights2 = individualCompatibleFlights[currentIndex + 1];
    const atEnd = individualCompatibleFlights.length - currentIndex === 2;

    const flightsAreCompatible = (currentAirport, flight1, flight2) => {
      return (
        (currentAirport === null ||
          flight1.outboundFlight.to === currentAirport) &&
        flight1.outboundFlight.to === flight2.outboundFlight.to &&
        commonDestinationsController.getTimeTogether(
          [flight1.outboundFlight.arrival, flight2.outboundFlight.arrival],
          [flight1.returnFlight.departure, flight2.returnFlight.departure]
        ) >= stayTimeTogether
      );
    };

    if (!atEnd) {
      flights1.forEach((flight1) => {
        flights2.forEach((flight2) => {
          if (flightsAreCompatible(currentAirport, flight1, flight2)) {
            compareFlights(currentIndex + 1, flight1.outboundFlight.to);
          }
        });
      });
    } else {
      flights1.forEach((flight1) => {
        flights2.forEach((flight2) => {
          if (flightsAreCompatible(currentAirport, flight1, flight2)) {
            commonDestinations.push({
              airport: flight1.outboundFlight.to,
              passengerFlights: [flight1, flight2],
            });
          }
        });
      });
    }
  };

  compareFlights(0);

  // individualCompatibleFlights[0].forEach((firstPassengerFlight,index) => {

  //   individualCompatibleFlights[1].forEach((secondPassengerFlight) => {
  //     if (
  //       firstPassengerFlight.outboundFlight.to ===
  //         secondPassengerFlight.outboundFlight.to &&
  //       commonDestinationsController.getTimeTogether(
  //         [
  //           firstPassengerFlight.outboundFlight.arrival,
  //           secondPassengerFlight.outboundFlight.arrival,
  //         ],
  //         [
  //           firstPassengerFlight.returnFlight.departure,
  //           secondPassengerFlight.returnFlight.departure,
  //         ]
  //       ) >= stayTimeTogether
  //     ) {
  //       const commonDestination = {
  //         airport: firstPassengerFlight.outboundFlight.to,
  //         passengerFlights: [firstPassengerFlight, secondPassengerFlight],
  //       };
  //       commonDestinations.push(commonDestination);
  //     }
  //   });
  // });

  // console.log({ passengers });
  // console.log({ stayTimeTogether });
  // console.log({ individualCompatibleFlights });

  res.json(commonDestinations);
  // res.json(individualCompatibleFlights);
});

export { commonDestinationsRouter };

// [
//   {
//     airport: "paris",
//     passengerFlights: [
//       {
//         id: "1",
//         outbound: {
//           departure: "3333",
//           airport: "22222",
//         },
//         return: {
//           departure: "3333",
//           airport: "22222",
//         },
//         totalrice: 33333,
//         stayTime: 2,
//       },
//       {
//         id: "2",
//         outbound: {
//           departure: "3333",
//           airport: "22222",
//         },
//         return: {
//           departure: "3333",
//           airport: "22222",
//         },
//         totalrice: 33333,
//         stayTime: 2,
//       },
//       {
//         id: "3",
//         outbound: {
//           departure: "3333",
//           airport: "22222",
//         },
//         return: {
//           departure: "3333",
//           airport: "22222",
//         },
//         totalrice: 33333,
//         stayTime: 2,
//       },
//     ],
//   },
