import React from "react";
import MyBookCard from "./MyBookCard";
import { BsFillTrash3Fill } from "react-icons/bs";

interface shelfProps {
  shelf: any;
}

const Shelf: React.FC<shelfProps> = ({ shelf }) => {
  return (
    <div className="shelf border-2 p-2">
      <div className="flex flex-row justify-between px-4">
        <h2 className="underline">{shelf.name.toUpperCase()}</h2>
        <button className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700">
          <BsFillTrash3Fill />
        </button>
      </div>

      <div className="books grid grid-cols-2 justify-items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
        {shelf.books.map((book: any, index: number) => (
          <div className="flex flex-col" key={index}>
            <MyBookCard key={index} volume={book} />
            <button className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700">
              remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shelf;
