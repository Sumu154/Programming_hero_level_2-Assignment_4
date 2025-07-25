// For creating a borrow (POST)
export interface CreateBorrowDto {
  book: string;       // Book ID
  quantity: number;
  dueDate: Date | string; // ISO string is recommended for API communication
}

// For updating a borrow (PUT/PATCH)
export type UpdateBorrowDto = Partial<CreateBorrowDto>;

// Full borrow object from server (GET)
export interface BorrowResponseDto extends CreateBorrowDto {
  _id: string;
  title: string;
  isbn: string;
  createdAt: string;
  updatedAt: string;
}


export interface BorrowSummaryResponseDto {
  title: string;
  quantity: number;
  isbn: string;
}
