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
  return response.data;
});

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
      };
      state.myBooks = action.payload.user.myBooks;
      state.favorites = action.payload.user.favoritesBooks;
      state.readBooks = action.payload.user.readBooks;
      state.readingNow = action.payload.user.readingNow;
      state.myShelves = action.payload.user.myShelves;
    });
  },
});

export default userSlice.reducer;
