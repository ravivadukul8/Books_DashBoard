import { createContext, ReactNode, useState } from "react";
import { Book, BookContextType } from "../Types/Books-types";
const BookContext = createContext<BookContextType | undefined>(undefined);

const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const listAllData = (books: any) => {
    setBooks(books);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        listAllData,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BooksProvider, BookContext };
