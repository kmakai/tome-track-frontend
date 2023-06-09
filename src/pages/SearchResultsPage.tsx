import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import BookCard from "../components/BookCard";
import { getSearchResults } from "../features/searchSlice";

export const SearchResultsPage = () => {
  const { searchResults } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  return (
    <div className="grid gap-4 h-full w-full col-start-2 col-end-5 grid-cols-3 md:grid-cols-5">
      {searchResults.map((result, index) => (
        <BookCard key={index} volume={result} />
      ))}

      {searchResults.length > 0 && (
        <div className="flex justify-between h-10">
          <button
            className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
            onClick={() => {
              setIndex((prev) => (prev === 0 ? prev : prev - 10));
              const query = window.location.href.split("#")[1];
              dispatch(getSearchResults({ query, index }));
            }}
          >
            prev page
          </button>
          <button
            className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
            onClick={() => {
              setIndex((prev) => prev + 10);
              const query = window.location.href.split("#")[1];
              dispatch(getSearchResults({ query, index }));
            }}
          >
            next page
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
