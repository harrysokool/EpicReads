// this file keeps all the project model
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishYear:  { type: Number, required: true },
  timestamps : true // this will automatically create a timestamp for the book Mongoose will    automatically add createdAt and updatedAt fields to the documents based on the timestamps of document creation and last update
});

export const book = mongoose.model('book', bookSchema);