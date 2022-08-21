import { getProviders, signIn } from "next-auth/react";

const login = ({ providers }: any) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start">
      <h1 className="m-20 text-4xl">Login</h1>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.id} className="w-1/2 bg-neutral text-center">
          <button
            className="btn btn-primary h-full w-full text-base-content"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
