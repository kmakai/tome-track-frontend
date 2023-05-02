import React from "react";
import { Link } from "react-router-dom";

interface Props {
  volume: any;
}

const MyBookCard: React.FC<Props> = ({ volume }) => {
  return (
    <div key={volume.id} className="flex-1">
      {volume.imageLinks ? (
        <Link to={`/book/${volume.volumeId}`}>
          <img
            src={volume.imageLinks.thumbnail}
            alt={volume.title}
            className="h-50"
          />
        </Link>
      ) : (
        <Link to={`/book/${volume.id}`}>
          <div className="h-[100%]">
            {volume.title} by: {volume.authors}
          </div>
        </Link>
      )}
    </div>
  );
};

export default MyBookCard;
