import { Book } from '../types/book';
import { otHistoryBooks } from './books/ot-history';
import { otWisdomProphets } from './books/ot-wisdom-prophets';
import { ntGospelsEarlyPaul } from './books/nt-gospels-early-paul';
import { ntLaterPaulRevelation } from './books/nt-later-paul-revelation';

export const books: Book[] = [
  ...otHistoryBooks,
  ...otWisdomProphets,
  ...ntGospelsEarlyPaul,
  ...ntLaterPaulRevelation
];
