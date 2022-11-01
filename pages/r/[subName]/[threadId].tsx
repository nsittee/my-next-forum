import type { NextPage } from 'next'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { myAxios } from '../../../config/axios-config'
import { ISub } from '../../../shared/model/sub.model'
import { IThread } from '../../../shared/model/thread.model'
import { IResponseEntity } from '../../../shared/response.model'
import { selectAuthState } from '../../../store/authSlice'

const ThreadPage: NextPage = (props: any) => {
  const authState = useSelector(selectAuthState)
  const thread: IThread = props.thread

  return (
    <div>
      <ul>
        {thread && <>
          {authState.authenticate &&
            <li>reading as `{authState.username}`</li>
          }
          <li>{thread._id}</li>
          <li>_id -- {thread._id}</li>
          <li>Title -- {thread.Title}</li>
          <li>Content -- {thread.Content}</li>
          <li>CreatedDate -- {thread.CreatedDate}</li>
          <li>Upvote -- {thread.Upvote}</li>
          <li>Downvote -- {thread.Downvote}</li>
          <li>
            <button>
              <Link href={'/'}><a>Home</a></Link>
            </button>
          </li>
        </>
        }
      </ul>
    </div>
  )
}

export const getStaticPaths = async () => {
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

export const getStaticProps = async (props: any) => {
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
