import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ssgAxios } from '../../../src/config/axios-config'
import { IThread } from '../../../src/model/thread.model'
import { IResponseEntity } from '../../../src/model/response.model'
import { selectAuthState } from '../../../app/redux/store/auth-slice'
import { setTitle } from '../../../app/redux/store/main-slice'

const ThreadPage: NextPage = (props: any) => {
  const router = useRouter()
  const authState = useSelector(selectAuthState)
  const thread: IThread = props.thread
  const dispatch = useDispatch()

  useEffect(() => {
    var title = thread.Title ? thread.Title : "reading..."
    dispatch(setTitle(title))
  }, [dispatch, thread])

  return (
    <div>
      <div>
        {authState.authenticate &&
          <>
            <p>reading as `{authState.username}`</p>
          </>
        }
        {router.query.from === 'mainFeed' &&
          <p>Comes from MainFeed</p>
        }
      </div>
      <ul>
        {thread && <>
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
  // FIXME: bring back this function later

  // // Get available path, (just the ID of URL)
  // const sub = await ssgAxios.get<IResponseEntity<ISub>>('/api/threads/from-sub')
  // // Thread without proper sub (broken data) will be ignored
  // const cleanedSub = sub.data.data.SubThread?.filter(thread => thread.SubParent)
  // const paths = cleanedSub?.map((thread) => {
  //   if (!thread || !thread.SubParent) return
  //   return {
  //     params: {
  //       subName: thread.SubParent!!.SubLongName,
  //       threadId: thread._id,
  //     }
  //   }
  // })
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps = async (props: any) => {
  let thread: IThread
  // Get the rest of the page props, the rest of the thread data
  try {
    const threadId = props.params.threadId
    const res = await ssgAxios.get<IResponseEntity<IThread>>(`/api/threads/${threadId}`)
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
