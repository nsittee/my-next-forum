import { createSlice } from "@reduxjs/toolkit";
import { ISub } from '../shared/model/sub.model';
import { IUser } from '../shared/model/user.model';
import { IThread } from './../shared/model/thread.model';
import { AppState } from "./store";

const initialState = {
  subId: '',
  subLongName: '',
  subMember: <IUser[]>[],
  threadList: <IThread[]>[]
}

export type MainFeedState = Readonly<typeof initialState>;

export const mainFeedSlice = createSlice({
  name: "mainFeed",
  initialState,
  reducers: {
    setMainFeedState(state, action) {
      // action.payload.subName
      const sub: ISub = action.payload.sub
      state.subId = sub._id!!
      state.subLongName = sub.SubLongName!!
      state.subMember = sub.SubUser!!
      state.threadList = sub.SubThread!!
    },
    resetMainFeedState(state) {
      state.subId = initialState.subId
      state.subLongName = initialState.subLongName
      state.subMember = initialState.subMember
      state.threadList = initialState.threadList
    }
  },
})

export const { setMainFeedState } = mainFeedSlice.actions

export const selectMainFeedState = (state: AppState) => state.mainFeed

export default mainFeedSlice.reducer