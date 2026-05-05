import ThemeProvider from "@/layout/main/global/theme/theme";
import "@/styles/style/globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata: Metadata = {
  title: "ELECTRONICS",
  description: "بهترین و جدید ترین لب تاپ ها را از ما بخواهید ",
  icons: "/icon.svg",
};

// "dark light"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-neutral-50 text-neutral-800 w-full  flex flex-col font-[Vazirmatn]">
        <ThemeProvider>{children}</ThemeProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
