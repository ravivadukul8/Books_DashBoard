import { useContext, useMemo, useState } from "react";
import { BookContext } from "../../../../contexts/BooksListContext";

const BooksList = () => {
  const bookList = useContext(BookContext);

  if (!bookList) {
    return null;
  }
  const { books, deleteBook } = bookList;

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  const [sortConfig, setSortConfig] = useState<{
    key: any;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedBooks = useMemo(() => {
    let sortableBooks = [...books];
    if (sortConfig !== null) {
      sortableBooks.sort((a: any, b: any) => {
        const key = sortConfig.key as keyof typeof a;
        if (a[key] < b[key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBooks;
  }, [books, sortConfig]);

  const handleSort = (key: keyof (typeof books)[0]) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDelete = (id: string) => {
    deleteBook(id);
  };

  return (
    <div>
      <h4> Books Details</h4>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              onClick={() => handleSort("title")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  cursor-pointer"
            >
              Title
            </th>
            <th
              onClick={() => handleSort("author")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  cursor-pointer"
            >
              Author
            </th>
            <th
              onClick={() => handleSort("year")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  cursor-pointer"
            >
              Year
            </th>
            <th
              onClick={() => handleSort("genre")}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  cursor-pointer"
            >
              Genre
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentBooks.map((book: any) => (
            <tr key={book.id}>
              <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.year}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
