import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const GenreContainer: React.FC<{ title: string }> = ({ ...props }) => {
  const [genreBooks, setGenreBooks] = useState([]);
  const [showing, setShowing] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${props.title}`
      );
      console.log("get");
      const volumes = res.data.items.map((item: any) => item.volumeInfo);
      setGenreBooks(volumes);
      setShowing(volumes.slice(0, 5));
    };

    getGenre();
  }, []);

  return (
    <>
      <span className="capitalize font-bold">{props.title}</span>
      <hr className="my-4" />
      <div className="flex ">
        {showing.length > 0 &&
          showing.map((volume, index) => (
            <BookCard volume={volume} key={`${index}`} />
          ))}
        <button onClick={() => setShowing(genreBooks)}>View More</button>
      </div>
    </>
  );
};

export default GenreContainer;
