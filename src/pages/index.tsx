import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    swipe: false,
    dots: true,
    arrows: false,
  };
  return (
    <div className="h-screen w-screen bg-primary">
      <header>
        <Header />
        <SubHeader setCategory={(category: string) => setCategory(category)} />
      </header>
      <main>
        <h1 className="my-16 text-center text-5xl font-bold capitalize text-secondary">
          {category.includes("_") ? category.replace("_", " ") : category}
        </h1>
        <section>
          <Slider {...settings}>
            {data &&
              data.results.map((movie: any, index: number) => (
                <div key={movie.id}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="movie poster"
                    width={250}
                    height={375}
                    quality={50}
                    placeholder="blur"
                    blurDataURL="/white.png"
                  />
                </div>
              ))}
          </Slider>
          {isLoading && (
            <Image
              src="/rings.svg"
              alt="loading icon"
              width={200}
              height={200}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
