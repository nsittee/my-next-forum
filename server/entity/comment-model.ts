import Mongoose from "mongoose"
import { tableName } from "./_table"

const name = tableName.comment
export interface IxComment extends Mongoose.Document {
  _id: string,
  Content: string,
  Commenter: any,
}

const schema = new Mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Content: String,
  Commenter: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableName.user
  }
})

export const Comment = Mongoose.models[name] || Mongoose.model(name, schema)
