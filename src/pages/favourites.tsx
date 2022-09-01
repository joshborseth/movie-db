import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Heart from "../components/Heart";
import { trpc } from "../utils/trpc";

const Favourites = () => {
  const session = trpc.useQuery(["auth.getSession"]);
  const likerId = session.data?.user?.id;
  const { data } = trpc.useQuery(["auth.getUserLikedMovies"], {
    enabled: !!likerId,
  });
  const likedMovies = data?.map((movie: any) => movie.id);
  return (
    <>
      <Head>
        <title>JB Movies | Favourites</title>
      </Head>

      <div className="h-full w-full bg-primary text-secondary">
        <header>
          <Header />
        </header>
        <main>
          <h1 className="py-32 text-center text-5xl font-bold">Favourites</h1>
          <div className="mx-auto grid w-3/4 grid-cols-1 place-items-start gap-20 lg:grid-cols-2 xl:grid-cols-3">
            {data &&
              data.length > 0 &&
              data.map((movie) => (
                <div className="flex flex-col items-center justify-center pb-20 text-center" key={movie.id}>
                  <h2 className="h-24 text-2xl">{movie.title}</h2>
                  <h3 className="text-xl">({movie.year})</h3>
                  <div className="relative my-10 w-48">
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
                    {likerId && (
                      <Heart
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.posterPath}
                        year={movie.year}
                        overview={movie.overview}
                        likerId={likerId}
                        isLiked={likedMovies?.includes(movie.id) ? true : false}
                      />
                    )}
                  </div>
                  <Link href={`/movie/${movie.id}`}>
                    <a className="btn btn-accent">See More</a>
                  </Link>
                  <p className="mt-10 h-48">{movie.overview.length > 200 ? `${movie.overview.slice(0, 200)}...` : movie.overview}</p>
                </div>
              ))}
            {data && data.length === 0 && (
              <>
                <p className="col-span-3 mx-auto text-center">Go click the heart on some movies to see your favourites!</p>
                <Link href="/">
                  <a className="btn btn-accent col-span-3 mx-auto text-center">Browse Movies</a>
                </Link>
              </>
            )}
            {!likerId && (
              <>
                <p className="col-span-3 mx-auto text-center">Please Sign In to view your favourites!</p>
                <button onClick={() => signIn()} className="btn btn-accent col-span-3 mx-auto text-center">
                  Sign In
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Favourites;
