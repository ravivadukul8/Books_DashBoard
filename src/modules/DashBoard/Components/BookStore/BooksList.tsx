import { useContext, useMemo, useState } from "react";
import { BookContext } from "../../../../contexts/BooksListContext";
import { FaSort } from "react-icons/fa6";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";
const BooksList = ({ editButton }: any) => {
  const bookList = useContext(BookContext);

  if (!bookList) {
    return null;
  }
  const { books, deleteBook, editBook } = bookList;

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

  const handleEdit = (book: any) => {
    editButton();
    editBook(book);
  };

  return (
    <div>
      <h4> Books Details</h4>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
              <span>Title</span>
              {sortConfig && sortConfig.key === "title" ? (
                sortConfig.direction === "ascending" ? (
                  <FaSortUp
                    onClick={() => handleSort("title")}
                    className="cursor-pointer"
                  />
                ) : (
                  <FaSortDown
                    onClick={() => handleSort("title")}
                    className="cursor-pointer"
                  />
                )
              ) : (
                <FaSort
                  className="cursor-pointer"
                  onClick={() => handleSort("title")}
                />
              )}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
              <span>Author</span>
              {sortConfig && sortConfig.key === "author" ? (
                sortConfig.direction === "ascending" ? (
                  <FaSortUp
                    onClick={() => handleSort("author")}
                    className="cursor-pointer"
                  />
                ) : (
                  <FaSortDown
                    onClick={() => handleSort("author")}
                    className="cursor-pointer"
                  />
                )
              ) : (
                <FaSort
                  className="cursor-pointer"
                  onClick={() => handleSort("author")}
                />
              )}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              <span>Year</span>
              {sortConfig && sortConfig.key === "year" ? (
                sortConfig.direction === "ascending" ? (
                  <FaSortUp
                    onClick={() => handleSort("year")}
                    className="cursor-pointer"
                  />
                ) : (
                  <FaSortDown
                    onClick={() => handleSort("year")}
                    className="cursor-pointer"
                  />
                )
              ) : (
                <FaSort
                  className="cursor-pointer"
                  onClick={() => handleSort("year")}
                />
              )}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              <span>Genre</span>
              {sortConfig && sortConfig.key === "genre" ? (
                sortConfig.direction === "ascending" ? (
                  <FaSortUp
                    onClick={() => handleSort("genre")}
                    className="cursor-pointer"
                  />
                ) : (
                  <FaSortDown
                    onClick={() => handleSort("genre")}
                    className="cursor-pointer"
                  />
                )
              ) : (
                <FaSort
                  className="cursor-pointer"
                  onClick={() => handleSort("genre")}
                />
              )}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  cursor-pointer">
              Action
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
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(book)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  {" "}
                  Delete
                </button>
              </td>
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
