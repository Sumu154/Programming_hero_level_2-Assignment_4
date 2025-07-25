import { Model } from "mongoose";
import { Document } from "mongoose";


// interface method -> copies 0 hoile auto unavailable hoye jabe
export interface BookInstanceMethods {
  makeUnavailable(): void;
}


export interface IBook extends Document, BookInstanceMethods {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean
}