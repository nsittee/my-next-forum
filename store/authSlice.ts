import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "./store"

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
    resetAuthState(state) {
      state.authenticate = false
      state.username = ''
    }
  },
})

export const { setAuthState, resetAuthState } = authSlice.actions

export const selectAuthState = (state: AppState) => state.auth

export default authSlice.reducer