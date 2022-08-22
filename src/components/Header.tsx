import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    const updateMedia = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    updateMedia();
    return () => window.removeEventListener("resize", updateMedia);
  }, []);
  return (
    <nav className="flex h-28 items-center justify-between bg-secondary p-8 font-bold text-primary md:justify-start md:gap-10">
      {/* <Link href="/"> */}
      <Image
        src="/logo.png"
        alt="JB Movies Logo"
        className="cursor-pointer"
        height={75}
        width={75}
      />
      {/* </Link> */}
      {isOpen && (
        <ul className="absolute top-28 left-0 right-0 z-50 flex w-full flex-col bg-secondary text-center md:static md:w-auto md:flex-row">
          <li className="h-full w-full cursor-pointer p-4 text-center hover:bg-base-100 md:w-auto md:hover:bg-secondary">
            {/* <Link href="/">Home</Link> */}Home
          </li>
          <li className="h-full w-full cursor-pointer p-4 text-center hover:bg-base-100 md:w-auto md:hover:bg-secondary">
            {/* <Link href="/about">About</Link> */}About
          </li>
          <li className="h-full w-full cursor-pointer p-4 text-center hover:bg-base-100 md:w-auto md:hover:bg-secondary">
            {/* <Link href="/favourites">Favourites</Link> */}Favourites
          </li>
        </ul>
      )}
      {status !== "authenticated" && (
        <button
          className="btn btn-primary ml-auto mr-10 text-secondary"
          onClick={() => signIn()}
        >
          Signin
        </button>
      )}
      {status === "authenticated" && session.user?.image && (
        <div
          className="dropdown dropdown-hover ml-auto mr-10 flex items-center justify-center gap-5"
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
          <ul tabIndex={0} className="btn dropdown-content btn-secondary mt-28">
            <li>Signout</li>
          </ul>
        </div>
      )}

      <svg
        className="swap-off cursor-pointer fill-current md:hidden"
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 512 512"
        onClick={() => setIsOpen(!isOpen)}
      >
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>
    </nav>
  );
};

export default Header;
