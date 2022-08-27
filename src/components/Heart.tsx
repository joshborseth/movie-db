import Image from "next/image";
import { useState } from "react";
import { trpc } from "../utils/trpc";
type heartProps = {
  id: number;
  title: string;
  posterPath: string;
  year: string;
  overview: string;
  likerId: string;
  isLiked: boolean;
  rating: number;
};

const Heart = (props: heartProps) => {
  const utils = trpc.useContext();
  const [loading, setLoading] = useState(false);
  const likeMovie = trpc.useMutation(["auth.createLikedMovie"], {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      utils.invalidateQueries(["auth.getUserLikedMovies"]);
    },
  });
  const unLikeMovie = trpc.useMutation(["auth.deleteLikedMovie"], {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      utils.invalidateQueries(["auth.getUserLikedMovies"]);
    },
  });
  const createLikedMovie = async () => {
    likeMovie.mutate(props);
  };
  const deleteLikedMovie = async (id: number, likerId: string) => {
    unLikeMovie.mutate({
      id: id,
      likerId: likerId,
    });
  };
  return (
    <div className="absolute -top-5 -right-5 z-30">
      {!props.isLiked && !loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          className="cursor-pointer fill-secondary"
          onClick={() => {
            createLikedMovie();
          }}
        >
          <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" />
        </svg>
      )}
      {props.isLiked && !loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          className="cursor-pointer fill-secondary"
          onClick={() => deleteLikedMovie(props.id, props.likerId)}
        >
          <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
        </svg>
      )}
      {loading && (
        <div className="flex items-center justify-center">
          <Image src="/rings.svg" alt="loading icon" width={50} height={50} />
        </div>
      )}
    </div>
  );
};

export default Heart;
