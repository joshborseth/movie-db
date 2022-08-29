import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";

const Login = ({ providers }: any) => {
  return (
    <>
      <Head>
        <title>JB Movies | Login</title>
      </Head>
      <div className="h-screen w-screen bg-primary">
        <header>
          <Header />
        </header>
        <main className="flex h-1/2 flex-col items-center justify-center gap-10">
          <h1 className="text-center text-5xl text-secondary">Login</h1>
          {Object.values(providers).map((provider: any) => (
            <div key={provider.id} className="mx-auto w-1/2 bg-neutral text-center">
              <button className="btn btn-accent h-full w-full" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                Login with {provider.name}
              </button>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
