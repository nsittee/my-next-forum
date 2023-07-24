import Mongoose from "mongoose"
import { tableName } from "./_table"

const name = tableName.user
export interface IxUser extends Mongoose.Document {
  _id: string,
  Username: string,
  Password: string,
  UpvoteThread: any,
  DownvoteThread: any,
  UserThread: any,
  UserSub: any,
}

const schema = new Mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },

  UpvoteThread: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.thread
  }],
  DownvoteThread: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.thread
  }],
  UserThread: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.thread
  }],
  UserSub: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.sub
  }]
})

export const User = Mongoose.models[name] || Mongoose.model<IxUser>(name, schema)