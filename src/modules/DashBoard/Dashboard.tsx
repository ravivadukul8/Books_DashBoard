import { useContext, useEffect, useState } from "react";
import Header from "./Components/HeaderBar/Header";
import BooksList from "./Components/BookStore/BooksList";
import Cookies from "js-cookie";
import { BookContext } from "../../contexts/BooksListContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import BooksForm from "./Components/BookStore/BooksForm";

const dummyBooks = [
  {
    title: "Dummy Book 1",
    author: "Author 1",
    year: 2021,
    genre: "Fiction",
    userName: "",
  },
  {
    title: "Dummy Book 2",
    author: "Author 2",
    year: 2022,
    genre: "Non-Fiction",
    userName: "",
  },
];

const Dashboard = () => {
  const { listAllData } = useContext(BookContext);
  const [form, setForm] = useState(false);
  const storedBooks = localStorage.getItem("books");
  const allData = storedBooks ? JSON.parse(storedBooks) : [];

  if (allData.length === 0) {
    localStorage.setItem("books", JSON.stringify(dummyBooks));
  }

  const name = Cookies.get("token");
  const filterUserData = allData?.filter((item: any) => {
    return item?.userName === "" || item?.userName === name;
  });

  useEffect(() => {
    listAllData(filterUserData);
  }, [allData.length]);

  const handelAdd = () => {
    setForm(true);
  };

  const handelClose = () => {
    setForm(false);
  };

  return (
    <div>
      <Header />
      <div className="p-10">
        <div className="flex flex-row items-start justify-start gap-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handelAdd}
          >
            Add Books
          </button>
          {form && (
            <IoCloseCircleOutline
              size={35}
              onClick={handelClose}
              color="red"
              className="cursor-pointer"
            />
          )}
        </div>
        {form && <BooksForm />}
        <BooksList />
      </div>
    </div>
  );
};

export default Dashboard;
