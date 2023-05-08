import { useAppSelector, useAppDispatch } from "../hooks";
import MyBookCard from "../components/MyBookCard";
import axios from "axios";
import { useEffect } from "react";
import { refreshMyBooks } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const MyBooks: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const MyBooks = useAppSelector((state) => state.user.myBooks);
  const { token } = useAppSelector((state) => state.user.user);

  const removeFromMyBooks = async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.patch(
      "http://localhost:3000/api/v1/books/delete",
      {
        id: id,
      },
      config
    );

    if (res.status === 200) console.log(res.data.message);
  };

  useEffect(() => {
    dispatch(refreshMyBooks());
  }, [dispatch]);

  return (
    <>
      <h2>My Books</h2>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
        {MyBooks &&
          MyBooks.map((book: any) => (
            <div className="flex flex-col" key={book.volumeId}>
              <MyBookCard key={book.volumeId} volume={book} />
              <button
                className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
                onClick={() => {
                  removeFromMyBooks(book._id);
                  navigate(0);
                }}
              >
                remove
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyBooks;
