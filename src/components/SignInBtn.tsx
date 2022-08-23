import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const SignInBtn = () => {
  const { data: session, status } = useSession();

  return (
    <div className="mx-auto text-center">
      {status !== "authenticated" && (
        <button
          className="btn btn-primary w-80 border-secondary"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
      {status === "authenticated" && session.user?.image && (
        <div
          className="dropdown-hover dropdown flex items-center justify-center gap-5"
          onClick={() => signOut()}
        >
          <label tabIndex={0}>
            <Image
              src={session.user?.image}
              alt="user image"
              width={75}
              height={75}
              className="cursor-pointer rounded-full"
            />
          </label>
          <ul
            tabIndex={0}
            className="btn dropdown-content btn-secondary mt-28 text-error"
          >
            <li>Sign Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SignInBtn;
