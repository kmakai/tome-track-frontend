import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type SearchState = {
  searchResults: any[];
  book: any;
};

const initialState: SearchState = {
  searchResults: [],
  book: {},
};

type SearchQuery = {
  query: string;
  index: number | string;
};

const getResults = async (query: SearchQuery) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query.query}&startIndex=${query.index}&maxResults=10`
    );

    return res.data.items;
  } catch (err) {
    console.log(err);
  }
};

const fetchBook = async (id: string) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSearchResults = createAsyncThunk(
  "search/getSearchResults",
  getResults
);

export const getBook = createAsyncThunk("search/getBook", fetchBook);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      const books = action.payload.map((book: any) => {
        return { ...book.volumeInfo, id: book.id };
      });
      state.searchResults = [...books];
    });

    builder.addCase(getBook.fulfilled, (state, action) => {
      state.book = { ...action.payload.volumeInfo, id: action.payload.id };
    });
  },
});

export const { clearResults } = searchSlice.actions;

export default searchSlice.reducer;
