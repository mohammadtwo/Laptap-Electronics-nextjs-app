import type { NextConfig } from "next";
const isDevelopment = true;

const nextConfig: NextConfig = {
  images: {
    // فقط در محیط توسعه، بارگذاری از IP خصوصی را مجاز کن
    dangerouslyAllowLocalIP: isDevelopment,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // پورت سرویس تصاویر خود را اینجا وارد کنید
        pathname: "/uploads/products/**",
      },
    ],
  },
};

export default nextConfig;
