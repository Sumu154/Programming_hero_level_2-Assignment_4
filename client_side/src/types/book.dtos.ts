// export interface IBook {
//   bookId: string;
//   title: string;
//   author: string;
//   genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
//   isbn: string;
//   description?: string;
//   copies: number;
//   available: boolean;
//   createdAt: string;
//   updatedAt: string;
// }


// For creating a new book (POST)
export interface CreateBookDto {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

// For updating a book (PUT/PATCH)
export type UpdateBookDto = Partial<CreateBookDto>;


// The full book object returned from the server (GET)
export interface BookResponseDto extends CreateBookDto {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

