import { createContext, ReactNode, useState } from "react";
import { Book, BookContextType } from "../Types/Books-types";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const BookContext = createContext<BookContextType | undefined>(undefined);

const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const listAllData = (books: any) => {
    setBooks(books);
  };

  const addBook = (book: Omit<Book, "id">) => {
    const name = Cookies.get("token");
    const newBook = { id: uuidv4(), ...book, userName: name };
    const currentBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const updatedBooks = [...currentBooks, newBook];
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const deleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    const localData = localStorage.getItem("books");
    const allData = localData ? JSON.parse(localData) : [];
    const deleteData = allData.filter((book: any) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(deleteData));
  };

  return (
    <BookContext.Provider
      value={{
        books,
        listAllData,
        addBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BooksProvider, BookContext };
