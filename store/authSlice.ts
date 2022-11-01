import { TOKEN_KEY } from './../constant/app-constant';
import jwt from 'jsonwebtoken'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { myAxios } from "../config/axios-config"
import { initialStatus, Status } from "./common"
import { AppState } from "./store"

// Type for our state
export interface AuthState {
  authenticate: boolean,
  username: string,
  token: string,
  status: Status
}

// Initial state
const initialState: AuthState = {
  authenticate: false,
  username: '',
  token: '',
  status: initialStatus
}

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (payload: any, thunkAPI) => {
    try {
      // Fake api call here
      const username = payload.username
      const password = payload.password
      const response = await myAxios.post<string>('http://localhost:3000/api/account/authenticate', { username, password })

      return response.data
    }
    catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
export const getAccount = createAsyncThunk(
  'auth/getAccount',
  async (payload, thunkAPI) => {
    try {
      const valid = (await myAxios.get<boolean>('http://localhost:3000/api/account')).data
      if (!valid) return thunkAPI.rejectWithValue('signout')

      return valid
    }
    catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.authenticate = initialState.authenticate
      state.username = initialState.username
      state.token = initialState.token
      window.localStorage.removeItem(TOKEN_KEY)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state, action) => {
        state.authenticate = false
        state.username = ''
        state.token = ''
        state.status.isLoading = true
        state.status.error = false
        state.status.errorMessage = ''
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        const responseJwt = action.payload
        const payloadJwt = jwt.decode(responseJwt) as any
        console.log(payloadJwt)

        state.authenticate = true
        state.username = payloadJwt.username  // extract from jwt
        state.token = responseJwt
        state.status.isLoading = false

        window.localStorage.setItem(TOKEN_KEY, responseJwt)
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.status.isLoading = false
        state.status.error = true
        state.status.errorMessage = 'error during authentication'
      })
      .addCase(getAccount.pending, (state, action) => {
        state.authenticate = false
        state.username = ''
        state.token = ''
        state.status.isLoading = true
        state.status.error = false
        state.status.errorMessage = ''
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        const localJwt = window.localStorage.getItem(TOKEN_KEY) as string
        const payloadJwt = jwt.decode(localJwt) as any

        state.authenticate = true
        state.username = payloadJwt.username
        state.token = localJwt
        state.status.isLoading = false
        state.status.error = false
        state.status.errorMessage = ''
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.status.isLoading = false
        state.status.error = true
        state.status.errorMessage = 'error during getAccount'
        localStorage.removeItem(TOKEN_KEY)
        // then sign out
      })
  }
})

export const { resetAuthState } = authSlice.actions

export const selectAuthState = (state: AppState) => state.auth

export default authSlice.reducer