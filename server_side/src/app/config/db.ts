import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.d0ab4.mongodb.net/book-management?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)


export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } 
  catch (e) {
    console.error('Failed to connect to MongoDB Atlas', e);
  }
};
