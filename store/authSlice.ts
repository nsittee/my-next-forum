import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "./store"
import { HYDRATE } from "next-redux-wrapper"

// Type for our state
export interface AuthState {
  authenticate: boolean,
  username: string
}

// Initial state
const initialState: AuthState = {
  authenticate: false,
  username: ''
}

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state, action) {
      state.authenticate = action.payload.authenticate
      state.username = action.payload.username
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     }
    //   },
    // },
  },
})

export const { setAuthState } = authSlice.actions

export const selectAuthState = (state: AppState) => state.auth

export default authSlice.reducer