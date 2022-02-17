export class CommonDestinationsBuilder {
  constructor(
    commonDestinationsController,
    individualCompatibleTrips,
    passengers,
    minStayTimeTogether
  ) {
    this.commonDestinationsController = commonDestinationsController;
    this.passengers = passengers;
    this.minStayTimeTogether = minStayTimeTogether;
    this.individualCompatibleTrips = individualCompatibleTrips;
    this.commonDestinations = [];
    this.commonAirports = [];
    this.orderedPassengerTrips = {};
  }

  calculate() {
    this.stepOne_findCommonAirports();
    this.stepTwo_buildOrderedPassengerTrips();
    return this.commonDestinations;
  }

  TripsAreCompatible(currentAirport, tripA, tripB) {
    return (
      (currentAirport === null || tripA.outboundFlight.to === currentAirport) &&
      tripA.outboundFlight.to === tripB.outboundFlight.to &&
      this.commonDestinationsController.getTimeTogether(
        [tripA.outboundFlight.arrival, tripB.outboundFlight.arrival],
        [tripA.returnFlight.departure, tripB.returnFlight.departure]
      ) >= this.minStayTimeTogether
    );
  }

  compareTrips(currentIndex, currentAirport = null) {
    const Trips1 = this.individualCompatibleTrips[currentIndex];
    // console.log(this.individualCompatibleTrips)
    const Trips2 = this.individualCompatibleTrips[currentIndex + 1];
    const atEnd = this.individualCompatibleTrips.length - currentIndex === 2;

    if (!atEnd) {
      Trips1.forEach((tripA) => {
        Trips2.forEach((tripB) => {
          if (this.TripsAreCompatible(currentAirport, tripA, tripB)) {
            this.compareTrips(currentIndex + 1, tripA.outboundFlight.to);
          }
        });
      });
    } else {
      Trips1.forEach((tripA) => {
        Trips2.forEach((tripB) => {
          if (this.TripsAreCompatible(currentAirport, tripA, tripB)) {
            this.commonAirports.push(currentAirport);
          }
        });
      });
    }
  }

  stepOne_findCommonAirports() {
    this.compareTrips(0);
    this.commonAirports = [...new Set(this.commonAirports)];
  }

  getPassengerTripsForAirportAndPassenger(airport, passengerId) {
    const trips = [];
    this.individualCompatibleTrips.forEach((passengertripArray) => {
      passengertripArray.forEach((passengerTrip) => {
        if (
          airport === passengerTrip.outboundFlight.to &&
          passengerTrip.passengerId === passengerId
        ) {
          trips.push(passengerTrip);
        }
      });
    });
    return trips;
  }

  stepTwo_buildOrderedPassengerTrips() {
    this.commonAirports.forEach((commonAirport) => {
      this.orderedPassengerTrips[commonAirport] = {};
      this.passengers.forEach((passenger) => {
        this.orderedPassengerTrips[commonAirport][passenger.id] =
          this.getPassengerTripsForAirportAndPassenger(
            commonAirport,
            passenger.id
          );
      });
    });
    // console.log(this.orderedPassengerTrips);
  }

  debug() {
    return {
      commonAirports: this.commonAirports,
      orderedPassengerTrips: this.orderedPassengerTrips,
    };
  }
}
