import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useAppSelector } from "../hooks";
const Search: React.FC = () => {
  // const { searchResults } = useAppSelector((state) => state.search);
  return (
    <div className="flex items-center w-full justify-center p-4">
      <form className="flex items-center justify-center bg-slate-100 p-2 relative">
        <BiSearchAlt className="text-gray-400 text-2xl absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Book Search"
          className="border-none  text-gray-500 outline-none p-2 pl-10"
        />
      </form>

      <div>
        {/* {searchResults.map((result) => (
          <span>{result.title}</span>
        ))} */}
      </div>
    </div>
  );
};

export default Search;
