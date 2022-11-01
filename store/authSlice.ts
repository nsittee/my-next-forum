import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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
      const jwtResponse: string = `${username}:${password}`

      return jwtResponse
    }
    catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
export const getAccount = createAsyncThunk(
  'auth/getAccount',
  async (payload: any, thunkAPI) => {
    try {
      // Api call here, put JWT in header from axios
      // const username: string = payload
      // console.log(username)
      // const response = (await myAxios.get<string>(`${appConstant.URL}api/account`)).data.data
      return payload
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
        const jwt = action.payload
        state.authenticate = true
        state.username = action.payload  // extract from jwt
        state.token = jwt
        state.status.isLoading = false
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
        state.authenticate = true
        state.username = action.payload.username
        state.token = action.payload.username
        state.status.isLoading = false
        state.status.error = false
        state.status.errorMessage = ''
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.status.isLoading = false
        state.status.error = true
        state.status.errorMessage = 'error during authentication'
        // then sign out
      })
  }
})

export const { resetAuthState } = authSlice.actions

export const selectAuthState = (state: AppState) => state.auth

export default authSlice.reducer