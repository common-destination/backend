const flights = [
  {
    airportFrom: 'turin',
    airportTo: 'berlin',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'italy',
    countryTo: 'germany',
    companyName: 'jjj airlines',
  },
  {
    airportFrom: 'moscow',
    airportTo: 'berlin',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'russia',
    countryTo: 'germany',
    companyName: 'nice flights',
  },
  {
    airportFrom: 'moscow',
    airportTo: 'rome',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'russia',
    countryTo: 'italy',
    companyName: 'jjj airlines',
  },
  {
    airportFrom: 'hamburg',
    airportTo: 'paris',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'germany',
    countryTo: 'france',
    companyName: 'the airlines',
  },
  {
    airportFrom: 'amsterdam',
    airportTo: 'london',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'netherland',
    countryTo: 'england',
    companyName: 'join airlines',
  },
  {
    airportFrom: 'hamburg',
    airportTo: 'turin',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'germany',
    countryTo: 'italy',
    companyName: 'the airlines',
  },
  {
    airportFrom: 'london',
    airportTo: 'paris',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'england',
    countryTo: 'france',
    companyName: 'join airlines',
  },
  {
    airportFrom: 'madrid',
    airportTo: 'hamburg',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'spain',
    countryTo: 'germany',
    companyName: 'the airlines',
  },
  {
    airportFrom: 'hamburg',
    airportTo: 'madrid',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'germany',
    countryTo: 'spain',
    companyName: 'jjj airlines',
  },
  {
    airportFrom: 'london',
    airportTo: 'madrid',
    departure: '2022-01-22T14:56:59.301Z',
    arrive: '2022-01-22T14:56:59.301Z',
    countryFrom: 'england',
    countryTo: 'spain',
    companyName: 'espanol airlines',
  },
];

const airportsFrom = flights.map((airport) => {
  return airport.airportFrom;
});
const airportsTo = flights.map((airport) => {
  return airport.airportTo;
});
const airports = [...airportsFrom, ...airportsTo];
console.log({ airports: [...new Set(airports)] });

const uniqueDestinations = flights.map((airport) => {
    return [airport.airportFrom,airport.airportTo];
  });
  console.log({ connections: [...new Set(uniqueDestinations)] });

export default flights;
