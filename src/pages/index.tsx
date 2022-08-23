import { useState } from "react";
import Header from "../components/Header";
import SignInBtn from "../components/SignInBtn";
import Slider from "../components/Slider";
import SubHeader from "../components/SubHeader";
const Home = () => {
  const [category, setCategory] = useState("popular");
  return (
    <div className="h-full w-full bg-primary">
      <header>
        <Header />
        <SubHeader setCategory={(category: string) => setCategory(category)} />
      </header>
      <main>
        <h1 className="my-12 text-center text-5xl font-bold capitalize text-secondary">
          {category.includes("_") ? category.replace("_", " ") : category}
        </h1>
        <Slider category={category} />
      </main>
      <footer>
        <SignInBtn />
      </footer>
    </div>
  );
};

export default Home;
