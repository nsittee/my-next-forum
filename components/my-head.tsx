import Head from 'next/head'

export const MyHead = (props: any) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
