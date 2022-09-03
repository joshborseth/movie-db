import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

const about: NextPage = () => {
  return (
    <>
      <Head>
        <title>JB Movies | About</title>
      </Head>
      <div className="h-screen bg-primary">
        <header>
          <Header />
        </header>
        <main className="mx-auto flex items-center justify-center bg-primary py-32 px-20 text-secondary">
          <div>
            <div className="text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">About</h1>
                <p className="py-6">
                  I am Joshua Borseth and I am currently a student at BCIT. I have a passion for all things web dev. This is an example of a school project I
                  made using the T3 Stack and the TMDB API.
                </p>
                <button className="btn btn-accent mx-2">
                  <Link href="https://github.com/t3-oss/create-t3-app">
                    <a>T3 Stack</a>
                  </Link>
                </button>
                <button className="btn btn-secondary mx-2">
                  <Link href="https://www.themoviedb.org/">
                    <a>TMDB</a>
                  </Link>
                </button>
                <div className="relative my-10 h-20">
                  <Image src="/tmdb.svg" alt="TMDB Logo" layout="fill" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default about;
