import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type SearchState = {
  searchResults: any[];
};

const initialState: SearchState = {
  searchResults: [],
};

type Searchquery = {
  query: string;
  index: number | string;
};

const getResults = async (query: Searchquery) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query.query}&startIndex=${query.index}&maxResults=10`
    );

    return res.data.items;
  } catch (err) {
    console.log(err);
  }
};

export const getSearchResults = createAsyncThunk(
  "search/getSearchResults",
  getResults
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: {
    [getSearchResults.fulfilled.type]: (state, action) => {
      console.log(action.payload);
      const books = action.payload.map((book: any) => {
        return { ...book.volumeInfo, id: book.id };
      });
      state.searchResults = [...books];
    },
  },
});

export const { clearResults } = searchSlice.actions;

export default searchSlice.reducer;
