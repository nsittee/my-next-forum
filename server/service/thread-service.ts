import dbConnect from "../config/db-config"
import { IxThread, Thread } from "../model/thread-model"

const getAll = async (): Promise<IxThread[]> => {
  await dbConnect()

  let list: IxThread[] = []
  list = await Thread.find().exec()
  return Promise.resolve(list)
}

export const threadService = { getAll }