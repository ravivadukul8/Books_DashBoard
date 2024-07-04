import { createContext, ReactNode, useState } from "react";
import { Book, BookContextType } from "../Types/Books-types";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

const BookContext = createContext<BookContextType | undefined>(undefined);

const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookEdit, setBookEdit] = useState<Book | null>(null);

  const listAllData = (books) => {
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
    const deleteData = allData.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(deleteData));
  };

  const editBook = (book: Book) => {
    setBookEdit(book);
  };

  const handelEditBook = (updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? { ...book, ...updatedBook } : book
      )
    );
    setBookEdit(null);
  };

  const clearEditState = () => {
    setBookEdit(null);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        bookEdit,
        listAllData,
        addBook,
        deleteBook,
        editBook,
        handelEditBook,
        clearEditState,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BooksProvider, BookContext };
