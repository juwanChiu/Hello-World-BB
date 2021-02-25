import Head from 'next/head'
import Navbar from "../components/Nav";
import MainTable from "../components/Main-table";
import InputForm from "../components/Input-form";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hello World, BB</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"></link>
      </Head>
      <Navbar />
      <div className="slider-container">
        <MainTable cssClass="second-page" index={0} />
        <InputForm cssClass="first-page" index={1} />
      </div>

    </div>
  )
}
