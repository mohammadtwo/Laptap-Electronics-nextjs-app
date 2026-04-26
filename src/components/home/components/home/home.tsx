import Image from "next/image";
import Navbar from "../navbar/navbar";

export default function Home() {
  return (
    <header>
      <div className="flex flex-row-reverse  gap-10 w-full  h-15 bg-linear-to-l  via-purple-50 to-purple-100">
        <div
          className="my-auto whitespace-nowrap flex-1 ml-2 
        text-ms text-shadow-neutral-50 text-shadow-2xs
        "
        >
          بهترین ها را با ما تجربه کنید
        </div>
        <div className="flex-1 h-full grid place-items-center  ">
          <Image
            src="/assets/svg/nav-logo.svg"
            width={0}
            height={0}
            sizes="100vh"
            className=" h-full w-auto " // 🔴 ارتفاع 8 و عرض خودکار
            alt="logo"
          />
        </div>
      </div>
      <Navbar />
    </header>
  );
}
