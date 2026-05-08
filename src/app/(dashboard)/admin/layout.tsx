import Adminlayout from "@/layout/dashbord/admin";

// src/app/(dashbord)/layout.tsx
export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <Adminlayout/>
  {children}
  </>; // فقط فرزندان رو رندر می‌کنه، چیزی اضافه نمی‌کنه
}
