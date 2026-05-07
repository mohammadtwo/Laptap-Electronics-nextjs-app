"use client";

import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { toast } from "react-toastify";
import { ApiOrdersResponse, Order } from "../../orders/types/type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

interface HealthResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

interface ProductResponse<T> {
  success: boolean;
  count?: number;
  total?: number;
  data: T[];
}

interface Product {
  _id: string;
}

export default function DashboardCharts() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const [ordersRes, productsRes, healthRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pro/orders/admin/all`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pro/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL_BACKEND}/api/health`),
      ]);

      const orderData: ApiOrdersResponse<Order[]> = await ordersRes.json();
      setOrders(orderData.data ?? []);

      const productData: ProductResponse<Product> = await productsRes.json();
      setProductsCount(
        productData.total ?? productData.count ?? productData.data?.length ?? 0,
      );

      const healthData: HealthResponse = await healthRes.json();
      setHealth(healthData);
    } catch (err) {
      console.error(err);
      toast.error("خطا در دریافت اطلاعات داشبورد");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl bg-neutral-50 p-6 text-neutral-600">
        در حال بارگذاری داشبورد...
      </div>
    );
  }

  const ordersCount = orders.length;

  const totalItems = orders.reduce((sum, order) => {
    return (
      sum +
      order.orderItems.reduce((s, item) => s + Number(item.quantity || 0), 0)
    );
  }, 0);

  const isBackendHealthy = health?.success === true;

  const summaryChartData = {
    labels: ["مجموع سفارشات", "آیتم‌های خریداری‌شده", "کل محصولات سایت"],
    datasets: [
      {
        label: "آمار کلی فروشگاه",
        data: [ordersCount, totalItems, productsCount],
        backgroundColor: ["#6366f1", "#10b981", "#f59e0b"],
        borderRadius: 10,
        barThickness: 48,
      },
    ],
  };

  const healthChart = {
    labels: ["سالم", "ناسالم"],
    datasets: [
      {
        data: [isBackendHealthy ? 1 : 0, isBackendHealthy ? 0 : 1],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
        cutout: "72%",
      },
    ],
  };

  return (
    <div className="mt-3 grid grid-cols-1 gap-6 xl:grid-cols-3 w-full max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 container ">
      {/* نمودار اصلی */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm xl:col-span-2">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
         

            <h3 className="text-base font-bold text-neutral-800">
              نمای کلی فروشگاه
            </h3>
          </div>

          <p className="text-sm text-neutral-500">
            مقایسه مجموع سفارشات، آیتم‌های خریداری‌شده و تعداد کل محصولات
          </p>
        </div>

        <div className="h-fu w-full sm:h-90 lg:h-100">
          <Bar
            data={summaryChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  top: 10,
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                  labels: {
                    color: "#404040",
                    font: {
                      family: "inherit",
                      size: 12,
                    },
                  },
                },
                tooltip: {
                  rtl: true,
                  bodyAlign: "right",
                  titleAlign: "right",
                  callbacks: {
                    label: (context) => {
                      return `${context.dataset.label}: ${context.formattedValue}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    
                    color: "#525252",
                    font: {
                      family: "inherit",
                      size: 12,
                    },
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: "#737373",
                    font: {
                      family: "inherit",
                      size: 12,
                    },
                    precision: 0,
                  },
                  grid: {
                    color: "#f1f5f9",
                  },
                },
              },
            }}
          />
        </div>

        <div className="m-6   grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-indigo-50 p-4 text-center">
            <p className="text-xs text-indigo-600">مجموع سفارشات</p>
            <p className="mt-1 text-2xl font-bold text-indigo-700">
              {ordersCount}
            </p>
          </div>

          <div className="rounded-lg bg-emerald-50 p-4 text-center">
            <p className="text-xs text-emerald-600">آیتم‌های خریداری‌شده</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">
              {totalItems}
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 p-4 text-center">
            <p className="text-xs text-amber-600">کل محصولات سایت</p>
            <p className="mt-1 text-2xl font-bold text-amber-700">
              {productsCount}
            </p>
          </div>
        </div>
      </div>

      {/* سلامت سرور */}
      <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-800">سلامت سرور</h3>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isBackendHealthy
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isBackendHealthy ? "سالم" : "دارای خطا"}
          </span>
        </div>

        <div className="mx-auto h-45 flex flex-col w-40">
          <Doughnut
            data={healthChart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  rtl: true,
                  bodyAlign: "right",
                  titleAlign: "right",
                },
              },
              animation: {
                animateRotate: true,
                animateScale: true,
                duration: 900,
              },
            }}
          />
        </div>

        <div className="m-5 flex-1 flex flex-col gap-12 space-y-3 rounded-lg bg-neutral-50 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">وضعیت اتصال</span>
            <span
              className={`font-medium ${
                isBackendHealthy ? "text-green-600" : "text-red-600"
              }`}
            >
              {isBackendHealthy ? "پایدار" : "ناپایدار"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">آخرین بررسی</span>
            <span className="text-neutral-700">
              {health?.timestamp
                ? new Date(health.timestamp).toLocaleString("fa-IR")
                : "--"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">پیام سرور</span>
            <span className="text-neutral-700">
              {health?.message || "نامشخص"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
