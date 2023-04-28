import React from "react";
import { useAppSelector } from "../hooks";
import BookCard from "../components/BookCard";

export const SearchResultsPage = () => {
  const { searchResults } = useAppSelector((state) => state.search);
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {searchResults.map((result) => (
        <BookCard key={result.id} volume={result} />
      ))}
    </div>
  );
};

export default SearchResultsPage;
