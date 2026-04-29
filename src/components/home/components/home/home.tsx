import { Slider } from "../slider/slider";


export default function Home() {
  return (
    <>
      <Slider/>
      <main className="overflow-y-scroll flex-1">
        <div className="h-250 overflow-scroll  "></div>
      </main>
    </>
  );
}
