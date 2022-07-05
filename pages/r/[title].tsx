import type { NextPage } from 'next'
import { CommonLayout } from '../../layout/common-layout'

const Default: NextPage = (props: any) => {
  return (
    <CommonLayout>
      Default - {props.title}
    </CommonLayout>
  )
}

export async function getStaticPaths() {
  const paths = [
    { params: { title: '1' } },
    { params: { title: '2' } },
    { params: { title: '3' } },
    { params: { title: '4' } },
  ]
  return { paths, fallback: false }
}
export async function getStaticProps({ params }: any) {
  return {
    props: {
      title: params.title
    }
  }
}

export default Default
