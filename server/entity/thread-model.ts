import Mongoose from "mongoose"
import { tableName } from "./_table"

const name = tableName.thread
export interface IxThread extends Mongoose.Document {
  _id: string,
  Title: string,
  Content: string,
  Upvote: number,
  Downvote: number,
  CreatedDate: Date,
  Author: any,
  ThreadComment: any,
  SubParent: any,

  vote: string,
}

const schema = new Mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Title: String,
  Content: String,
  Upvote: { type: Number, default: 0 },
  Downvote: { type: Number, default: 0 },
  CreatedDate: { type: Date, default: Date.now() },

  Author: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.user
  },
  ThreadComment: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.comment
  }],
  SubParent: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.sub
  }
})

export const Thread = Mongoose.models[name] || Mongoose.model<IxThread>(name, schema)
