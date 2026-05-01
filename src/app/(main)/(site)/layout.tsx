import GlobalLayout from "@/layout/main/global/index";
import ReduxProvider from "@/layout/main/global/redux-provider/redux-provider";
import "@/styles/style/globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "ELECTRONICS",
  description: "بهترین و جدید ترین لب تاپ ها را از ما بخواهید ",
  icons: "/icon.svg",
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#853cff" },
    { media: "(prefers-color-scheme: dark)", color: "#6f32d5" },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" >
      <body className="h-screen w-full flex flex-col font-[Vazirmatn] ">
        <ReduxProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
