export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  userName?: string;
  byDefault: boolean;
}

export interface BookContextType {
  books?: Book[];
  bookEdit?: Book | null;
  listAllData?: (books: Book[]) => void;
  addBook?: (book: Omit<Book, "id">) => void;
  deleteBook?: ((id: string) => void) | undefined;
  editBook?: (book: Omit<Book, "id">) => void;
  handelEditBook?: (book: Book) => void;
  clearEditState?: () => void;
}

export interface BookValuesFormik {
  title: string;
  author: string;
  year: number | string;
  genre: string;
}
