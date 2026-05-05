import GlobalLayout from "@/layout/main/global/index";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalLayout>{children}</GlobalLayout>;
}
