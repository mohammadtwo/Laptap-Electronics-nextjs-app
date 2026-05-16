import { GetProductsParams } from "@/types/types";
import { ProductResponse } from "../../home/components/Product/type";

export async function getProducts({
  search,
  brand,
  category,
  limit = "9",
  page = "1",
}: GetProductsParams = {}): Promise<ProductResponse> {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (brand) params.append("brand", brand);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/api/products?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("خطا در دریافت محصولات");
  }

  return res.json();
}
