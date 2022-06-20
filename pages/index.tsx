import type { NextPage } from 'next'
import { MyFooter } from '../components/my-footer'
import { MyHead } from '../components/my-head'

const Home: NextPage = () => {
  return (
    <div>
      <MyHead title="Home" />
      <div>
        Main page
      </div>
      <MyFooter />
    </div>
  )
}

export default Home
