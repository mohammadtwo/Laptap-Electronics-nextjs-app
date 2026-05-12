import AmazingSliderClient from "./AmazingSliderClient";
import { Product, ProductsResponse } from "./type";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/api/products?page=1&limit=10`,
    {
      cache: "no-store",
    },
  );

  const data: ProductsResponse = await res.json();

  return data.data;
}

export default async function AmazingSliderContent() {
  const products = await getProducts();

  return <AmazingSliderClient products={products} />;
}
