import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: any;
  myBooks: any;
  favorites: any;
  readBooks: any;
  readingNow: any;
  myShelves: any;
}

const initialState: UserState = {
  user: null,
  myBooks: null,
  favorites: null,
  readBooks: null,
  readingNow: null,
  myShelves: null,
};

export const login = createAsyncThunk("user/login", async (formData: any) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/user/login",
    formData
  );
  localStorage.setItem("token", response.data.token);
  return response.data;
});

export const saveBook = createAsyncThunk(
  "user/saveBook",
  async ({ book, token }: { book: any; token: string }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/saveBook",
      book,
      config
    );
    return response.data;
  }
);

export const refreshState = createAsyncThunk(
  "user/refreshState",
  async (state) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/refresh",
        config
      );
      response.data.token = token;
      return response.data;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
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
      console.log(action.payload);
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
  },
});

export default userSlice.reducer;
