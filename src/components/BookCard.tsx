import React from "react";

interface Prop {
  volume: any;
}

const BookCard: React.FC<Prop> = ({ volume }) => {
  return (
    <div key={volume.id}>
      <p>{volume.title}</p>
    </div>
  );
};

export default BookCard;
