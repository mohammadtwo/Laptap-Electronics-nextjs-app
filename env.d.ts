namespace NodeJS {
  interface ProcessEnv {
    LOCAL_JWT_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
    API_URL: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
