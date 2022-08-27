import { trpc } from "../utils/trpc";

const Favourites = () => {
  const favourites = trpc.useQuery(["auth.getUserLikedMovies"]);
  return (
    <div className="bg-primary text-secondary">
      {JSON.stringify(favourites.data)}
    </div>
  );
};

export default Favourites;
