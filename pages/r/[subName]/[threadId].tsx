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
      <div key={1}>{thread._id}</div>
      <div key={2}>"_id" -- {thread._id}</div>
      <div key={3}>"Title" -- {thread.Title}</div>
      <div key={4}>"Content" -- {thread.Content}</div>
      <div>
        <Link href={'/'}>
          <a>Home</a>
        </Link>
      </div>
    </CommonLayout>
  )
}

export async function getStaticPaths() {
  // Get available path, (just the ID of URL)
  const sub = await myAxios.get<IResponseEntity<ISub>>('/api/threads/from-sub')
  const paths = sub.data.data.SubThread?.map((thread) => {
    return {
      params: {
        subName: thread.SubParent ? thread.SubParent!!.SubLongName : "",
        threadId: thread._id,

      }
    }
  })
  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps(props: any) {
  // Get the rest of the page props, the rest of the thread data
  const threadId = props.params.threadId
  const thread = await myAxios.get<IResponseEntity<IThread>>(`/api/threads/${threadId}`)
  return {
    props: {
      threadId: threadId,
      thread: thread.data.data
    }
  }
}

export default ThreadPage
