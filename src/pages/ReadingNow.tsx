import React, { useEffect } from "react";
import MyBookCard from "../components/MyBookCard";
import { useAppSelector, useAppDispatch } from "../hooks";
import axios from "axios";
import { refreshReadingNow } from "../features/userSlice";
import { toast } from "react-toastify";
import { IBook } from "../interfaces";
const API_URI = "https://tome-track-backend-production.up.railway.app/api/v1";
const ReadingNow: React.FC = () => {
  const dispatch = useAppDispatch();
  const { readingNow } = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.user?.user?.token) || null;

  const removeFromReadingNow = async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.patch(
        API_URI + "/books/reading/remove",
        {
          id: id,
        },
        config
      );

      if (res.status === 200) toast.success(res.data.message);
      setTimeout(() => {
        dispatch(refreshReadingNow());
      }, 1000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    dispatch(refreshReadingNow());
  }, [dispatch]);

  return (
    <>
      <h2>Reading Now</h2>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
        {readingNow &&
          readingNow.map((book: IBook) => (
            <div className="flex flex-col" key={book.volumeId}>
              <MyBookCard key={book.volumeId} volume={book} />
              <button
                className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
                onClick={() => book._id && removeFromReadingNow(book._id)}
              >
                remove
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default ReadingNow;
