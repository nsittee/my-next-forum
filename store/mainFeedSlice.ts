import { initialStatus } from './common';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myAxios } from "../config/axios-config";
import { appConstant } from "../constant/app-constant";
import { ISub } from '../shared/model/sub.model';
import { IUser } from '../shared/model/user.model';
import { IResponseEntity } from "../shared/response.model";
import { IThread } from './../shared/model/thread.model';
import { AppState } from "./store";

const initialState = {
  subId: '',
  subLongName: '',
  subMember: <IUser[]>[],
  threadList: <IThread[]>[],
  mainFeedStatus: initialStatus
}

export type MainFeedState = Readonly<typeof initialState>;

export const getMainFeed = createAsyncThunk(
  'mainFeed/getMainFeed',
  async (_payload, thunkAPI) => {
    try {
      const subResponse = (await myAxios.get<IResponseEntity<ISub>>(`${appConstant.URL}api/threads/from-sub`)).data.data
      return subResponse;
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
        state.mainFeedStatus.loading = initialState.mainFeedStatus.loading
        state.mainFeedStatus.error = initialState.mainFeedStatus.error
        state.mainFeedStatus.errorMessage = initialState.mainFeedStatus.errorMessage
      })
      .addCase(getMainFeed.fulfilled, (state, action) => {
        const sub: ISub = action.payload
        state.subId = sub._id!!
        state.subLongName = sub.SubLongName!!
        state.subMember = sub.SubUser!!
        state.threadList = sub.SubThread!!
        state.mainFeedStatus.loading = false
      })
      .addCase(getMainFeed.rejected, (state) => {
        state.mainFeedStatus.loading = false
        state.mainFeedStatus.error = true
        state.mainFeedStatus.errorMessage = 'failed to get main feed'
      })
  }
})

export const { resetMainFeedState } = mainFeedSlice.actions

export const selectMainFeedState = (state: AppState) => state.mainFeed

export default mainFeedSlice.reducer