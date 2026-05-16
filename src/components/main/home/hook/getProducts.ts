// lib/getProducts.ts

import { ProductResponse } from "../components/Product/type";

export async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/api/products?page=1&limit=8`,
    {
      next: {
        revalidate: 60,
      },
    },
  );

  if (!res.ok) {
    throw new Error("خطا در دریافت محصولات");
  }

  return (await res.json()) as ProductResponse;
}
