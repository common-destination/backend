import mongoose from 'mongoose';

const flightsSchema = new mongoose.Schema(
  {
    airportFrom: String,
    airportTo: String,
    companyName: String,
    country: String,
    departure: Date,
    arrive: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const FlightsModel = mongoose.model('flight', flightsSchema, 'flights');

export default FlightsModel;
