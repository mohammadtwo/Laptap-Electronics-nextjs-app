// components/categories/CategoriesGrid.tsx
import CategoryCard from "./CategoryCard";

export default function CategoriesGrid() {
  const items = [
    {
      title: "لپ‌تاپ‌ اقتصادی",
      href: "/category/gaming",
      image: "/assets/eqtesadi-2.webp",
    },
    {
      title: "لپ‌تاپ دانشجویی",
      href: "/category/student",
      image: "/assets/mohandesi.webp",
    },
    {
      title: "لپ‌تاپ برنامه‌نویسی",
      href: "/category/developer",
      image: "/assets/programing.jpg",
    },
    {
      title: "لوازم جانبی",
      href: "/category/engineering",
      image: "/assets/lavazem-janebi.webp",
    },
  ];

  return (
    <section className="container mx-auto px-3 sm:px-4 md:px-5 ">
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <CategoryCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
