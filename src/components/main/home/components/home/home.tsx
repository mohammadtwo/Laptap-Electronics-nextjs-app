// import { Slider } from "../slider/slider";

import AmazingSlider from "../AmazingSlider/AmazingSlider";
import ProductsSection from "../Product/ProductsSection";
import CategoriesGrid from "../CategoryCard/CategoriesGrid";
import GamingLaptopHero from "../GamingLaptopHero/GamingLaptopHero";
import { Slider } from "../slider/slider";

export default function Home() {
  return (
    <>
      <Slider />
      <main className=" flex-1 flex flex-col gap-4 sm:gap-10 container mx-auto py-10 max-w-7xl w-full">
        <AmazingSlider />
        <CategoriesGrid />
        <GamingLaptopHero />
        <ProductsSection />
      </main>
    </>
  );
}
