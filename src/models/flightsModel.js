import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
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
    price: Number,

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const FlightsModel = mongoose.model('flight', flightSchema, 'flights');

export default FlightsModel;
