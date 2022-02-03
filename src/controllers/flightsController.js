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

export const compatibleFlights = async (passengers) => {
  let compatibleFlights = [];
  const flights = await FlightsModel.find({});

  // all compatible departure and return oneway flights per passenger
  passengers.map((passenger) => {
    let outboundFlights = [];
    let returnFlights = [];

    flights.map((flight) => {
      const departureFlightConditions =
        flight.from === passenger.airport &&
        moment(flight.departure) >= passenger.minDepartureDate &&
        moment(flight.departure) < passenger.maxReturnDate;

      const returnFlightConditions =
        flight.to === passenger.airport &&
        moment(flight.arrival) <= passenger.maxReturnDate &&
        moment(flight.arrival) > passenger.minDepartureDate;

      if (departureFlightConditions) return outboundFlights.push(flight);
      if (returnFlightConditions) return returnFlights.push(flight);
    });

    // CREATE ROUNDTRIPS FLIGHTS FOR EACH PASSENGER
    let roundTrips = [];

    outboundFlights.forEach((outboundFlight, outboundFlightIndex) => {
      returnFlights.forEach((returnFlight, returnIndex) => {
        if (
          moment(returnFlight.departure) >= moment(outboundFlight.departure) &&
          outboundFlight.to === returnFlight.from
        ) {
          const stayTime = moment(returnFlight.arrival).diff(
            moment(outboundFlight.departure),
            "hours"
          );

          // CREATE ROUNDTRIP FLIGHT
          const roundTrip = {
            _id: `${passenger.name}.${outboundFlightIndex}${returnIndex}`,
            passengerName: passenger.name,
            outboundFlight: outboundFlight,
            returnFlight: returnFlight,
            totalPrice: outboundFlight.price + returnFlight.price,
            stayTime: stayTime,
          };
          roundTrips.push(roundTrip);
        }
      });
    });
    return compatibleFlights.push(roundTrips);
  });

  // compatibleFlights.map(compatibleFlight => compatibleFlight.filter(element => element.outboundFlight.departure ))

  return compatibleFlights;
};

// FIND COMMON DESTINATION
export const findCommonDestinations = async (passengers) => {
  let compatibleFlightsForEachPassenger = await compatibleFlights(passengers);
  // console.log(compatibleFlightsForEachPassenger);
  const obj = compatibleFlightsForEachPassenger.map((compatibleFlight) => {
    return compatibleFlight.reduce((acc, flight) => {
      // console.log(flight.outboundFlight.to);
      if (acc[flight.outboundFlight.to]) {
        acc[flight.outboundFlight.to]++;
      } else {
        acc[flight.outboundFlight.to] = 1;
      }
      return acc;
    }, {});
  });
  console.log(obj);
  const result = {};
  let besteAirports = [];
  Object.entries(...obj).forEach((m) => {
    if (m[1] === passengers.length) {
      besteAirports.push(m[0]);
    }
  });
  console.log(besteAirports);
  // besteAirports.forEach((airport) => {
  //   const filteredPassengersOnFlights = filteredFlights().filter(
  //     (flight) => flight.airportTo === airport
  //   );
  //   const passengersOnFlights = filteredPassengersOnFlights.map(
  //     (flight) => flight.id
  //   );
  //   let includeInResult = true;
  //   for (const passenger of passengers) {
  //     if (!passengersOnFlights.includes(passenger.id)) {
  //       includeInResult = false;
  //     }
  //   }
  //   if (includeInResult) {
  //     result[airport] = filteredPassengersOnFlights;
  //   }
  // });
  // return result;
};
