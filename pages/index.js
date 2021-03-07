import Head from 'next/head'
import MainTable from "../components/Main-table";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hello World, BB</title>
      </Head>
      <MainTable index={0} />
    </>
  )
}
