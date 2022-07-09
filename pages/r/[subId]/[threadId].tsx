import type { NextPage } from 'next'
import { SAMPLE_THREAD } from '../../../constant'
import { CommonLayout } from '../../../layout/common-layout'

const ThreadPage: NextPage = (props: any) => {
  return (
    <CommonLayout>
      <div key={1}>{props.threadId}</div>
      <div key={2}>"_id" -- {props.thread._id}</div>
      <div key={3}>"title" -- {props.thread.title}</div>
      <div key={4}>"content" -- {props.thread.content}</div>
    </CommonLayout>
  )
}

export async function getStaticPaths() {
  // Get available path, (just the ID of URL)
  const paths = SAMPLE_THREAD.map((thread, _) => {
    return {
      params: {
        subId: '_',
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
  const thread = SAMPLE_THREAD.find(thread => thread._id === threadId)
  return {
    props: {
      threadId: threadId,
      thread: thread
    }
  }
}

export default ThreadPage
