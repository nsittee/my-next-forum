import dbConnect from "../config/db-config"
import { IxUser, User } from "../dto/user-model"

const getAll = async (): Promise<IxUser[]> => {
  await dbConnect()

  let list: IxUser[] = []
  list = await User.find().exec()
  return Promise.resolve(list)
}

export const userService = { getAll }