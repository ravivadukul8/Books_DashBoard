import { useContext, useEffect, useState } from "react";
import Header from "./Components/HeaderBar/Header";
import BooksList from "./Components/BookStore/BooksList";
import BooksForm from "./Components/BookStore/BooksForm";
import Cookies from "js-cookie";
import { BookContext } from "../../contexts/BooksListContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { dummyBooks } from "../../constant/dummyBooksArray";

const Dashboard: React.FC = () => {
  const { listAllData, clearEditState } = useContext(BookContext);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData.length]);

  const handelEdit = () => {
    setForm(true);
  };

  const handelAdd = () => {
    clearEditState();
    setForm(true);
  };

  const handelClose = () => {
    clearEditState();
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
        <BooksList editButton={handelEdit} />
      </div>
    </div>
  );
};

export default Dashboard;
