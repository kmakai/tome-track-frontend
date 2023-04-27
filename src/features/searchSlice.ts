import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

type SearchState = {
  searchResults: any[];
};

const initialState: SearchState = {
  searchResults: ["sdsdsds", { name: "sdsdsds" }],
};

export const getSearchResults = createAsyncThunk(
  "search/getSearchResults",
  async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=the+cat+in+the+hat`
      );

      return res.data.items;
    } catch (err) {
      console.log(err);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // getSearchResults: (state, action) => {
    //   state.searchResults = action.payload;
    // },
  },
  extraReducers: {
    [getSearchResults.fulfilled.type]: (state, action) => {
      console.log(action.payload);
      const books = action.payload.map(({ volumeInfo }: any) => volumeInfo);
      state.searchResults = books;
    },
  },
});

export default searchSlice.reducer;
