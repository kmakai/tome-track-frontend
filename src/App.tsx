import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import "./index.css";

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { getSearchResults } from "./features/searchSlice";
import Menu from "./components/Menu";
import Main from "./pages/Main";
import Favorites from "./pages/Favorites";
import MyBooks from "./pages/MyBooks";
import ReadBooks from "./pages/ReadBooks";

function App() {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getSearchResults());
  // }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <main className="h-screen relative">
          <Search />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/my-books/favorites" element={<Favorites />} />
            <Route path="/my-books/read" element={<ReadBooks />} />
          </Routes>
          <Menu />
        </main>
      </Router>
    </>
  );
}

export default App;
