namespace NodeJS {
  interface ProcessEnv {
    LOCAL_JWT_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_API_URL_BACKEND: string;
    API_URL: string;
    JWT_EXPIRE_LOCAL_TOKEN: string;
    JWT_EXPIRE_LOCAL_TOKEN_SET:number;
    JWT_EXPIRE_ACCESS_TOKEN: number;
    JWT_EXPIRE_REFRESH_TOKEN: number;
    NODE_ENV: "development" | "production" | "test";
  }
}
