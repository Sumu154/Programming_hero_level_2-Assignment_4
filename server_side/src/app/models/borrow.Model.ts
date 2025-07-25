import mongoose from "mongoose";
import { IBorrow } from "../interfaces/borrow.Interface";



export const borrowSchema = new mongoose.Schema<IBorrow> ({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book',
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,  // positive
  },
  dueDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true  // ✅ This line enables createdAt & updatedAt
})

export const borrowModel = mongoose.model<IBorrow> ('Borrow', borrowSchema);