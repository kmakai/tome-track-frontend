import React, { useEffect } from "react";
import MyBookCard from "../components/MyBookCard";
import { useAppSelector, useAppDispatch } from "../hooks";
import axios from "axios";
import { refreshFavorites } from "../features/userSlice";
import { toast } from "react-toastify";
import { IBook } from "../interfaces";
const API_URI = "https://tome-track-backend-production.up.railway.app/api/v1";

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.user.user?.token);

  const removeFromFavorites = async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.patch(
        API_URI + "/books/favorite/remove",
        {
          id: id,
        },
        config
      );

      if (res.status === 200) toast.success(res.data.message);
      setTimeout(() => {
        dispatch(refreshFavorites());
      }, 1500);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    dispatch(refreshFavorites());
  }, [dispatch]);

  return (
    <>
      <h2>My Favorites</h2>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
        {favorites &&
          favorites.map((book: IBook) => (
            <div className="flex flex-col" key={book.volumeId}>
              <MyBookCard key={book.volumeId} volume={book} />
              <button
                className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
                onClick={() => book._id && removeFromFavorites(book._id)}
              >
                remove
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Favorites;
