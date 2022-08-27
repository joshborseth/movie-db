import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Heart from "../components/Heart";
import { trpc } from "../utils/trpc";

const Favourites = () => {
  const { data } = trpc.useQuery(["auth.getUserLikedMovies"]);
  const likedMovies = data?.map((movie) => movie.id);
  const session = trpc.useQuery(["auth.getSession"]);
  const likerId = session.data?.user?.id;
  return (
    <div className="h-full w-full bg-primary text-secondary">
      <header>
        <Header />
      </header>
      <main>
        <h1 className="py-20 text-center text-5xl font-bold">Favourites</h1>
        <div className="mx-auto grid w-2/3 grid-cols-1 place-items-start gap-20 lg:grid-cols-2 xl:grid-cols-3">
          {data &&
            data.length > 0 &&
            data.map((movie) => (
              <div className="flex flex-col items-center justify-center gap-5 pb-20 text-center" key={movie.id}>
                <h2 className="text-2xl">{movie.title}</h2>
                <h3 className="text-xl">({movie.year})</h3>
                <div className="relative mt-2 w-48">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt="movie poster"
                    width={500}
                    height={751}
                    quality={50}
                    placeholder="blur"
                    blurDataURL="/white.png"
                    className="h-full w-full"
                    draggable="false"
                  />
                  <Heart
                    id={movie.id}
                    title={movie.title ? movie.title : "No title available for this movie."}
                    posterPath={movie.posterPath ? movie.posterPath : "/white.png"}
                    year={movie.year ? movie.year : "No release date available for this movie"}
                    overview={movie.overview ? movie.overview : "No overview available for this movie"}
                    likerId={likerId ? likerId : ""}
                    isLiked={likedMovies?.includes(movie.id) ? true : false}
                  />
                </div>
                <Link href={`/movie/${movie.id}`}>
                  <a className="btn btn-accent">See More</a>
                </Link>
                <p>{movie.overview}</p>
              </div>
            ))}
          {data && data.length === 0 && <p className="col-span-3 mx-auto text-center">Go click the heart on some movies to see your favourites!</p>}
        </div>
      </main>
    </div>
  );
};

export default Favourites;
