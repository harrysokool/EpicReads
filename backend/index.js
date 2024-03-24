import express from 'express';
// use port in this file
import { PORT, MONGODB_URL } from './config.js'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

// GET is a http method.
// create a route for the server, '/' is the root route, and we have a callback function
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("testing");
})

// POST is a http method.
// route to save a new book 
// mongoose is a async process, so we need to use async and await
// to test a pose request, we can use postman
app.post('/books', async (request, response) => {
  try {
    // check if any data is empty
    if (!request.body.title || !request.body.author || !request.body.publishYear) {
      return response.status(400).send({message: 'Please fill in all the data'});
    }

    // if no missing data, make new book
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook)

    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({message: error.message});
  }
});


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