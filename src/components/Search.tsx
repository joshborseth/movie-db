import { useRouter } from "next/router";
import { useRef } from "react";
import { useQuery } from "react-query";
const searchMovies = async (param: string | null | undefined) => {
  if (!param) return;
  const res = await fetch(`https://api.themoviedb.org/3/search/movie/?api_key=b474f43311f1a19783cd84ac384af0e8&query=${param}`);
  return res.json();
};
const Search = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { data, error, refetch } = useQuery(["searchMovies"], () => searchMovies(searchRef?.current?.value), {
    enabled: false,
  });
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        refetch();
        router.push("/search");
      }}
      className="flex gap-2"
    >
      <input type="text" className="input" placeholder="Search for movies..." ref={searchRef} />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      <>{error && <p className="text-warning">{JSON.stringify(error)}</p>}</>
    </form>
  );
};

export default Search;
