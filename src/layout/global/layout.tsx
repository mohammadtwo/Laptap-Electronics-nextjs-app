import Footer from "./footer/footer";
import Navbar from "./header/navbar/navbar";
import Haeder from "./header/header/haeder";
import ThemeProvider from "./theme/theme";


export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <header className="h-[10vh]">
        <Haeder />
        <Navbar />
      </header>
      <div className="h-[80vh] overflow-scroll">

      {children}
      </div>
      <footer className=" h-[10vh]">
        <Footer />
      </footer>
    </ThemeProvider>
  );
}
