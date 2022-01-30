import FlightsModel from "../models/flightsModel.js";
import moment from "moment";

// GET ALL FLIGHTS
export const getAllFlights = async () => {
  return await FlightsModel.find({});
};

// FILTER BY PROPERTY

export const filterByProperty = async (property, value) => {
  return await FlightsModel.find({ [property]: value });
};

//SORT BY PROPERTY

export const sortByProperty = async (property, order) => {
  return await FlightsModel.find({}).sort({ [property]: order });
};

// COMMON DESTINATION SEARCH

//COMPATIBLE FLIGHTS FOR EVERY PASSENGER

export const filteredFlights = async (passengers) => {
  let compatibleFlights = [];

  const flights = await FlightsModel.find({});

  // all compatible departure and return oneway flights per passenger
  passengers.map((passenger) => {
    let departureFlights = [];
    let returnFlights = [];

    flights.map((flight) => {
      flight.passengerId = passenger.id;
      const departureFlightConditions =
        flight.from === passenger.airport &&
        moment(flight.departure) >= passenger.minDepartureDate &&
        moment(flight.departure) < passenger.maxReturnDate;
      const returnFlightConditions =
        flight.to === passenger.airport &&
        moment(flight.arrival) <= passenger.maxReturnDate &&
        moment(flight.arrival) > passenger.minDepartureDate;

      if (departureFlightConditions) return departureFlights.push(flight);
      if (returnFlightConditions) return returnFlights.push(flight);
    });

    let passangerBestFlights = [{departureFlights},{returnFlights}];

    return compatibleFlights.push(passangerBestFlights);
    //conditions between departure and return flights too find a roundtrip for each passenger
    //   [...departureFlights, ...returnFlights].filter((element) => {
    //     moment(element.departureFlights.departure) <
    //       moment(element.returnFlights.departure);
    //   });
  });

  // compatibleFlights.filter((element) => {
  //   element[0].;
  // });

  return compatibleFlights;
};

// FIND COMMON DESTINATION
export const findCommonDestination = async (passengers) => {
  const obj = filteredFlights().reduce((acc, flight) => {
    if (acc[flight.airportTo]) {
      acc[flight.airportTo]++;
    } else {
      acc[flight.airportTo] = 1;
    }
    return acc;
  }, {});

  const result = {};
  let besteAirports = [];
  console.log(obj);
  Object.entries(obj).forEach((m) => {
    if (m[1] === passengers.length) {
      besteAirports.push(m[0]);
    }
  });
  besteAirports.forEach((airport) => {
    const filteredPassengersOnFlights = filteredFlights().filter(
      (flight) => flight.airportTo === airport
    );
    const passengersOnFlights = filteredPassengersOnFlights.map(
      (flight) => flight.id
    );
    let includeInResult = true;
    for (const passenger of passengers) {
      if (!passengersOnFlights.includes(passenger.id)) {
        includeInResult = false;
      }
    }
    if (includeInResult) {
      result[airport] = filteredPassengersOnFlights;
    }
  });
  return result;
};
