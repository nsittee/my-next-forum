import type { NextPage } from 'next'
import Link from 'next/link'
import { myAxios } from '../../../config/axios-config'
import { CommonLayout } from '../../../layout/common-layout'
import { ISub } from '../../../shared/model/sub.model'
import { IThread } from '../../../shared/model/thread.model'
import { IResponseEntity } from '../../../shared/response.model'

const ThreadPage: NextPage = (props: any) => {
  const thread: IThread = props.thread
  return (
    <CommonLayout>
      {thread && <>
        <div key={1}>{thread._id}</div>
        <div key={2}>_id -- {thread._id}</div>
        <div key={3}>Title -- {thread.Title}</div>
        <div key={4}>Content -- {thread.Content}</div>
        <div>
          <Link href={'/'}>
            <a>Home</a>
          </Link>
        </div>
      </>
      }
    </CommonLayout>
  )
}

export async function getStaticPaths() {
  // Get available path, (just the ID of URL)
  const sub = await myAxios.get<IResponseEntity<ISub>>('/api/threads/from-sub')
  // Thread without proper sub (broken data) will be ignored
  const cleanedSub = sub.data.data.SubThread?.filter(thread => thread.SubParent)
  const paths = cleanedSub?.map((thread) => {
    if (!thread || !thread.SubParent) return
    return {
      params: {
        subName: thread.SubParent!!.SubLongName,
        threadId: thread._id,
      }
    }
  })
  return {
    paths: paths,
    fallback: true
  }
}

export async function getStaticProps(props: any) {
  let thread: IThread
  // Get the rest of the page props, the rest of the thread data
  try {
    const threadId = props.params.threadId
    const res = await myAxios.get<IResponseEntity<IThread>>(`/api/threads/${threadId}`)
    thread = res.data.data
  } catch {
    // Handle non-existing page with `notFound` property
    return {
      notFound: true
    }
  }
  return {
    props: {
      threadId: thread._id,
      thread: thread
    },
  }
}

export default ThreadPage
