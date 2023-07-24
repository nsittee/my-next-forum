import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./store/auth-slice";
import { createWrapper } from "next-redux-wrapper";
import { mainFeedSlice } from "./store/main-feed-slice";
import { mainSlice } from "./store/main-slice";

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [mainFeedSlice.name]: mainFeedSlice.reducer,
      [mainSlice.name]: mainSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);