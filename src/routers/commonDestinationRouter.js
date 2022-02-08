import "../config.js";
import express from "express";
import moment from "moment";
import * as commonDestinationController from "../controllers/commonDestinationController.js";

const commonDestinationRouter = express.Router();



//COMPATIBLE FLIGHTS FOR EVERY PASSENGER

commonDestinationRouter.get("/compatible-flights", async (req, res) => {
    const passengers = [
      {
        name: "passenger2",
        airport: "Hamburg",
        minDepartureDate: moment("2022-02-01 08:02"),
        maxReturnDate: moment("2022-02-04 08:02"),
      },
    ];
    const flights = await commonDestinationController.compatibleFlights(passengers);
    res.json(flights);
  });
  
  //GET COMMON DESTINATION D
  
  commonDestinationRouter.post("/passengers-data", async (req, res) => {
    let passengers = req.body.passengers;
    let stayTimeTogether = req.body.stayTimeTogether;
    req.session.passengers = passengers;
    req.session.stayTimeTogether = stayTimeTogether;
    req.session.save();
  
    // const minStayTimeTogether = 2;
    // time together = smallest return - largest arrival
    // const flights = await flightsController.findCommonDestinations(passengers);
    // res.json(flights);
    res.json(passengers);
  });
  
  commonDestinationRouter.get("/", async (req, res) => {
    let passengers = req.session.passengers;
    let stayTimeTogether = req.session.stayTimeTogether;
    console.log(passengers);
    console.log(stayTimeTogether);
  
  
  
    
    res.json(passengers);
  });


  export {commonDestinationRouter}