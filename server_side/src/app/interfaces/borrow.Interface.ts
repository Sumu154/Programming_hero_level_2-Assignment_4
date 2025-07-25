import mongoose from "mongoose";
import { Document } from "mongoose";


export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  quantity : number;
  dueDate : Date;
}