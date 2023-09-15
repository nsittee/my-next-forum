import dbConnect from "../config/db-config"
import { IxSub, Sub } from "../entity/sub-model"
import { IxThread, Thread } from "../entity/thread-model"

export const getSubFromId = async (subName: string): Promise<IxSub> => {
  await dbConnect()

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

  return Promise.resolve(list)
}

const getThreadFromId = async (threadId: string): Promise<IxThread> => {
  const searchThread = await Thread.findById(threadId)
    .populate('Author', 'Username')
    .exec()

  return Promise.resolve(searchThread)
}

export const threadService = { getAll, getSubFromId, getThreadFromId }