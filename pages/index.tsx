import type { NextPage } from 'next'
import { CommonLayout } from '../layout/common-layout'

const Home: NextPage = (props: any) => {
  return (
    <CommonLayout>
      {
        (props.threadList as number[]).map((val, _) => {
          return <div key={val}>
            {val}
          </div>
        })
      }
    </CommonLayout>
  )
}

export async function getServerSideProps() {
  // get all thread data for Home page
  return {
    props: {
      threadList: [
        0, 1, 2
      ],
    }
  }
}

export default Home
