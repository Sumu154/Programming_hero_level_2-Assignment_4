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
exports.getBorrows = exports.createBorrow = void 0;
const borrow_Validation_1 = require("../validations/borrow.Validation");
const borrow_Model_1 = require("../models/borrow.Model");
const book_Model_1 = require("../models/book.Model");
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    const parsedBorrow = yield borrow_Validation_1.borrowZod.safeParseAsync(req.body);
    if (!parsedBorrow.success) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            errors: parsedBorrow.error.errors
        });
        return;
    }
    try {
        const borrow = parsedBorrow.data;
        const { book: bookId, quantity, dueDate } = borrow;
        // check if book exists
        const book = yield book_Model_1.bookModel.findById(bookId);
        if (!book) {
            res.status(400).json({
                message: "Book not found",
                success: false,
            });
            return;
        }
        // enough available copies ace kina
        if (book.copies < quantity) {
            res.status(400).json({
                message: "Not enough copies available",
                success: false,
            });
            return;
        }
        // copies 0 hole unavailable banano
        book.copies -= quantity;
        book.makeUnavailable();
        book.save();
        // shb okay thakle then make borrow record
        const createdBorrow = yield borrow_Model_1.borrowModel.create(borrow);
        res.status(201).json({
            message: "borrow created successfully",
            success: true,
            data: createdBorrow
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Failed to create borrow",
            success: false,
            error: e.errors
        });
    }
});
exports.createBorrow = createBorrow;
const getBorrows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_Model_1.borrowModel.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalBorrows: { $sum: "$quantity" }
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookBorrowInfo"
                }
            },
            {
                $unwind: "$bookBorrowInfo"
            },
            {
                $project: {
                    _id: 0,
                    title: "$bookBorrowInfo.title",
                    isbn: "$bookBorrowInfo.isbn",
                    quantity: "$totalBorrows",
                }
            }
        ]);
        res.status(201).json(summary);
    }
    catch (e) {
        res.status(500).json({
            message: "Failed to fetch borrow",
            success: false,
            error: e.errors
        });
    }
});
exports.getBorrows = getBorrows;
