import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const GenreContainer = () => {
  const [genreBooks, setGenreBooks] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=the+cat+in+the+hat`
      );

      const volumes = res.data.items.map((item: any) => item.volumeInfo);
      setGenreBooks(volumes);
    };

    getGenre();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {genreBooks.length > 0 &&
        genreBooks.map((volume) => <BookCard volume={volume} />)}
    </div>
  );
};

export default GenreContainer;
