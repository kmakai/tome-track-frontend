import React, { useEffect } from "react";
import MyBookCard from "../components/MyBookCard";
import { useAppSelector, useAppDispatch } from "../hooks";
import axios from "axios";
import { refreshReadBooks } from "../features/userSlice";
import { toast } from "react-toastify";
import { IBook } from "../interfaces";

const ReadBooks: React.FC = () => {
  const dispatch = useAppDispatch();
  const { readBooks } = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.user.user?.token);

  const removeRead = async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/books/read/remove",
        {
          id: id,
        },
        config
      );

      if (res.status === 200) toast.success(res.data.message);
      setTimeout(() => {
        dispatch(refreshReadBooks());
      }, 1000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    dispatch(refreshReadBooks());
  }, [dispatch]);

  return (
    <>
      <h2>Books Read</h2>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
        {readBooks &&
          readBooks.map((book: IBook) => (
            <div className="flex flex-col" key={book.volumeId}>
              <MyBookCard key={book.volumeId} volume={book} />
              <button
                className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
                onClick={() => book._id && removeRead(book._id)}
              >
                remove
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default ReadBooks;
