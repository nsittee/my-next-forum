import type { NextPage } from 'next'
import Link from 'next/link'
import { myAxios } from '../config/axios-config'
import { CommonLayout } from '../layout/common-layout'
import { ISub } from '../shared/model/sub.model'
import { IResponseEntity } from '../shared/response.model'

const Home: NextPage = (props: any) => {
  const sub: ISub = props.sub
  return (
    <CommonLayout>
      <li>
        {
          sub.SubThread!!.map((thread, _) => {
            if (!thread.SubParent?.SubLongName) return
            return <ol key={thread._id}>
              <Link href={`r/${thread.SubParent?.SubLongName}/${thread._id}`} >
                <a> {thread._id} --- {thread.Title}</a>
              </Link>
            </ol>
          })
        }
      </li>
    </CommonLayout>
  )
}

export async function getServerSideProps() {
  // get all thread data for Home page
  const sub = await myAxios.get<IResponseEntity<ISub>>('/api/threads/from-sub')
  return {
    props: {
      sub: sub.data.data
    }
  }
}

export default Home
