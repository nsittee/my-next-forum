import { initialStatus } from '../common';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { ISub } from '../../model/sub.model';
import { IThread } from '../../model/thread.model';
import { IUser } from '../../model/user.model';
import { IResponseEntity } from '../../model/response.model';
import { HttpMethod, fetchApi } from '../../shared/http-client';

const initialState = {
  subId: '',
  subLongName: '',
  subMember: <IUser[]>[],
  threadList: <IThread[]>[],
  status: initialStatus
}

export type MainFeedState = Readonly<typeof initialState>;

export const getMainFeed = createAsyncThunk(
  'mainFeed/getMainFeed',
  async (_payload, thunkAPI) => {
    try {
      // const subResponse = (await myAxios.get<IResponseEntity<ISub>>(`/api/v1/thread/all`)).data.data
      const response: IResponseEntity<ISub> = await fetchApi(`/api/v1/thread/all`, HttpMethod.GET)
      return response.data
    }
    catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  })

export const mainFeedSlice = createSlice({
  name: "mainFeed",
  initialState,
  reducers: {
    resetMainFeedState(state) {
      state.subId = initialState.subId
      state.subLongName = initialState.subLongName
      state.subMember = initialState.subMember
      state.threadList = initialState.threadList
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMainFeed.pending, (state, action) => {
        state.subId = initialState.subId
        state.subLongName = initialState.subLongName
        state.subMember = initialState.subMember
        state.threadList = initialState.threadList
        state.status.isLoading = true
        state.status.error = initialState.status.error
        state.status.errorMessage = initialState.status.errorMessage
      })
      .addCase(getMainFeed.fulfilled, (state, action) => {
        const sub: ISub = action.payload
        state.subId = sub._id!!
        state.subLongName = sub.SubLongName!!
        state.subMember = sub.SubUser!!
        state.threadList = sub.SubThread!!
        state.status.isLoading = false
      })
      .addCase(getMainFeed.rejected, (state) => {
        state.status.isLoading = false
        state.status.error = true
        state.status.errorMessage = 'failed to get main feed'
      })
  }
})

export const { resetMainFeedState } = mainFeedSlice.actions

export const selectMainFeedState = (state: AppState) => state.mainFeed

export default mainFeedSlice.reducer