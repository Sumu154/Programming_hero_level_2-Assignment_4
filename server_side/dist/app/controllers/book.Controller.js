"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const book_Validation_1 = require("../validations/book.Validation");
const book_Model_1 = require("../models/book.Model");
const borrow_Model_1 = require("../models/borrow.Model");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const parsedBook = yield book_Validation_1.bookZod.safeParseAsync(req.body);
    if (!parsedBook.success) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            errors: parsedBook.error.errors
        });
        return;
    }
    try {
        const book = parsedBook.data;
        const createdBook = yield book_Model_1.bookModel.create(book);
        res.status(201).json({
            message: "Book created successfully",
            success: true,
            data: createdBook
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Failed to create book",
            success: false,
            error: e.errors
        });
    }
});
exports.createBook = createBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("called");
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;
        // filterQuery build kora
        const filterQuery = {};
        if (filter) {
            filterQuery.genre = filter;
        }
        // Sorting logic
        const sortQuery = {};
        sortQuery[sortBy] = sort === "desc" ? -1 : 1;
        // Limit logic
        const limitNum = parseInt(limit, 10) || 10;
        console.log(filterQuery, sortQuery, limitNum);
        const books = yield book_Model_1.bookModel
            .find(filterQuery)
            .sort(sortQuery)
            .limit(limitNum);
        // res.status(200).json({
        //   success: true,
        //   message: "Books retrieved successfully",
        //   data: books,
        // });
        res.status(200).json(books);
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: e.errors,
        });
    }
});
exports.getBooks = getBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_Model_1.bookModel.findOne({ _id: bookId });
        if (!book) {
            res.status(404).json({
                success: true,
                message: "Book not found"
            });
            return;
        }
        res.status(200).json(book);
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: e.errors,
        });
    }
});
exports.getBookById = getBookById;
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('called');
    try {
        const { bookId } = req.params;
        const updatedFields = Object.assign({}, req.body);
        const updatedBook = yield book_Model_1.bookModel.findOneAndUpdate({ _id: bookId }, { $set: updatedFields }, { new: true });
        console.log(bookId, updatedBook);
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
            return;
        }
        res.status(200).json(updatedBook);
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: e.errors,
        });
    }
});
exports.updateBookById = updateBookById;
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        // First, delete all borrows linked to this book
        yield borrow_Model_1.borrowModel.deleteMany({ book: bookId });
        const deletedBook = yield book_Model_1.bookModel.findOneAndDelete({ _id: bookId });
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: deletedBook,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: e.errors,
        });
    }
});
exports.deleteBookById = deleteBookById;
