import { useParams } from "react-router-dom";
import { getBook } from "../features/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import axios from "axios";

const BookPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { book } = useAppSelector((state) => state.search);
  const { myBooks } = useAppSelector((state) => state.user);
  const saved = myBooks.some((book) => book.volumeId === id);

  useEffect(() => {
    dispatch(getBook(id as string));
  }, [dispatch, id]);

  const saveBook = async () => {
    console.log("saved");
    const res = await axios.post("http://localhost:3000/api/v1/books/save", {
      ...book,
      volumeId: id,
    });

    console.log(res.data);
  };

  return (
    <div className="book-page h-[100%] w-full gap-4 p-4 m-auto md:col-start-2 md:col-end-5 md:row-start-2 md:row-end-5 overflow-y-scroll">
      <div className="book-info container flex flex-col gap-4 ">
        <h1 className="title text-2xl">{book.title}</h1>
        <div>
          {!saved && <button onClick={saveBook}>Add to my books</button>}
          {saved && (
            <div className="flex gap-4">
              <span>Add to: </span> <button>Favorites</button>
              <button>reading now</button>
              <button>read</button>
              <label htmlFor="shelf">
                put in a shelf:
                <select name="shelf">
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
            {book.authors?.map((author: string) => (
              <li>{author}</li>
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
