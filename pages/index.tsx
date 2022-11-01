import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMainFeed, selectMainFeedState } from '../store/mainFeedSlice'

const Home: NextPage = (props: any) => {
  const dispatch = useDispatch()
  // const [sub, setSub] = useState<ISub>(defaultSub) // for useEffect, CSR
  const mainFeedState = useSelector(selectMainFeedState)
  // const sub: ISub = props.sub // for getServerSideProps, SSR

  useEffect(() => {
    dispatch(getMainFeed())
  }, [dispatch])

  return (
    <div>
      <button onClick={() => dispatch(getMainFeed())}>
        refresh
      </button>
      {
        mainFeedState.mainFeedStatus.loading ?
          <div>
            loading...
          </div>
          :
          mainFeedState.mainFeedStatus.error ?
            <div>something wrong: {mainFeedState.mainFeedStatus.errorMessage}</div>
            :
            <ul>
              {
                mainFeedState.threadList.map((thread, _) => {
                  if (!thread.SubParent?.SubLongName) return
                  return <li key={thread._id}>
                    <Link href={{
                      pathname: `r/${thread.SubParent?.SubLongName}/${thread._id}`,
                      query: {
                        from: 'mainFeed'
                      }
                    }}>
                      <a> {thread._id} --- {thread.Title}</a>
                    </Link>
                  </li>
                })
              }
            </ul>
      }
    </div>
  )
}

// For SSR
// export async function getServerSideProps() {
//   // get all thread data for Home page
//   const sub = await myAxios.get<IResponseEntity<ISub>>('/api/threads/from-sub')
//   return {
//     props: {
//       sub: sub.data.data
//     }
//   }
// }

export default Home
