import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex h-14 px mt-2 items-center justify-between
     px-4">
      <ul className="flex gap-4 w-full">
        <li className="w-[85%] ">
          <div className="flex   justify-between px-2 pr-10 py-1 rounded-full bg-purple-100 border-3 border-purple-500  items-center text-neutral-500">
            <span>جست و جو</span>
            <span>
              <Image
                alt="جستوجو"
                width={46}
                height={25}
                src="/assets/svg/search.svg"
              />
            </span>
          </div>
        </li>
        <li>
          <span className="bg-purple-400  w-15 flex justify-center items-center p-1  h-full rounded-full">
            <Image
              width={24}
              height={24}
              className="h-full w-auto"
              src="/assets/svg/ring.svg"
              alt="زنگ"
            />
          </span>
        </li>
      </ul>
    </nav>
  );
}
