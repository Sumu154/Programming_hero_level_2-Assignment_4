import mongoose from "mongoose";
import { BookInstanceMethods, IBook } from '../interfaces/book.Interface'


export const bookSchema = new mongoose.Schema<IBook, BookInstanceMethods> ({
  title: {
    type: String,
    required: true,
  },
  author: { 
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  copies: {
    type: Number,
    required: true,
    min: 0,  //non negative
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true  // ✅ This line enables createdAt & updatedAt
})


// interface for update availability
bookSchema.method("makeUnavailable", function () {
  this.available = this.copies > 0;
})

export const bookModel = mongoose.model<IBook> ('Book', bookSchema);