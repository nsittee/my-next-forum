import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

const initialState = {
  title: 'my-forum',
  notification: 0,
  isLoading: false,
}

export type MainState = Readonly<typeof initialState>

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload
    },
    resetTitle(state) {
      state.title = initialState.title
    }
  }
})

export const { setTitle, resetTitle } = mainSlice.actions

export const selectMainState = (state: AppState) => state.main

export default mainSlice.reducer