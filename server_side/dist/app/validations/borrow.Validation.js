"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowZod = void 0;
const zod_1 = require("zod");
exports.borrowZod = zod_1.z.object({
    book: zod_1.z.string({
        required_error: 'Book Id is required',
    }),
    quantity: zod_1.z.number({
        required_error: 'Quantity is required',
    }).int().positive('Quantity must be a positive number'),
    dueDate: zod_1.z.coerce.date({
        required_error: 'Due Date is required',
    })
});
