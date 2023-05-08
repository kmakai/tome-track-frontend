import React, { useEffect } from "react";
import MyBookCard from "../components/MyBookCard";
import { useAppSelector, useAppDispatch } from "../hooks";
import axios from "axios";
import { refreshReadingNow } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReadingNow: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { readingNow } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.user.user);

  const removeFromReadingNow = async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/books/reading/remove",
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
          readingNow.map((book: any) => (
            <div className="flex flex-col" key={book.volumeId}>
              <MyBookCard key={book.volumeId} volume={book} />
              <button
                className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
                onClick={() => removeFromReadingNow(book._id)}
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
