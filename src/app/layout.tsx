import { ThemeProvider } from "@/layout/main/global/theme/theme";
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
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="light w-full flex flex-col font-[Vazirmatn] bg-neutral-50 text-neutral-800">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
