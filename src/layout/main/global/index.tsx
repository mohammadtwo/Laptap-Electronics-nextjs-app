import { Suspense } from "react";
import Footer from "./footer/footer";
import Navbar from "./header/navbar/navbar";


export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sm:h-[101.5px] h-16" />
      <header className="fixed  w-full top-0 right-0 left-0 z-50">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      </header>

      {children}

      <footer className="w-full">
        <Footer />
      </footer>
    </>
  );
}
