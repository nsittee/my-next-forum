import Head from 'next/head'
import { useSelector } from 'react-redux'
import { appConstant } from '../constant/app-constant'
import { selectMainState } from '../store/mainSlice'

export const MyHead = (props: any) => {
  const mainState = useSelector(selectMainState)
  return (
    <Head>
      <title>{mainState.title}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href={`${appConstant.CONTEXT_PATH}/favicon.ico`} />
    </Head>
  )
}
