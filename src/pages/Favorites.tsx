import React from "react";
import MyBookCard from "../components/MyBookCard";
import { useAppSelector } from "../hooks";

const Favorites: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.user);
  return (
    <>
      <h2>My Favorites</h2>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
        {favorites.map((book: any) => (
          <MyBookCard key={book.volumeId} volume={book} />
        ))}
      </div>
    </>
  );
};

export default Favorites;
