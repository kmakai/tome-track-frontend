import { useParams } from "react-router-dom";
import { getBook } from "../features/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import axios from "axios";

const BookPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { book } = useAppSelector((state) => state.search);
  const { myBooks, user } = useAppSelector((state) => state.user);
  const saved = myBooks && myBooks.some((book: any) => book.volumeId === id);

  useEffect(() => {
    dispatch(getBook(id as string));
  }, [dispatch, id]);

  const saveBook = async () => {
    console.log("saved");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.post(
      "http://localhost:3000/api/v1/books/save",
      {
        ...book,
        volumeId: id,
      },
      config
    );

    console.log(res.data);
  };

  return (
    <div className="book-page h-[100%] w-full gap-4 p-4 m-auto md:col-start-2 md:col-end-5 md:row-start-2 md:row-end-5 overflow-y-scroll">
      <div className="book-info container flex flex-col gap-4 ">
        <h1 className="title text-2xl underline underline-offset-4 font-bold text-slate-800">
          {book.title}
        </h1>
        <div>
          {!saved && <button onClick={saveBook}>Add to my books</button>}
          {saved && (
            <div className="flex gap-4 flex-wrap items-center text-lg">
              <span>Add to: </span>{" "}
              <button className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2">
                Favorites
              </button>
              <button className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2">
                reading now
              </button>
              <button className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2">
                read
              </button>
              <label
                htmlFor="shelf"
                className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 "
              >
                put in a shelf:
                <select name="shelf" className="bg-slate-700">
                  <option value="1">shelf 1</option>
                  <option value="2">shelf 2</option>
                  <option value="3">shelf 3</option>
                </select>{" "}
              </label>
            </div>
          )}
        </div>
        <div className="book-cover flex gap-4">
          {book.imageLinks && <img src={book.imageLinks.thumbnail} alt="" />}
          <ul className="authors">
            <li>Written by:</li>
            {book.authors?.map((author: string, index: number) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
        </div>
        <div className="book-info-details">
          <ul className="info">
            <li>
              <span>Publisher:</span>
              {""}
              {book.publisher}
            </li>
            <li>
              <span>Published:</span>
              {book.publishedDate}
            </li>
          </ul>
        </div>
        <div className="summary">
          <h2>Summary</h2>

          <p className="description text-justify text-sm ">
            {book.description && book.description.replace(/(<([^>]+)>)/gi, "")}
          </p>
        </div>
        <p>
          <span>{book.categories?.join(", ")}</span>
        </p>
      </div>
    </div>
  );
};

export default BookPage;
