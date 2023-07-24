import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import jwt from 'jsonwebtoken'
import { Status } from "./common"
import { AppState } from "../store"
import { myAxios, getUrl } from "../../../src/config/axios-config"
import { appConstant, TOKEN_KEY } from "../../../src/constant/app-constant"

// Type for our state
export interface AuthState {
  authenticate: boolean,
  username: string,
  roles: string[],
  token: string,
  status: Status
}

// Initial state
const initialState: AuthState = {
  authenticate: false,
  username: '',
  roles: [],
  token: '',
  status: {
    isLoading: true,
    error: false,
    errorMessage: '',
    successMessage: '',
  }
}

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (payload: any, thunkAPI) => {
    try {
      // Fake api call here
      const body = {
        username: payload.username,
        password: payload.password
      }
      const response = await myAxios.post<string>(`${getUrl()}/api/account/authenticate`, body)

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
      const valid = (await myAxios.get<boolean>(`${getUrl()}/api/account`)).data
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
    setNotAuthenticate(state) {
      state.authenticate = false
      state.username = ''
      state.status.isLoading = false
      state.status.error = false
      state.status.errorMessage = ''
    },
    resetAuthState(state) {
      // Commented out for clean signout
      // state.authenticate = initialState.authenticate
      // state.username = initialState.username
      // state.token = initialState.token
      document.location.href = appConstant.CONTEXT_PATH
      window.localStorage.removeItem(TOKEN_KEY)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state, action) => {
        state.authenticate = false
        state.username = ''
        state.roles = []
        state.token = ''
        state.status.isLoading = true
        state.status.error = false
        state.status.errorMessage = ''
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        const responseJwt = action.payload
        const payloadJwt = jwt.decode(responseJwt) as any

        // Commented out for clean signin
        // state.authenticate = true
        // state.username = payloadJwt.username  // extract from jwt
        // state.token = responseJwt
        // state.status.isLoading = false

        // document.location.href = appConstant.CONTEXT_PATH
        document.location.reload()  // after signed in, stay on the same page
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
        state.roles = (payloadJwt.auth as string).split(',')
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
        document.location.href = appConstant.CONTEXT_PATH
        // then sign out
      })
  }
})

export const { resetAuthState, setNotAuthenticate } = authSlice.actions

export const selectAuthState = (state: AppState) => state.auth

export default authSlice.reducer