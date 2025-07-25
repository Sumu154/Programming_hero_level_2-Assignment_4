"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookModel = exports.bookSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.bookSchema = new mongoose_1.default.Schema({
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
        min: 0, //non negative
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // ✅ This line enables createdAt & updatedAt
});
// interface for update availability
exports.bookSchema.method("makeUnavailable", function () {
    this.available = this.copies > 0;
});
exports.bookModel = mongoose_1.default.model('Book', exports.bookSchema);
