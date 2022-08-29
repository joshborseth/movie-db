import { useState } from "react";
import { NextPage } from "next";
import Header from "../components/Header";
import SignInBtn from "../components/SignInBtn";
import Slider from "../components/Slider";
import SubHeader from "../components/SubHeader";
import Head from "next/head";
const Home: NextPage = () => {
  const [category, setCategory] = useState("popular");
  return (
    <>
      <Head>
        <title>JB Movies | Home</title>
      </Head>
      <div className="h-full w-full bg-primary">
        <header>
          <Header />
          <SubHeader setCategory={(category: string) => setCategory(category)} />
        </header>
        <main>
          <h1 className="my-8 text-center text-5xl font-bold capitalize text-secondary">{category.includes("_") ? category.replace("_", " ") : category}</h1>
          <Slider category={category} />
        </main>
        <footer className="flex items-center justify-center bg-primary pb-20">
          <SignInBtn />
        </footer>
      </div>
    </>
  );
};

export default Home;
