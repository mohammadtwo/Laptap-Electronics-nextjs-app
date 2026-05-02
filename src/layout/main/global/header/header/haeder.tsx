import Image from "next/image";

export default function Haeder() {
  // const 
   return (
     <>
       <div className="flex flex-row-reverse   gap-10 w-full sm:h-18 h-15 bg-linear-to-r from-purple-50 via-purple-50 to-purple-100 ">
         <div
           className="my-auto text-start whitespace-nowrap flex-1 ml-2 
          text-ms text-shadow-neutral-50 text-shadow-2xs
          "
         >
           بهترین ها را با ما تجربه کنید
         </div>
         <div className="flex-1 h-full grid place-items-center  ">
           <div className="ml-auto">
             <Image
               src="/assets/svg/nav-logo.svg"
               width={25}
               height={25}
               priority
               // sizes="100vh"
               className=" sm:h-auto max-h-15 w-full "
               alt="logo"
             />
           </div>
         </div>
       </div>
     </>
   );
};
