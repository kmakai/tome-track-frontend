import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
