import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BookContext } from "../../../../contexts/BooksListContext";

const BooksForm = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("AddBookForm must be used within a BookProvider");
  }
  const { addBook } = context;

  const init = {
    title: "",
    author: "",
    year: "",
    genre: "",
  };

  const { handleSubmit, values, errors, touched, handleChange, setValues } =
    useFormik({
      initialValues: init,
      validationSchema: Yup.object({
        title: Yup.string().required("Title is required"),
        author: Yup.string().required("Author is required"),
        year: Yup.number()
          .typeError("Year must be a number")
          .required("Year is required"),
        genre: Yup.string().required("Genre is required"),
      }),
      onSubmit: (values, { resetForm }) => {
        addBook({ ...values, year: Number(values.year) });

        resetForm();
      },
    });

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-gray-700">Title:</label>
        <input
          type="text"
          name="title"
          value={values?.title}
          className="border rounded px-2 py-1 w-full"
          onChange={handleChange}
        />
        {touched.title && errors.title ? (
          <div className="text-red-500">{errors.title}</div>
        ) : null}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Author:</label>
        <input
          type="text"
          name="author"
          value={values?.author}
          className="border rounded px-2 py-1 w-full"
          onChange={handleChange}
        />
        {touched.author && errors.author ? (
          <div className="text-red-500">{errors.author}</div>
        ) : null}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Year:</label>
        <input
          type="number"
          name="year"
          value={values?.year}
          className="border rounded px-2 py-1 w-full"
          onChange={handleChange}
        />
        {touched.year && errors.year ? (
          <div className="text-red-500">{errors.year}</div>
        ) : null}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Genre:</label>
        <input
          type="text"
          name="genre"
          value={values?.genre}
          className="border rounded px-2 py-1 w-full"
          onChange={handleChange}
        />
        {touched.genre && errors.genre ? (
          <div className="text-red-500">{errors.genre}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Book
      </button>
    </form>
  );
};

export default BooksForm;
