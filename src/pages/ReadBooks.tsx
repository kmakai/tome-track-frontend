import React from "react";
import MyBookCard from "../components/MyBookCard";
import { useAppSelector } from "../hooks";
import axios from "axios";

const ReadBooks: React.FC = () => {
  const { readBooks } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.user.user);

  const removeRead = async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.patch(
      "http://localhost:3000/api/v1/books/read/remove",
      {
        id: id,
      },
      config
    );

    if (res.status === 200) console.log(res.data.message);
  };

  return (
    <>
      <h2>Books Read</h2>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
        {readBooks.map((book: any) => (
          <div className="flex flex-col" key={book.volumeId}>
            <MyBookCard key={book.volumeId} volume={book} />
            <button
              className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
              onClick={() => removeRead(book._id)}
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
