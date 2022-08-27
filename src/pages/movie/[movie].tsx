import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Heart from "../../components/Heart";
import { fetchMovies } from "../../components/Slider";

export async function getServerSideProps(context: any) {
  const movie = await fetchMovies(context.params.movie);
  return {
    props: movie,
  };
}
const Movie = (props: any) => {
  console.log(props);
  return (
    <div className="bg-primary text-secondary">
      <header>
        <Header />
      </header>
      <main className="flex flex-col items-center justify-center gap-2 px-5 py-10">
        <h1 className="text-center text-5xl font-bold">{props.title}</h1>
        <h2 className="text-xl">({props.release_date})</h2>
        <div className="flex flex-col items-center px-5 md:flex-row-reverse md:items-start md:justify-center">
          <div className="relative mt-8 w-1/2 select-none md:w-1/3">
            <Heart
              isLiked={props.isLiked}
              id={props.id}
              title={props.title}
              posterPath={props.poster_path}
              year={props.release_date}
              overview={props.overview}
            />
            <Image
              src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
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
          <div className="flex-col-reverse items-start gap-10 text-center md:flex md:max-w-lg md:pr-32 md:text-left">
            <Link href="/">
              <a>
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height={100}
                  width={100}
                  className="mx-auto fill-secondary"
                >
                  <path
                    d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"
                    fillRule="nonzero"
                  />
                </svg>
              </a>
            </Link>
            <div className="flex items-center justify-center gap-10">
              <h2 className="font-bold">Rating:</h2>
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent font-bold">{Math.floor(props.vote_average)}/10</span>
            </div>
            <div>
              <h2 className="py-5 text-2xl font-bold">Overview</h2>
              <p>{props.overview}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Movie;
