import React from "react";

interface Props {
  volume: any;
}

const BookCard: React.FC<Props> = ({ volume }) => {
  return (
    <div key={volume.id} className="flex-1">
      {volume.imageLinks ? (
        <img
          src={volume.imageLinks.thumbnail}
          alt={volume.title}
          className="h-50"
        />
      ) : (
        <div className="h-[100%]">
          {volume.title} by: {volume.authors}
        </div>
      )}
      {/* <p>{volume.title}</p> */}
    </div>
  );
};

export default BookCard;
