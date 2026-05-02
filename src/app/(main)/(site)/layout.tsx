import GlobalLayout from "@/layout/main/global/index";
import "@/styles/style/globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 
    
          <GlobalLayout>{children}</GlobalLayout>
        

   
  );
}
