import dbConnect from "../config/db-config"
import { IxSub, Sub } from "../model/sub-model"
import { Thread } from "../model/thread-model"

export const getSubFromId = async (subName: string): Promise<IxSub> => {
  const sub = await Sub
    .findOne()
    .where({ SubLongName: subName })
    .exec()

  return sub
}

const getAll = async (subId?: string): Promise<any[]> => {
  await dbConnect()

  let list: any[] = []

  if (subId != null) {
    list = await Thread.find()
      .populate('Author', 'Username')
      .populate('SubParent', ['SubLongName', 'SubShortName'])
      .where({ SubParent: subId })
      .sort({ CreatedDate: -1 })
      .lean()
      .exec()
  } else {
    list = await Thread.find()
      .populate('Author', 'Username')
      .populate('SubParent', ['SubLongName', 'SubShortName'])
      .sort({ CreatedDate: -1 })
      .lean()
      .exec()
  }

  console.log(list[0])
  return Promise.resolve(list)
}

export const threadService = { getAll, getSubFromId }