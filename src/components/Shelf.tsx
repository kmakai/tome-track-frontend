import React from "react";
import BookCard from "./BookCard";

interface shelfProps {
  shelf: any;
}

const Shelf: React.FC<shelfProps> = ({ shelf }) => {
  return (
    <div>
      <h2>{shelf.name}</h2>
      <div className="books">
        {shelf.books.map((book: any) => (
          <BookCard volume={book} />
        ))}
      </div>
    </div>
  );
};

export default Shelf;
