import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { IBook, IShelf, IUser } from "../interfaces";

const API_URI = "http://localhost:3000/api/v1";

interface UserState {
  user: IUser | null;
  myBooks: IBook[] | null;
  favorites: IBook[] | null;
  readBooks: IBook[] | null;
  readingNow: IBook[] | null;
  myShelves: IShelf[] | null;
}

const initialState: UserState = {
  user: null,
  myBooks: null,
  favorites: null,
  readBooks: null,
  readingNow: null,
  myShelves: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (formData: { email: string; password: string }) => {
    const response = await axios.post(API_URI + "/user/login", formData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);

export const saveBook = createAsyncThunk(
  "user/saveBook",
  async ({ book, token }: { book: IBook; token: string }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URI + "/user/saveBook", book, config);
    return response.data;
  }
);

export const refreshState = createAsyncThunk("user/refreshState", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URI + "/user/refresh", config);
    response.data.token = token;
    return response.data;
  } else {
    window.location.href = "/";
  }
});

export const refreshShelves = createAsyncThunk(
  "user/refreshShelves",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URI + "/shelf/getAll", config);

      return res.data.shelves;
    }
  }
);

export const refreshMyBooks = createAsyncThunk(
  "user/refreshMyBooks",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URI + "/user/myBooks", config);
      return res.data.books;
    }
  }
);

export const refreshReadBooks = createAsyncThunk(
  "user/refreshReadBooks",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URI + "/user/readBooks", config);
      return res.data.books;
    }
  }
);

export const refreshFavorites = createAsyncThunk(
  "user/refreshFavorites",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URI + "/user/myFavorites", config);
      return res.data.books;
    }
  }
);

export const refreshReadingNow = createAsyncThunk(
  "user/refreshReadingNow",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URI + "/user/readingNow", config);
      return res.data.books;
    }
  }
);

/// Shelf Management reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      state.myBooks = null;
      state.favorites = null;
      state.readBooks = null;
      state.readingNow = null;
      state.myShelves = null;
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      toast.success("Login Successful");
      state.user = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        email: action.payload.user.email,
        token: action.payload.token,
      };
      state.myBooks = action.payload.user.myBooks;
      state.favorites = action.payload.user.favoriteBooks;
      state.readBooks = action.payload.user.readBooks;
      state.readingNow = action.payload.user.readingNow;
      state.myShelves = action.payload.user.myShelves;
    });

    builder.addCase(refreshState.fulfilled, (state, action) => {
      state.user = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        email: action.payload.user.email,
        token: action.payload.token,
      };
      state.myBooks = action.payload.user.myBooks;
      state.favorites = action.payload.user.favoriteBooks;
      state.readBooks = action.payload.user.readBooks;
      state.readingNow = action.payload.user.readingNow;
      state.myShelves = action.payload.user.myShelves;
    });

    builder.addCase(refreshShelves.fulfilled, (state, action) => {
      state.myShelves = action.payload;
    });
    0;
    builder.addCase(refreshMyBooks.fulfilled, (state, action) => {
      state.myBooks = action.payload;
    });
    builder.addCase(refreshFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
    builder.addCase(refreshReadBooks.fulfilled, (state, action) => {
      state.readBooks = action.payload;
    });
    builder.addCase(refreshReadingNow.fulfilled, (state, action) => {
      state.readingNow = action.payload;
    });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
