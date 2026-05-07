import EditableProductsTable from "./table";
export interface ProductsPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export default async function Dashoard({ searchParams }: ProductsPageProps) {
      const resolvedSearchParams = await (searchParams ?? {page:"1"});
      const currentPage = Number(resolvedSearchParams.page) || 1;
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EditableProductsTable page={currentPage} />
      </div>
    );
};
