import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = ({ setIsSubHeaderOpen }: { setIsSubHeaderOpen?: Function }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      <Link href="/">
        <a>
          <Image src="/logo.png" alt="JB Movies Logo" className="cursor-pointer" height={75} width={75} />
        </a>
      </Link>
      {isOpen && (
        <ul className="absolute top-28 left-0 right-0 z-50 flex w-full flex-col bg-secondary text-center md:static md:w-auto md:flex-row">
          <li className="h-full w-full text-center md:w-auto">
            <Link href="/">
              <a className="block h-full w-full p-4 hover:bg-base-100 md:hover:bg-secondary">Home</a>
            </Link>
          </li>
          <li className="h-full w-full text-center md:w-auto">
            <Link href="/about">
              <a className="block h-full w-full p-4 hover:bg-base-100 md:hover:bg-secondary">About</a>
            </Link>
          </li>
          <li className="h-full w-full text-center md:w-auto">
            <Link href="/favourites">
              <a className="block h-full w-full p-4 hover:bg-base-100 md:hover:bg-secondary">Favourites</a>
            </Link>
          </li>
        </ul>
      )}

      <svg
        className="swap-off cursor-pointer fill-current md:hidden"
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 512 512"
        onClick={() => {
          setIsOpen(!isOpen);
          setIsSubHeaderOpen && setIsSubHeaderOpen(false);
        }}
      >
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>
    </nav>
  );
};

export default Header;
