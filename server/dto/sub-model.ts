import Mongoose from "mongoose"
import { tableName } from "./_table"

const name = tableName.sub
export interface IxSub extends Mongoose.Document {
  _id: string,
  SubLongName: string,
  SubShortName: string,
  SubUser: any,
  SubThread: any,
}

const schema = new Mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  SubLongName: String,
  SubShortName: String,

  SubUser: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.user
  }],
  SubThread: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.thread
  }]

})

export const Sub = Mongoose.models[name] || Mongoose.model<IxSub>(name, schema)