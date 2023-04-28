import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { getSearchResults } from "../features/searchSlice";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search");

    if (!query) return;

    dispatch(getSearchResults(query as string));
    navigate("/search");
  };

  return (
    <div className="flex items-center w-full justify-center p-4">
      <form
        className="flex items-center justify-center bg-slate-100 p-2 relative"
        onSubmit={submitHandler}
      >
        <BiSearchAlt className="text-gray-400 text-2xl absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          name="search"
          id="search"
          type="text"
          placeholder="Book Search"
          className="border-none  text-gray-500 outline-none p-2 pl-10"
        />
      </form>
    </div>
  );
};

export default Search;
