import React, { useEffect, useState } from "react";

type subHeaderPropTypes = {
  setCategory: Function;
};

const SubHeader = (props: subHeaderPropTypes) => {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="relative flex h-20 flex-col items-center justify-center bg-accent font-bold text-secondary">
      <div
        className="flex h-full w-full cursor-pointer items-center justify-center text-center md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        Categories
      </div>
      {isOpen && (
        <ul className="absolute top-20 z-40 flex h-56 w-full flex-col items-center justify-center bg-accent md:static md:flex-row">
          <li
            onClick={() => props.setCategory("top_rated")}
            className="flex h-full w-full cursor-pointer items-center justify-center p-2 text-center hover:bg-neutral md:w-auto md:p-5"
          >
            Top Rated
          </li>
          <li
            onClick={() => props.setCategory("popular")}
            className="flex h-full w-full cursor-pointer items-center justify-center p-2 text-center hover:bg-neutral md:w-auto md:p-5"
          >
            Popular
          </li>
          <li
            onClick={() => props.setCategory("now_playing")}
            className="flex h-full w-full cursor-pointer items-center justify-center p-2 text-center hover:bg-neutral md:w-auto md:p-5"
          >
            Now Playing
          </li>
          <li
            onClick={() => props.setCategory("upcoming")}
            className="flex h-full w-full cursor-pointer items-center justify-center p-2 text-center hover:bg-neutral md:w-auto md:p-5"
          >
            Upcoming
          </li>
        </ul>
      )}
    </nav>
  );
};

export default SubHeader;
