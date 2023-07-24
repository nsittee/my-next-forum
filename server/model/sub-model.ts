import Mongoose from "mongoose"
import tableConstant from "./table-constant"

const name = tableConstant.sub
export interface IxSub extends Mongoose.Document {
  _id: string,
  SubLongName: string,
  SubShortName: string,
  SubUser: any,
  SubThread: any,
}

const subSchema = new Mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  SubLongName: String,
  SubShortName: String,

  SubUser: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableConstant.user
  }],
  SubThread: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableConstant.thread
  }]

})

export const Sub = Mongoose.models[name] || Mongoose.model<IxSub>(name, subSchema)