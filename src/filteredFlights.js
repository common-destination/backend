import FlightsModel from "./models/flightsModel.js";
import moment from "moment";


// const today = moment()
// const tomorrow = moment().add(1, "days").format("yyyy-MM-DD");
// console.log(today);
// console.log(tomorrow);
// const difference = moment("2022-01-28T08:02:17+01:00").diff(moment(), "hours");
// console.log(difference);

let passengers = [
    {
      id: 'passenger1',
      airport: 'hamburg',
      minDepartureDate: moment("2022-01-28T08:02:17+01:00"),
      maxReturnDate: moment("2022-02-02T08:02:17+01:00"),
      minimumJourney: 1,
    },
    {
      id: 'passenger2',
      airport: 'frankfurt',
      minDepartureDate: moment("2022-01-29T08:02:17+01:00"),
      maxReturnDate: moment("2022-02-05T08:02:17+01:00"),
      maxPrice: 100,
      minimumJourney: 2,
    },
    {
      id: 'passenger3',
      airport: 'london',
      minDepartureDate: moment("2022-01-28T08:02:17+01:00"),
      maxReturnDate: moment("2022-02-04T08:02:17+01:00"),
      minimumJourney: 2,
    },
  ];


const filteredFlights = async () => {
    let compatibleFlights = [];
    const flights = await FlightsModel.find({});
    passengers.map((passenger) => {
      flights
        .filter((element) => {
          return (
            //flight departure
            element.from === passenger.airport &&
            element.departure >= passenger.minDepartureDate &&
            //flight return
            element.to === passenger.airport &&
            element.arrival <= passenger.maxReturnDate &&
            //journey
            (moment(element.arrival).diff(moment(passenger.minDepartureDate), "days") >= passenger.minimumJourney)
          );
        })
        .map((flight) => {
          flight.totalJourney = flight.maxReturnDate - flight.minDepartureDate;
          flight.id = passenger.id;
          compatibleFlights.push(flight);
        });
    });
    return  compatibleFlights;
  };

  console.log(await filteredFlights())



//   const findCommonDestination = async () => {
//     const obj = filteredFlights().reduce((acc, flight) => {
//       if (acc[flight.airportTo]) {
//         acc[flight.airportTo]++;
//       } else {
//         acc[flight.airportTo] = 1;
//       }
//       return acc;
//     }, {});
  
//     const result = {};
//     let besteAirports = [];
//     console.log(obj);
//     Object.entries(obj).forEach((m) => {
//       if (m[1] === passengers.length) {
//         besteAirports.push(m[0]);
//       }
//     });
//     besteAirports.forEach((airport) => {
//       const filteredPassengersOnFlights = filteredFlights().filter(
//         (flight) => flight.airportTo === airport
//       );
//       const passengersOnFlights = filteredPassengersOnFlights.map(
//         (flight) => flight.id
//       );
//       let includeInResult = true;
//       for (const passenger of passengers) {
//         if (!passengersOnFlights.includes(passenger.id)) {
//           includeInResult = false;
//         }
//       }
//       if (includeInResult) {
//         result[airport] = filteredPassengersOnFlights;
//       }
//     });
//     return result;
//   };


//   console.log(findCommonDestination ())




// const today = moment()
// const tomorrow = moment().add(1, "days").format("yyyy-MM-DD");
// console.log(today);
// console.log(tomorrow);
// const difference = moment("2022-01-28T08:02:17+01:00").diff(moment(), "hours");
// console.log(difference);