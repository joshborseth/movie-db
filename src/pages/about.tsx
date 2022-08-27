import { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";

const about: NextPage = () => {
  return (
    <div className="h-screen bg-primary">
      <header>
        <Header />
      </header>
      <main className="mx-auto flex items-center justify-center bg-primary py-32 px-20 text-secondary">
        <div>
          <div className="text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">About The Creator</h1>
              <p className="py-6">
                I am Joshua Borseth and I am currently a student at BCIT. I have
                a passion for all things web dev. This is an example of a school
                project I made using the T3 Stack.
              </p>
              <button className="btn btn-accent">
                <Link href="https://github.com/t3-oss/create-t3-app">
                  <a>T3 Stack</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default about;
