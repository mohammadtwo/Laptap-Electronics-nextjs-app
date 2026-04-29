import GlobalLayout from "@/layout/global/layout";
import ReduxProvider from "@/layout/global/redux-provider/redux-provider";
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
      <body className="h-full  flex flex-col font-[Vazirmatn] ">
        <ReduxProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
