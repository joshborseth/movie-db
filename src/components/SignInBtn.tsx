import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { trpc } from "../utils/trpc";

const SignInBtn = () => {
  const session = trpc.useQuery(["auth.getSession"]);
  return (
    <div className="inline-block text-center">
      {!session.data && (
        <button className="btn btn-primary border-secondary" onClick={() => signIn()}>
          Sign In
        </button>
      )}
      {session.data?.user?.image && (
        <div className="dropdown flex items-center justify-center gap-5">
          <label tabIndex={0}>
            <Image src={session.data.user?.image} alt="user image" width={75} height={75} className="cursor-pointer rounded-full" />
          </label>
          <ul onClick={() => signOut()} tabIndex={0} className="btn dropdown-content btn-secondary mt-28 text-error">
            <li>Sign Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SignInBtn;
