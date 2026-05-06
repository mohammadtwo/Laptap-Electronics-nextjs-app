// src/app/(dashbord)/layout.tsx
export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // فقط فرزندان رو رندر می‌کنه، چیزی اضافه نمی‌کنه
}
