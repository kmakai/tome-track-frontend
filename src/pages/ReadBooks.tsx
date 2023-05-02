import React from "react";
import MyBookCard from "../components/MyBookCard";
import { useAppSelector } from "../hooks";

const ReadBooks: React.FC = () => {
  const { readBooks } = useAppSelector((state) => state.user);
  return (
    <>
      <h2>Books Read</h2>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
        {readBooks.map((book: any) => (
          <MyBookCard key={book.volumeId} volume={book} />
        ))}
      </div>
    </>
  );
};

export default ReadBooks;
