import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../features/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import axios from "axios";
import { refreshState } from "../features/userSlice";
import { toast } from "react-toastify";
import { IBook, IShelf } from "../interfaces";

const API_URI = "http://localhost:3000/api/v1";

const BookPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { book } = useAppSelector((state) => state.search);
  const { myBooks, user, favorites, readBooks, readingNow, myShelves } =
    useAppSelector((state) => state.user);
  const saved = myBooks && myBooks.some((book: IBook) => book.volumeId === id);
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  useEffect(() => {
    dispatch(getBook(id as string));
  }, [dispatch, id]);

  const saveBook = async () => {
    const res = await axios.post(
      API_URI + "/books/save",
      {
        ...book,
        volumeId: id,
      },
      config
    );

    toast.success(res.data.message);
    navigate(-1);
  };

  const addFavorite = async () => {
    const res = await axios.post(
      API_URI + "/books/favorite/add",
      {
        volumeId: id,
      },
      config
    );

    if (res.status === 200) {
      dispatch(refreshState());
      navigate("/my-books/favorites");
    }
  };

  const addReadingNow = async () => {
    const res = await axios.post(
      API_URI + "/books/reading/add",
      {
        volumeId: id,
      },
      config
    );

    if (res.status === 200) {
      dispatch(refreshState());
      navigate("/my-books/reading");
    }
  };

  const addRead = async () => {
    const res = await axios.post(
      API_URI + "/books/read/add",
      {
        volumeId: id,
      },
      config
    );

    if (res.status === 200) {
      dispatch(refreshState());
      navigate("/my-books/read");
    }
  };

  const toggleShelf = () => {
    const shelvesContainer = document.querySelector(".shelves") as HTMLElement;

    shelvesContainer.classList.toggle("hidden");
    shelvesContainer.classList.toggle("flex");
  };

  const addToShelf = async (id: string) => {
    const res = await axios.post(
      API_URI + `/shelf/${id}/add`,
      {
        bookId: book.id,
      },
      config
    );

    if (res.status === 200) toast.success("Added to shelf");
  };

  return (
    <div className="book-page h-[100%] w-full gap-4 p-4 m-auto md:col-start-2 md:col-end-5 md:row-start-2 md:row-end-5 overflow-y-scroll">
      <div className="book-info container flex flex-col gap-4 ">
        <h1 className="title text-2xl underline underline-offset-4 font-bold text-slate-800">
          {book.title}
        </h1>
        <div>
          {!saved && (
            <button
              onClick={saveBook}
              className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
            >
              Add to my books
            </button>
          )}
          {saved && (
            <div className="flex flex-col gap-2 md:flex-row flex-wrap items-start text-lg md:items-center">
              <span>Add to: </span>{" "}
              {favorites &&
                favorites.filter((book: IBook) => book.volumeId === id)
                  .length === 0 && (
                  <button
                    className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
                    onClick={addFavorite}
                  >
                    Favorites
                  </button>
                )}
              {readingNow &&
                readingNow.filter((book: IBook) => book.volumeId === id)
                  .length === 0 && (
                  <button
                    className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
                    onClick={addReadingNow}
                  >
                    reading now
                  </button>
                )}
              {readBooks &&
                readBooks.filter((book: IBook) => book.volumeId === id)
                  .length === 0 && (
                  <button
                    className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
                    onClick={addRead}
                  >
                    read
                  </button>
                )}
              <div className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 hover:bg-slate-700 relative">
                <button className="bg-slate-800 px-2" onClick={toggleShelf}>
                  put in a shelf
                </button>{" "}
                <div className="shelves border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 hover:bg-slate-700 gap-2 flex-col absolute w-[80%] mt-2 hidden">
                  {myShelves &&
                    myShelves.map((shelf: IShelf) => (
                      <button
                        key={shelf._id}
                        className="hover:bg-slate-800"
                        onClick={() => {
                          addToShelf(shelf._id);
                          toggleShelf();
                        }}
                      >
                        {shelf.name}
                      </button>
                    ))}
                </div>
              </div>
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
