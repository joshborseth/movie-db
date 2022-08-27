import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "react-query";
import Heart from "./Heart";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { trpc } from "../utils/trpc";
type sliderProps = {
  category: string;
};
export const fetchMovies = async (param: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${param}?api_key=b474f43311f1a19783cd84ac384af0e8`);
  return res.json();
};
const Slider = (props: sliderProps) => {
  const { data, isLoading, error } = useQuery([props.category], () => fetchMovies(props.category));
  const favourites = trpc.useQuery(["auth.getUserLikedMovies"]);
  const likedMovies = favourites.data?.map((movie) => movie.id);
  const [slideCount, setSlideCount] = useState<number>(0);
  const session = trpc.useQuery(["auth.getSession"]);
  const likerId = session.data?.user?.id;
  useEffect(() => {
    const updateMedia = () => {
      setSlideCount(1);
      if (window.innerWidth >= 600) {
        setSlideCount(2);
      }
      if (window.innerWidth >= 900) {
        setSlideCount(3);
      }
      if (window.innerWidth >= 1400) {
        setSlideCount(4);
      }
      if (window.innerWidth >= 1600) {
        setSlideCount(5);
      }
    };
    window.addEventListener("resize", updateMedia);
    updateMedia();
    return () => window.removeEventListener("resize", updateMedia);
  }, []);
  return (
    <div className="mx-auto bg-primary p-5">
      <Swiper spaceBetween={0} slidesPerView={slideCount} loop={true} className="w-2/3">
        {data &&
          data.results.map((movie: any, index: number) => (
            <SwiperSlide key={movie.id} className="flex items-center justify-center p-5">
              <div className="relative flex w-auto items-center justify-center">
                <div className="absolute left-0 right-0 top-0 bottom-0 z-20 h-full w-full bg-black bg-opacity-0 p-3 text-secondary opacity-0 transition-all hover:bg-opacity-75 hover:opacity-100">
                  <h3 className="text-md my-1 font-bold">{movie.title.length > 20 ? movie.title.slice(0, 20) + "..." : movie.title}</h3>
                  <h4 className="my-1 text-sm">({movie.release_date})</h4>
                  <p className="text-2xs md:text-xs">{movie.overview.slice(0, 100)}...</p>
                </div>
                {likerId && (
                  <Heart
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    year={movie.release_date}
                    overview={movie.overview}
                    likerId={likerId}
                    isLiked={likedMovies?.includes(movie.id) ? true : false}
                  />
                )}
                <div className="flex w-full items-center justify-center">
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
                </div>
                <button className="absolute bottom-0 left-0 right-0 z-50 h-10 w-full rounded-none bg-accent text-secondary transition-colors hover:bg-neutral">
                  <Link href={`/movie/${movie.id}`}>
                    <a>See More</a>
                  </Link>
                </button>
              </div>
            </SwiperSlide>
          ))}
        {isLoading && (
          <div className="flex items-center justify-center">
            <Image src="/rings.svg" alt="loading icon" width={200} height={200} />
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center text-secondary">
            <p>An error has occured while fetching movies.</p>
          </div>
        )}
      </Swiper>
    </div>
  );
};
export default Slider;
