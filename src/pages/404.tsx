import Head from "next/head";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <>
      <Head>
        <title>JB Movies | 404</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center bg-primary">
        <Link href="/">
          <a className="p-5 text-center text-2xl text-secondary hover:underline">Oops. You got lost. Click here to return to home.</a>
        </Link>
      </div>
    </>
  );
};

export default Error;
