"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowModel = exports.borrowSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.borrowSchema = new mongoose_1.default.Schema({
    book: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Book',
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // positive
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true // ✅ This line enables createdAt & updatedAt
});
exports.borrowModel = mongoose_1.default.model('Borrow', exports.borrowSchema);
