import express from 'express';
const router = express.Router();

import { 
  createBook,  
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} from '../controllers/book.Controller';


router.post('/books', createBook)
router.get('/books', getBooks)
router.get('/books/:bookId', getBookById)
router.put('/books/:bookId', updateBookById)
router.delete('/books/:bookId', deleteBookById)

export default router;