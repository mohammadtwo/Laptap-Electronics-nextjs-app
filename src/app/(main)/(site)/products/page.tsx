import ProductsPage from "@/components/main/products/components/ProductsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    category?: string;
    brand?: string;
    search?: string;
    page?: string;
  };
}) {
  const { category, brand, search, page } =await searchParams;

  return (
    <ProductsPage
      category={category}
      brand={brand}
      search={search}
      page={page}
    />
  );
}
