import './config.js';
import mongoose from 'mongoose';



// URINNEN
// SENSITIVE DATA => never store stuff like this in code
// connection strings, passwords, secrets

// we need dotenv.config() to be executred BEFOE!
// const mongoConnectionString = "mongodb://localhost/common_destination";
const mongoConnectionString = process.env.MONGO_URI;

console.log({ mongoConnectionString});

mongoose
  .connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection estabished!'))
  .catch((err) => console.log('[ERROR] Connection failed', err));
