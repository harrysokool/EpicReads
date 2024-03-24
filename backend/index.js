import express from 'express';
// use port in this file
import { PORT, MONGODB_URL } from './config.js'
import mongoose from 'mongoose';

const app = express();

// create a route for the server, / is the root route, and we have a callback function
// get is a http method.
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("testing");
})

// create a function for listening to this port with a callback function
// in terminal, type in "npm run dev", this will run the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// connect to the database
// we want to run the express server after we connect to the database
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  })