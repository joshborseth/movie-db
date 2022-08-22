import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import Heart from "./Heart";

const fetchMovies = async (param: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${param}?api_key=b474f43311f1a19783cd84ac384af0e8`
  );
  return res.json();
};

type sliderProps = {
  category: string;
};

const Slider = (props: sliderProps) => {
  const [width, setWidth] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (!carousel.current) return;
    setWidth(carousel.current.scrollWidth - window.innerWidth / 1.1);
  }, []);
  const { data, isLoading, error } = useQuery([props.category], () =>
    fetchMovies(props.category)
  );
  return (
    <>
      <motion.section className="mx-auto w-[500rem] pb-10 md:px-20">
        <motion.div
          className="flex w-1/2 cursor-grab"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileDrag={{ scale: 1.1 }}
          ref={carousel}
          whileTap={{ cursor: "grabbing" }}
        >
          {data &&
            data.results.map((movie: any, index: number) => (
              <motion.div className="relative mx-3" key={movie.id}>
                <div className="absolute z-20 h-full w-full bg-black bg-opacity-0 p-3 text-secondary opacity-0 transition-all hover:bg-opacity-75 hover:opacity-100">
                  <h3 className="text-md my-2 font-bold">{movie.title}</h3>
                  <h4 className="my-1 text-sm">({movie.release_date})</h4>
                  <p className="text-xs">{movie.overview.slice(0, 100)}...</p>
                </div>
                <div className="absolute -top-5 -right-5 z-30">
                  <Heart />
                </div>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="movie poster"
                  width={500}
                  height={751}
                  quality={50}
                  placeholder="blur"
                  blurDataURL="/white.png"
                  className="h-full w-full"
                  draggable="false"
                />
                <button className="absolute bottom-0 left-0 right-0 z-50 h-10 w-full rounded-none bg-accent text-secondary transition-colors hover:bg-neutral">
                  See More
                </button>
              </motion.div>
            ))}
        </motion.div>
      </motion.section>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Image src="/rings.svg" alt="loading icon" width={200} height={200} />
        </div>
      )}
    </>
  );
};

export default Slider;
