let passengers = [
  {
    id: "passenger1",
    airport: "hamburg",
    dateIn: 21,
    dateBack: 23,
    maxPrice: 200,
    minimumJourney: 1,
  },
  {
    id: "passenger2",
    airport: "frankfurt",
    dateIn: 21,
    dateBack: 23,
    maxPrice: 100,
    minimumJourney: 2,
  },
  {
    id: "passenger3",
    airport: "london",
    dateIn: 21,
    dateBack: 23,
    maxPrice: 200,
    minimumJourney: 2,
  },
];

const flights = [
  {
    airportFrom: "hamburg",
    airportTo: "berlin",
    dateIn: 23,
    dateBack: 23,
    price: 150,
  },
  {
    airportFrom: "hamburg",
    airportTo: "moscow",
    dateIn: 22,
    dateBack: 23,
    price: 150,
  },
  {
    airportFrom: "hamburg",
    airportTo: "paris",
    dateIn: 21,
    dateBack: 22,
    price: 350,
  },
  {
    airportFrom: "hamburg",
    airportTo: "berlin",
    dateIn: 22,
    dateBack: 23,
    price: 50,
  },
  {
    airportFrom: "frankfurt",
    airportTo: "berlin",
    dateIn: 21,
    dateBack: 23,
    price: 50,
  },
  {
    airportFrom: "frankfurt",
    airportTo: "paris",
    dateIn: 21,
    dateBack: 23,
    price: 850,
  },
  {
    airportFrom: "frankfurt",
    airportTo: "moscow",
    dateIn: 21,
    dateBack: 23,
    price: 5,
  },
  {
    airportFrom: "london",
    airportTo: "berlin",
    dateIn: 21,
    dateBack: 23,
    price: 35,
  },

  {
    airportFrom: "london",
    airportTo: "rome",
    dateIn: 21,
    dateBack: 23,
    price: 66,
  },
  {
    airportFrom: "london",
    airportTo: "rome",
    dateIn: 21,
    dateBack: 23,
    price: 66,
  },
  {
    airportFrom: "london",
    airportTo: "rome",
    dateIn: 21,
    dateBack: 23,
    price: 66,
  },
  {
    airportFrom: "london",
    airportTo: "moscow",
    dateIn: 21,
    dateBack: 23,
    price: 12,
  },
];

const filteredFlights = () => {
  let result = [];
  passengers.map((passenger) => {
    flights
      .filter((element) => {
        return (
          element.airportFrom === passenger.airport &&
          //element.airportTo === passenger.airport
          element.dateIn >= passenger.dateIn &&
          element.dateBack <= passenger.dateBack &&
          element.dateBack - element.dateIn <= passenger.minimumJourney &&
          element.price <= passenger.maxPrice
        );
      })
      .map((flight) => {
        flight.totalJourney = flight.dateBack - flight.dateIn;
        flight.id = passenger.id;
        result.push(flight);
      });
  });

  return result;
};

console.log(filteredFlights());

const findCommonDestination = () => {
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

console.log(findCommonDestination());

// const today = moment()
// const tomorrow = moment().add(1, "days").format("yyyy-MM-DD");
// console.log(today);
// console.log(tomorrow);
// const difference = moment("2022-01-28T08:02:17+01:00").diff(moment(), "hours");
// console.log(difference);
