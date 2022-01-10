let passengers = [
  { airport: 'a', dateIn: 21, dateBack: 23, maxPrice: 200 },
  { airport: 'b', dateIn: 21, dateBack: 23, maxPrice: 100 },
  { airport: 'c', dateIn: 21, dateBack: 23, maxPrice: 200 },
];

const flights = [
  { airportFrom: 'a', airportTo: 'berlin', dateIn: 21, dateBack: 23 },
  { airportFrom: 'a', airportTo: 'paris', dateIn: 21, dateBack: 23 },
  { airportFrom: 'a', airportTo: 'berlin', dateIn: 23, dateBack: 25 },
  { airportFrom: 'a', airportTo: 'moscow', dateIn: 21, dateBack: 24 },
  { airportFrom: 'a', airportTo: 'berlin', dateIn: 22, dateBack: 23 },
  { airportFrom: 'b', airportTo: 'berlin', dateIn: 21, dateBack: 23 },
  { airportFrom: 'b', airportTo: 'paris', dateIn: 21, dateBack: 23 },
  { airportFrom: 'b', airportTo: 'berlin', dateIn: 22, dateBack: 23 },
  { airportFrom: 'b', airportTo: 'berlin', dateIn: 22, dateBack: 23 },
  { airportFrom: 'c', airportTo: 'berlin', dateIn: 21, dateBack: 23 },
  { airportFrom: 'c', airportTo: 'rome', dateIn: 21, dateBack: 23 },
  { airportFrom: 'c', airportTo: 'rome', dateIn: 22, dateBack: 23 },
  { airportFrom: 'c', airportTo: 'paris', dateIn: 21, dateBack: 23 },
];

const filteredFlights = () => {
  let result = [];
  passengers.map((passenger) => {
    flights
      .filter((element) => {
        return (
          element.airportFrom === passenger.airport &&
          element.dateIn === passenger.dateIn &&
          element.dateBack === passenger.dateBack
        );
      })
      .map((flight) => {
        result.push([flight.airportTo]);
      });
  });

  return result;
};

// console.log(filteredFlights());

// const filteredFlightsGast1 = flights
//   .filter((element) => {
//     return (
//       element.airportFrom === passengers[1].airport &&
//       element.dateIn === passengers[1].dateIn &&
//       element.dateBack === passengers[1].dateBack
//     );
//   })
//   .map((flight) => {
//     return flight.airportTo;
//   });

// const filteredFlightsGast2 = flights
//   .filter((element) => {
//     return (
//       element.airportFrom === passengers[2].airport &&
//       element.dateIn === passengers[2].dateIn &&
//       element.dateBack === passengers[2].dateBack
//     );
//   })
//   .map((flight) => {
//     return flight.airportTo;
//   });

// const filteredFlightsGast3 = flights
//   .filter((element) => {
//     return (
//       element.airportFrom === passengers[2].airport &&
//       element.dateIn === passengers[2].dateIn &&
//       element.dateBack === passengers[2].dateBack
//     );
//   })
//   .map((flight) => {
//     return flight.airportTo;
//   });

const findCommonDestination = () => {
  const obj = filteredFlights().reduce((acc, flights) => {
    //   console.log(flights);

    for (const flight of flights) {
      if (acc[flight]) {
        acc[flight]++;
      } else {
        acc[flight] = 1;
      }
    }
    return acc;
  }, {});
  let result = [];
  Object.entries(obj).forEach((m) => {
    if (m[1] === passengers.length) {
      result.push(m[0]);
    }
  });
  return result;
  //   console.log(Object.entries(obj));
};

// console.log(filteredFlightsGast1);
// console.log(filteredFlightsGast2);
// console.log(filteredFlightsGast3);

console.log(findCommonDestination());
