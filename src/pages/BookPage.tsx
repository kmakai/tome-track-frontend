import { useParams } from "react-router-dom";
import { getBook } from "../features/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";

const BookPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { book } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(getBook(id as string));
  }, [dispatch, id]);

  return (
    <div className="book-page h-[100%] w-full gap-4 p-4 m-auto md:col-start-2 md:col-end-5 md:row-start-2 md:row-end-5 overflow-y-scroll">
      <div className="book-info container flex flex-col gap-4 ">
        <h1 className="title text-2xl">{book.title}</h1>

        <div className="book-cover flex gap-4">
          <img src={book.imageLinks.thumbnail} alt="" />
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
            {book.description.replace(/(<([^>]+)>)/gi, "")}
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
