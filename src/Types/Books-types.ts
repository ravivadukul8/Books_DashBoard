export interface Book {
  title: string;
  author: string;
  year: number;
  genre: string;
  userName?: string;
}

export interface BookContextType {
  books: Book[];
  addBook: (book: Book) => void;
  deleteBook: (id: String) => void;
}
