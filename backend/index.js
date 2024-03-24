import express from 'express';
// use port in this file
import { PORT, MONGODB_URL } from './config.js'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
// middleware is used to parse incoming request bodies with JSON payloads. This middleware is responsible for parsing the incoming request body, which contains JSON data, and then populating the request.body property with the parsed JSON data.
app.use(express.json());

// use middleware to use the bookRoutes
app.use('/books', bookRoutes);

// connect to the database
// we want to run the express server after we connect to the database
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to the database');
    // create a function for listening to this port with a callback function
    // in terminal, type in "npm run dev", this will run the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });