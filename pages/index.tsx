import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myAxios } from '../config/axios-config'
import { appConstant } from '../constant/app-constant'
import { defaultSub, ISub } from '../shared/model/sub.model'
import { IResponseEntity } from '../shared/response.model'
import { setAuthState } from '../store/authSlice'
import { selectMainFeedState, setMainFeedState } from '../store/mainFeedSlice'
import { wrapper } from '../store/store'

const Home: NextPage = (props: any) => {
  const dispatch = useDispatch()
  // const [sub, setSub] = useState<ISub>(defaultSub) // for useEffect, CSR
  const mainFeedState = useSelector(selectMainFeedState)
  // const sub: ISub = props.sub // for getServerSideProps, SSR

  const fetchList = async () => {
    const subResponse = (await myAxios.get<IResponseEntity<ISub>>(`${appConstant.URL}api/threads/from-sub`)).data.data
    dispatch(setMainFeedState({
      sub: subResponse
    }))
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div>
      <button onClick={() => {
        fetchList()
      }}>
        refresh
      </button>
      <li>
        {
          mainFeedState.threadList.map((thread, _) => {
            if (!thread.SubParent?.SubLongName) return
            return <ol key={thread._id}>
              <Link href={`r/${thread.SubParent?.SubLongName}/${thread._id}`} >
                <a> {thread._id} --- {thread.Title}</a>
              </Link>
            </ol>
          })
        }
      </li>
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
