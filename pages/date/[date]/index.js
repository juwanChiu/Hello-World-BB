import Head from 'next/head'
import { useRouter } from "next/router";
import DateTable from "../../../components/Date-table";


const index = () => {
  const router = useRouter();
  const { date } = router.query;

  return (
    <>
      <Head>
        <title>Hello World, BB on {date}</title>
      </Head>
      <DateTable date={date} index={0} />
    </>
  )
}


export default index;