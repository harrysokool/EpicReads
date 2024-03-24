import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// GET all books
// we can have more than one get request
router.get('/', async (request, response) => {
  try {
    // This is a Mongoose query that searches for documents in the "books" collection. The empty object {} as the argument to the find() method means that we want to find all documents in the collection.
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// GET a single book by id
// use the :/id to get the book, it is a parameter
router.get('/:id', async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).send({ message: 'Please provide a book id' });
    }
    const book = await Book.findById(request.params.id);
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }
    return response.status(200).send(book);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// POST is a http method.
// route to save a new book 
// mongoose is a async process, so we need to use async and await
// to test a pose request, we can use postman
router.post('/', async (request, response) => {
  try {
    // check if any data is empty
    if (!request.body.title || !request.body.author || !request.body.publishYear) {
      return response.status(400).send({ message: 'Please fill in all the data' });
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
    response.status(500).send({ message: error.message });
  }
});

// PUT is a http method.
// route to update a book
// find the book by id and update it
router.put('/:id', async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).send({ message: 'Please provide a book id' });
    }
    const book = await Book.findById(request.params.id);
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: 'Book not found' });
    } else {
      return response.status(200).send({ message: 'Book updated successfully' });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// DELETE is a http method.
// provide the id of the book to delete
router.delete('/:id', async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).send({ message: 'Please provide a book id' });
    }
    const book = await Book.findById(request.params.id);
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }
    const { id } = request.params;
    const result = await Book.findOneAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: 'Book not found' });
    } else {
      return response.status(200).send({ message: 'Book deleted' });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

export default router;