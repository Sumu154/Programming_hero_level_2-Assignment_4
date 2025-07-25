import { Request, Response } from "express";
import { borrowZod } from "../validations/borrow.Validation";
import { borrowModel } from "../models/borrow.Model";
import { bookModel } from "../models/book.Model";

export const createBorrow = async (req: Request, res: Response): Promise<void> => {
  // console.log(req.body)
  const parsedBorrow = await borrowZod.safeParseAsync(req.body)
  if(!parsedBorrow.success){
    res.status(400).json({ 
      message: "Validation failed", 
      success: false, 
      errors: parsedBorrow.error.errors 
    });
    return;
  }


  try{
    const borrow = parsedBorrow.data;
    const { book: bookId, quantity, dueDate } = borrow;
    // check if book exists
    const book = await bookModel.findById(bookId)
    if(!book){
      res.status(400).json({ 
        message: "Book not found", 
        success: false, 
      });
      return;
    }

    // enough available copies ace kina
    if(book.copies < quantity){
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
    const createdBorrow = await borrowModel.create(borrow);
    res.status(201).json({
      message: "borrow created successfully", 
      success: true, 
      data: createdBorrow 
    });
  } 
  catch(e: any){
    res.status(500).json({ 
      message: "Failed to create borrow",
      success: false,  
      error: e.errors
    });
  }
}


export const getBorrows = async (req: Request, res: Response): Promise<void> => {
  try{
    const summary = await borrowModel.aggregate([
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
    ])

    res.status(201).json(summary);
  }
  catch(e: any){
    res.status(500).json({ 
      message: "Failed to fetch borrow",
      success: false,  
      error: e.errors
    });
  }
}
