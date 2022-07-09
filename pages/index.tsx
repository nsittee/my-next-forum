import type { NextPage } from 'next'
import Link from 'next/link'
import { IThread, SAMPLE_THREAD } from '../constant'
import { CommonLayout } from '../layout/common-layout'

const Home: NextPage = (props: any) => {
  return (
    <CommonLayout>
      <li>
        {
          (props.threadList as IThread[]).map((thread, _) => {
            return <ol>
              <Link href={`r/${thread._id}`} >
                <a> {thread.title} --- {thread.content}</a>
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
  const availableThread = SAMPLE_THREAD
  return {
    props: {
      threadList: availableThread
    }
  }
}

export default Home
