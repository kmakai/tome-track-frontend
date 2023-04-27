import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import "./index.css";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getSearchResults } from "./features/searchSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSearchResults());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="h-screen">
        <Search />
      </main>
    </>
  );
}

export default App;
