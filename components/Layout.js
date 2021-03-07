import Head from 'next/head'
import Navbar from "./Nav";
import InputForm from "./Input-form";
import SliderContainer from "./Slider-container";


const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <Navbar />
      <SliderContainer>
        {children}
        <InputForm index={1} />
      </SliderContainer>
    </>
  );
}

export default Layout;