import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="flex  px mt-5 items-center justify-between
     px-4"
    >
      <ul className="flex gap-4 w-full  ">
        <li className="w-[85%] sm:w-[65%]  h-full">
          <div className="flex h-10 sm:h-15  justify-between px-2 pr-10 py-1 rounded-full bg-purple-100 border-3 border-purple-500  items-center text-neutral-500">
            <span>جست و جو</span>
            <span>
              <Image
                alt="جستوجو"
                width={35}
                height={20}
                src="/assets/svg/search.svg"
              />
            </span>
          </div>
        </li>
        <li className="h-full sm:ml-auto ">
          <span className="bg-purple-400  w-10 flex justify-center items-center p-1 h-10 sm:h-15 sm:w-15 rounded-full">
            <Image
              width={24}
              height={24}
              className="h-full w-auto"
              src="/assets/svg/ring.svg"
              alt="زنگ"
            />
          </span>
        </li>
      <div className="ml-auto sm:flex hidden gap-5">
        <button className="bg-purple-300 border-2  border-purple-400 p-2 px-5 rounded-2xl whitespace-nowrap ">ثبت نام </button>
        <button>سبد خرید</button>
      </div>
      </ul>
    </nav>
  );
}
