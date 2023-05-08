import React from "react";
import { useNavigate } from "react-router-dom";
import MyBookCard from "./MyBookCard";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../hooks";
import axios from "axios";
import { toast } from "react-toastify";
import { refreshShelves } from "../features/userSlice";

interface shelfProps {
  shelf: any;
}

const Shelf: React.FC<shelfProps> = ({ shelf }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const config = user && {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const removeFromShelf = async (bookId: string, shelfId: string) => {
    const res = await axios.post(
      `http://localhost:3000/api/v1/shelf/${shelfId}/remove`,
      { bookId },
      config
    );

    if (res.status === 200) {
      toast(res.data.message);
      dispatch(refreshShelves());
    }
  };

  const deleteShelf = async (id: string) => {
    const res = await axios.delete(
      `http://localhost:3000/api/v1/shelf/${id}/delete`,
      config
    );

    console.log(res.data);

    if (res.status === 200) navigate(0);
  };

  return (
    <div className="shelf border-2 p-2">
      <div className="flex flex-row justify-between px-4">
        <h2 className="underline">{shelf.name.toUpperCase()}</h2>
        <button
          className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
          onClick={() => deleteShelf(shelf._id)}
        >
          <BsFillTrash3Fill />
        </button>
      </div>

      <div className="books grid grid-cols-2 justify-items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
        {shelf.books.map((book: any, index: number) => (
          <div className="flex flex-col" key={index}>
            <MyBookCard key={index} volume={book} />
            <button
              className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
              onClick={() => removeFromShelf(book._id, shelf._id)}
            >
              remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shelf;
