import Footer from "./footer/footer";
import Navbar from "./header/navbar/navbar";
import Haeder from "./header/header/haeder";


export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sm:h-36 h-28" />
      <header className="fixed  w-full top-0 right-0 left-0 z-50">
        <Haeder />
        <Navbar />
      </header>

      {children}

      <footer className="fixed  w-full bottom-0 right-0 left-0 z-50">
        <Footer />
      </footer>
      <div className="h-20" />
    </>
  
  );
}
