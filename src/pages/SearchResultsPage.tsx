import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import BookCard from "../components/BookCard";
import { getSearchResults } from "../features/searchSlice";

export const SearchResultsPage = () => {
  const { searchResults } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {searchResults.map((result) => (
        <BookCard key={result.id} volume={result} />
      ))}
      <button
        onClick={() => {
          setIndex((prev) => prev + 15);
          console.log(window.location.href.split("#")[1]);
          const query = window.location.href.split("#")[1];
          dispatch(getSearchResults({ query, index }));
        }}
      >
        load more
      </button>
    </div>
  );
};

export default SearchResultsPage;
