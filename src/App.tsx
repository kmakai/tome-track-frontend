import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Main from "./pages/Main";
import BookPage from "./pages/BookPage";
import Favorites from "./pages/Favorites";
import MyBooks from "./pages/MyBooks";
import ReadBooks from "./pages/ReadBooks";
import ReadingNow from "./pages/ReadingNow";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <div className="min-h-full">
      <Router>
        <Header />
        <main className="h-full w-full flex flex-row-reverse relative">
          <div className="w-full grow p-4 flex flex-col gap-4 overflow-auto">
            <Search />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/book/:id" element={<BookPage />} />'
              <Route path="/my-books" element={<MyBooks />} />
              <Route path="/my-books/favorites" element={<Favorites />} />
              <Route path="/my-books/read" element={<ReadBooks />} />
              <Route path="/my-books/reading" element={<ReadingNow />} />
              <Route path="/search" element={<SearchResultsPage />} />
            </Routes>
          </div>
          <Menu />
        </main>
      </Router>
    </div>
  );
}

export default App;
