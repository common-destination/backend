export class CommonDestinationsBuilder {
  constructor(commonDestinationsController, passengers, minStayTimeTogether) {
    this.passengers = passengers;
    this.minStayTimeTogether = minStayTimeTogether;
    this.commonDestinationsController = commonDestinationsController;
    this.individualCompatibleFlights = [];
    this.commonDestinations = [];
    this.initialize();
  }

  initialize = async () => {
    this.individualCompatibleFlights =
      await this.commonDestinationsController.individualCompatibleFlights(
        this.passengers
      );
  };

  calculate() {
    this.stepOne_findCommonAirports();
    return this.commonDestinations;
  }

  stepOne_findCommonAirports() {
    this.commonDestinations.push("test");
  }

}
