import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Header from "../components/Header";

const Home = () => {
  const session = useSession();
  return (
    <>
      <header className="h-20 bg-base-300 font-bold text-base-300">
        <Header />
      </header>
      <main className="p-5 text-center">
        <h1 className="py-10 text-3xl font-bold">
          Welcome to Next Auth Testing!
        </h1>
        {session.status === "loading" && <div className="loading"></div>}
        {session.status === "unauthenticated" && (
          <button className="btn btn-primary m-10" onClick={() => signIn()}>
            Signin
          </button>
        )}
        {session.status === "authenticated" && (
          <>
            <div className="my-10">{session.data.user?.name}</div>
            <Image
              src={session.data.user?.image}
              alt="user image"
              width={200}
              height={200}
            />
            <button className="btn btn-error m-10" onClick={() => signOut()}>
              Signout
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
