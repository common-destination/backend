import mongoose from 'mongoose';

const flightsSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    countryFrom: String,
    countryTo: String,
    departure: String,
    arrive: String,
    distance: String,
    flightDuration: String,
    flightDurationInHours: Number,
    day: String,
    month: String,
    price: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const FlightsModel = mongoose.model('flight', flightsSchema, 'flights');

export default FlightsModel;
