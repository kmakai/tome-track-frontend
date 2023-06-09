import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { refreshState } from "./features/userSlice";

import Menu from "./components/Menu";
import Main from "./pages/Main";
import BookPage from "./pages/BookPage";
import Favorites from "./pages/Favorites";
import MyBooks from "./pages/MyBooks";
import ReadBooks from "./pages/ReadBooks";
import ReadingNow from "./pages/ReadingNow";
import SearchResultsPage from "./pages/SearchResultsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShelvesPage from "./pages/ShelvesPage";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    if (user == null && token != null) {
      dispatch(refreshState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-full">
      <Router>
        <Header />
        <main className="h-full w-full flex flex-row-reverse relative">
          <div className="w-full grow p-4 flex flex-col gap-4 overflow-auto">
            <Search />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/book/:id" element={<BookPage />} />'
              <Route path="/my-books" element={<MyBooks />} />
              <Route path="/my-books/favorites" element={<Favorites />} />
              <Route path="/my-books/read" element={<ReadBooks />} />
              <Route path="/my-books/reading" element={<ReadingNow />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/my-shelves" element={<ShelvesPage />} />
            </Routes>
          </div>
          <Menu />
        </main>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
