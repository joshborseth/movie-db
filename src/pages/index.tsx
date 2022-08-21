import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";

const fetchMovies = async (param: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${param}?api_key=b474f43311f1a19783cd84ac384af0e8`
  );
  return res.json();
};
const Home = () => {
  const [category, setCategory] = useState("popular");
  const { data, isLoading, error } = useQuery([category], () =>
    fetchMovies(category)
  );
  console.log(data);
  return (
    <div className="h-screen w-screen bg-primary">
      <header>
        <Header />
        <SubHeader setCategory={(category: string) => setCategory(category)} />
      </header>
      <main>
        <section className="flex items-center justify-center gap-5 text-secondary">
          {data &&
            data.results.map((movie: any, index: number) => (
              <article key={movie.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="movie poster"
                  width={500}
                  height={751}
                />
              </article>
            ))}
          {isLoading && (
            <button className="loading btn btn-square border-none bg-primary"></button>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
