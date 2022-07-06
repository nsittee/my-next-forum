import type { NextPage } from 'next'
import { IThread, SAMPLE_THREAD } from '../constant'
import { CommonLayout } from '../layout/common-layout'

const Home: NextPage = (props: any) => {
  return (
    <CommonLayout>
      {
        (props.threadList as IThread[]).map((thread, _) => {
          return <div key={thread._id}>
            {thread.title} --- {thread.content}
          </div>
        })
      }
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
