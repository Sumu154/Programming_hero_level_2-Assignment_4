"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const book_Controller_1 = require("../controllers/book.Controller");
router.post('/books', book_Controller_1.createBook);
router.get('/books', book_Controller_1.getBooks);
router.get('/books/:bookId', book_Controller_1.getBookById);
router.put('/books/:bookId', book_Controller_1.updateBookById);
router.delete('/books/:bookId', book_Controller_1.deleteBookById);
exports.default = router;
