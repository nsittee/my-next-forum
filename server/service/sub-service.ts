import dbConnect from "../config/db-config"
import { IxSub, Sub } from "../dto/sub-model"

const getAll = async (): Promise<IxSub[]> => {
  await dbConnect()

  let list: IxSub[] = []
  list = await Sub.find().exec()
  return Promise.resolve(list)
}

export const subService = { getAll }