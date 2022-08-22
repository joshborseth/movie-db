import { useState } from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import SubHeader from "../components/SubHeader";

const Home = () => {
  const [category, setCategory] = useState("popular");
  return (
    <div className="h-full w-full overflow-x-hidden bg-primary">
      <header>
        <Header />
        <SubHeader setCategory={(category: string) => setCategory(category)} />
      </header>
      <main>
        <h1 className="my-20 text-center text-5xl font-bold capitalize text-secondary">
          {category.includes("_") ? category.replace("_", " ") : category}
        </h1>
        <Slider category={category} />
      </main>
    </div>
  );
};

export default Home;
