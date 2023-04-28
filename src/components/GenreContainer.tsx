import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const GenreContainer: React.FC<{ title: string }> = ({ ...props }) => {
  const [genreBooks, setGenreBooks] = useState([]);
  const [showing, setShowing] = useState<any[]>([]);

  useEffect(() => {
    const getGenre = async () => {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${props.title}`
      );
      console.log("get");
      const volumes = res.data.items.map((item: any) => {
        return { ...item.volumeInfo, id: item.id };
      });
      setGenreBooks(volumes);
      setShowing(volumes.slice(0, 5));
    };

    getGenre();
  }, [props.title]);

  return (
    <>
      <span className="capitalize font-bold">{props.title}</span>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2 justify-center">
        {showing.length > 0 &&
          showing.map((volume) => <BookCard volume={volume} key={volume.id} />)}
        <button onClick={() => setShowing(genreBooks)}>View More</button>
      </div>
    </>
  );
};

export default GenreContainer;
