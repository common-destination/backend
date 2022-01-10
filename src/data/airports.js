class Airport {
  constructor(name, country, passengersInMillionPerYear) {
    this.name = name;
    this.country = country;
    this.passengersInMillionPerYear = passengersInMillionPerYear;
  }
  getRange = () => {
    return Math.round(this.passengersInMillionPerYear / 10);
  };
}

export const airports = [
  new Airport("London", "UK", 80),
  new Airport("Paris", "France", 76),
  new Airport("Amsterdam", "Netherlands", 71),
  new Airport("Stuttgart", "Germany", 12),
];

// for (let i = 0; i < airports.length; i++) {
  // console.log(`${airports[i].name} has ${airports[i].getRange()}`);
  // console.log(`${airports[i].getFullName()} has ${airports[i].getRange()}`);
// }

// export const airports = [
  // {
  //   name: "London",
  //   country: "UK",
  //   passengersInMillionPerYear: 80,
  //   range: getRange(passengersInMillionPerYear),
  // },
  // {
  //   name: "Paris",
  //   country: "France",
  //   passengersInMillionPerYear: 76,
  // },
  // {
  //   name: "Amsterdam",
  //   country: "Netherlands",
  //   range: 7,
  //   passengersInMillionPerYear: 71,
  // },
  // {
  //   name: "Frankfurt",
  //   country: "Germany",
  //   range: 7,
  //   passengersInMillionPerYear: 70,
  // },
  // {
  //   name: "Barcelona",
  //   country: "Spain",
  //   range: 5,
  //   passengersInMillionPerYear: 52,
  // },
  // {
  //   name: "Istanbul",
  //   country: "Turkey",
  //   range: 5,
  //   passengersInMillionPerYear: 52,
  // },
  // {
  //   name: "Moscow",
  //   country: "Russia",
  //   range: 5,
  //   passengersInMillionPerYear: 49,
  // },
  // {
  //   name: "Freising",
  //   country: "Germany",
  //   range: 5,
  //   passengersInMillionPerYear: 47,
  // },
  // {
  //   name: "Rome",
  //   country: "Italy",
  //   passengersInMillionPerYear: 43,
  //   range: 4,
  // },
  // {
  //   name: "Dublin",
  //   country: "Ireland",
  //   passengersInMillionPerYear: 32,
  //   range: 3,
  // },
  // {
  //   name: "Vienna",
  //   country: "Austria",
  //   passengersInMillionPerYear: 31,
  //   range: 3,
  // },
  // {
  //   name: "Zurich",
  //   country: "Switzerland",
  //   passengersInMillionPerYear: 31,
  //   range: 3,
  // },
  // {
  //   name: "Lisbon",
  //   country: "Portugal",
  //   passengersInMillionPerYear: 31,
  //   range: 3,
  // },
  // {
  //   name: "Copenhagen",
  //   country: "Denmark",
  //   passengersInMillionPerYear: 30,
  //   range: 3,
  // },
  // {
  //   name: "Palma de Mallorca",
  //   country: "Spain",
  //   range: 3,
  //   passengersInMillionPerYear: 29,
  // },
  // {
  //   name: "Milan",
  //   country: "Italy",
  //   range: 3,
  //   passengersInMillionPerYear: 28,
  // },
  // {
  //   name: "Oslo",
  //   country: "Norway",
  //   range: 3,
  //   passengersInMillionPerYear: 28,
  // },
  // {
  //   name: "Brussels",
  //   country: "Belgium",
  //   range: 3,
  //   passengersInMillionPerYear: 26,
  // },
  // {
  //   name: "Stockholm",
  //   country: "Sweden",
  //   range: 2,
  //   passengersInMillionPerYear: 25,
  // },
  // {
  //   name: "Athens",
  //   country: "Greece",
  //   range: 2,
  //   passengersInMillionPerYear: 25,
  // },
  // {
  //   name: "Dusseldorf",
  //   country: "Germany",
  //   range: 2,
  //   passengersInMillionPerYear: 25,
  // },
  // {
  //   name: "Berlin",
  //   country: "Germany",
  //   range: 2,
  //   passengersInMillionPerYear: 24,
  // },
  // {
  //   name: "Helsinki",
  //   country: "Finland",
  //   range: 2,
  //   passengersInMillionPerYear: 21,
  // },
  // {
  //   name: "Saint Petersburg",
  //   country: "Russia",
  //   range: 2,
  //   passengersInMillionPerYear: 19,
  // },
  // {
  //   name: "Warsaw",
  //   country: "Poland",
  //   range: 2,
  //   passengersInMillionPerYear: 18,
  // },
  // {
  //   name: "Prague",
  //   country: "Czech Republic",
  //   range: 2,
  //   passengersInMillionPerYear: 17,
  // },
  // {
  //   name: "Hamburg",
  //   country: "Germany",
  //   range: 2,
  //   passengersInMillionPerYear: 17,
  // },
  // {
  //   name: "Budapest",
  //   country: "Hungary",
  //   range: 1,
  //   passengersInMillionPerYear: 16,
  // },
  // {
  //   name: "Stuttgart",
  //   country: "Germany",
  //   range: 1,
  //   passengersInMillionPerYear: 12,
  // },
// ];
