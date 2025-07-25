import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import path from 'path';
import cors from 'cors';


// import all routes
import bookRoutes from './app/routes/book.Routes' ;  
import borrowRoutes from './app/routes/borrow.Routes' ;  


dotenv.config();
const app: Application = express()

app.set('view engine', 'ejs');  // fix case: 'view engine' lowercase v
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://client-side-seven-xi.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());



app.use('/api', bookRoutes);
app.use('/api', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('hello....typescript diye new start??');
});

export default app;