// const geoDistance = require('node-geo-distance');
import geoCoder from 'node-open-geocoder';
import { getDistance } from "geolib";

// get distance between two addresses / geo points in meters
const getGeoData = (strLocation1, strLocation2) => {

  return new Promise((resolve, reject) => {

    geoCoder().geocode( strLocation1 )
    .end((err, res) => {
  
      const coordAirport1 = { latitude: res[0].lat, longitude: res[0].lon };
  
      geoCoder().geocode( strLocation2)
      .end((err, res) => {
        
        const coordAirport2 = { latitude: res[0].lat, longitude: res[0].lon };
  
        // const dist = geoDistance.vincentySync(coordAirport1, coordAirport2);
        const dist =  getDistance(coordAirport1, coordAirport2)
  
        resolve( dist )
  
      })
    })

  })
  
  
}


const getGeoDataTest = async () => {

  // this array can also be an array of objects with more details like country, etc...
  const arrAirports = [ 
    "Turin Airport, Italy", 
    "Milan Airport, Italy", 
    "Berlin BER, Germany", 
    "Moscow, Russia" 
  ]

  const flights = []

  // outer loop
  for(let i=0; i<arrAirports.length; i++) {

    // combine with every other airport
    for(let j=i+1; j<arrAirports.length; j++) {
      const distance = await getGeoData( arrAirports[i], arrAirports[j]  )
      // console.log( `Hin: ${arrAirports[i]} - ${arrAirports[j]} - ${Math.round(distance/1000)}` )
      // console.log( `Zurueck: ${arrAirports[j]} - ${arrAirports[i]} - ${Math.round(distance/1000)}` )

      // next for loop for a bunch of flights between these two airports
      // TODO: generate some random start date...
      const amountFlights = 1
      for(let x=0; x < amountFlights ;x++) {
        flights.push({ from: arrAirports[i], to: arrAirports[j], distance })
        flights.push({ from: arrAirports[j], to: arrAirports[i], distance })
      }
    }

  }

  console.log(flights)


}

getGeoDataTest()