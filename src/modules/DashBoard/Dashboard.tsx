import { useContext, useEffect } from "react";
import Header from "./Components/HeaderBar/Header";
import BooksList from "./Components/BookStore/BooksList";
import Cookies from "js-cookie";
import { BookContext } from "../../contexts/BooksListContext";

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData.length]);

  return (
    <div>
      <Header />
      <div className="p-10">
        <BooksList />
      </div>
    </div>
  );
};

export default Dashboard;
