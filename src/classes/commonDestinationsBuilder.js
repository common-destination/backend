export class CommonDestinationsBuilder {
  constructor(
    commonDestinationsController,
    individualCompatibleFlights,
    passengers,
    minStayTimeTogether
  ) {
    this.commonDestinationsController = commonDestinationsController;
    this.passengers = passengers;
    this.minStayTimeTogether = minStayTimeTogether;
    this.individualCompatibleFlights = individualCompatibleFlights;
    this.commonDestinations = [];
    this.commonAirports = [];
    this.orderedPassengerFlights = {};
  }

  calculate() {
    this.stepOne_findCommonAirports();
    this.stepTwo_buildOrderedPassengerFlights();
    return this.commonDestinations;
  }

  flightsAreCompatible(currentAirport, flightA, flightB) {
    return (
      (currentAirport === null ||
        flightA.outboundFlight.to === currentAirport) &&
      flightA.outboundFlight.to === flightB.outboundFlight.to &&
      this.commonDestinationsController.getTimeTogether(
        [flightA.outboundFlight.arrival, flightB.outboundFlight.arrival],
        [flightA.returnFlight.departure, flightB.returnFlight.departure]
      ) >= this.minStayTimeTogether
    );
  }

  compareFlights(currentIndex, currentAirport = null) {
    const flights1 = this.individualCompatibleFlights[currentIndex];
    // console.log(this.individualCompatibleFlights)
    const flights2 = this.individualCompatibleFlights[currentIndex + 1];
    const atEnd = this.individualCompatibleFlights.length - currentIndex === 2;

    if (!atEnd) {
      flights1.forEach((flightA) => {
        flights2.forEach((flightB) => {
          if (this.flightsAreCompatible(currentAirport, flightA, flightB)) {
            this.compareFlights(currentIndex + 1, flightA.outboundFlight.to);
          }
        });
      });
    } else {
      flights1.forEach((flightA) => {
        flights2.forEach((flightB) => {
          if (this.flightsAreCompatible(currentAirport, flightA, flightB)) {
            this.commonAirports.push(currentAirport);
          }
        });
      });
    }
  }

  stepOne_findCommonAirports() {
    this.compareFlights(0);
    this.commonAirports = [...new Set(this.commonAirports)];
  }

  stepTwo_buildOrderedPassengerFlights() {
    this.commonAirports.forEach((commonAirport) => {
      this.orderedPassengerFlights[commonAirport] = {};
      //   this.passengers.forEach((passenger) => {

      //   });
    });
    // console.log(this.orderedPassengerFlights);
  }

  debug() {
    console.log(this.orderedPassengerFlights, this.commonAirports);
    return {
      commonAirports: this.commonAirports,
      orderedPassengerFlights: this.orderedPassengerFlights,
    };
  }
}
