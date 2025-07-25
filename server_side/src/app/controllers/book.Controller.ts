import { Request, Response } from "express";
import { bookZod } from "../validations/book.Validation"
import { bookModel } from "../models/book.Model";
import { borrowModel } from "../models/borrow.Model";

export const createBook = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  const parsedBook = await bookZod.safeParseAsync(req.body)
  if(!parsedBook.success){
    res.status(400).json({ 
      message: "Validation failed", 
      success: false, 
      errors: parsedBook.error.errors 
    });
    return;
  }


  try{
    const book = parsedBook.data;
    const createdBook = await bookModel.create(book);
    res.status(201).json({
      message: "Book created successfully", 
      success: true, 
      data: createdBook 
    });
  } 
  catch(e: any){
    res.status(500).json({ 
      message: "Failed to create book",
      success: false,  
      error: e.errors
    });
  }
}


export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("called")
    const { filter, sortBy="createdAt", sort="asc", limit="10" } = req.query;

    // filterQuery build kora
    const filterQuery: any = {};
    if(filter){
      filterQuery.genre = filter;
    }

    // Sorting logic
    const sortQuery: any = {};
    sortQuery[sortBy as string] = sort==="desc" ? -1 : 1;

    // Limit logic
    const limitNum = parseInt(limit as string, 10) || 10;

    console.log(filterQuery, sortQuery, limitNum);
    const books = await bookModel
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
  catch(e: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: e.errors,
    });
  }
};



export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try{
    const { bookId } = req.params;  
    const book = await bookModel.findOne({ _id: bookId });

    if(!book){
      res.status(404).json({ 
        success: true,
        message: "Book not found" 
      });
      return
    }

    res.status(200).json(book);
  } 
  catch(e: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: e.errors,
    });
  }
}



export const updateBookById = async (req: Request, res: Response): Promise<void> => {
  console.log('called')
  try{
    const { bookId } = req.params;
    const updatedFields = { ...req.body };

    const updatedBook = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $set: updatedFields },
      { new: true }
    )

    console.log(bookId, updatedBook)

    if(!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found"
      });
      return;
    }

     res.status(200).json(updatedBook);

  }
  catch(e: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: e.errors,
    });
  }
}



export const deleteBookById = async (req: Request, res: Response): Promise<void> => {
  try{
    const { bookId } = req.params;

    // First, delete all borrows linked to this book
    await borrowModel.deleteMany({ book: bookId });

    const deletedBook = await bookModel.findOneAndDelete(
      { _id: bookId },
    )

    if(!deletedBook){
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
  catch(e: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: e.errors,
    });
  }

}