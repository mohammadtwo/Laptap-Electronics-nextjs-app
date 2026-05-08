"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { OrderStatus } from "../types/type";



type PaymentMethod = "online" | "cash";

interface ApiOrdersResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

interface OrdersListResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: Order[];
}

interface Order {
  _id: string;
  user: User;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  status: OrderStatus;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
}

interface OrderItem {
  _id: string;
  product: Product;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  images: string[];
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pro/orders/admin/all`,
      );

      const data: OrdersListResponse = await res.json();

      setOrders(data.data);
    } catch (error) {
      console.error(error);
      toast.error("خطا در دریافت سفارش‌ها");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  async function updateStatus(orderId: string, status: OrderStatus) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pro/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const data: ApiOrdersResponse<Order> = await res.json();

      if (data.success) {
        toast.success("وضعیت سفارش بروزرسانی شد");

        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: data.data.status } : o,
          ),
        );
      } else {
        toast.error("خطا در بروزرسانی وضعیت");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در ارتباط با سرور");
    }
  }

function statusBadge(status: OrderStatus) {
  const config: Record<OrderStatus, { className: string; label: string }> = {
    pending: {
      className: "bg-yellow-100 text-yellow-700",
      label: "در انتظار تایید",
    },
    processing: {
      className: "bg-orange-100 text-orange-700",
      label: "در حال پردازش",
    },
    confirmed: {
      className: "bg-blue-100 text-blue-700",
      label: "تایید شده",
    },
    shipping: {
      className: "bg-purple-100 text-purple-700",
      label: "در حال ارسال",
    },
    delivered: {
      className: "bg-green-100 text-green-700",
      label: "تحویل داده شده",
    },
    cancelled: {
      className: "bg-red-100 text-red-700",
      label: "لغو شده",
    },
  };

  return (
    <span
      className={`px-3 py-1 rounded-xl text-xs font-medium ${config[status].className}`}
    >
      {config[status].label}
    </span>
  );
}



  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-900">
        در حال دریافت سفارش‌ها...
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full overflow-x-auto">
        <div className="min-w-275 rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr className="text-neutral-700">
                <th className="px-4 py-3 font-medium">محصول</th>
                <th className="px-4 py-3 font-medium">کاربر</th>
                <th className="px-4 py-3 font-medium">مبلغ</th>
                <th className="px-4 py-3 font-medium">پرداخت</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
                <th className="px-4 py-3 font-medium">تغییر وضعیت</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => {
                  const item = order.orderItems[0];

                  return (
                    <tr
                      key={order._id}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL_BACKEND}${item.image}`}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <p className="text-neutral-800 text-sm line-clamp-2">
                              {item.name}
                            </p>
                            <p className="text-xs text-neutral-500">
                              تعداد: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-neutral-800">{order.user.name}</p>
                        <p className="text-xs text-neutral-500">
                          {order.user.email}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-neutral-800">
                          {order.totalPrice.toLocaleString()} تومان
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        {order.paymentMethod === "online"
                          ? "پرداخت آنلاین"
                          : "پرداخت در محل"}
                      </td>

                      <td className="px-4 py-3">{statusBadge(order.status)}</td>

                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              e.target.value as OrderStatus,
                            )
                          }
                          className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 outline-none focus:border-purple-500"
                        >
                          <option value="pending">در انتظار تایید</option>
                          <option value="confirmed">تایید شده</option>
                          <option value="shipping">در حال ارسال</option>
                          <option value="delivered">تحویل داده شده</option>
                          <option value="cancelled">لغو شده</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-neutral-500"
                  >
                    سفارشی یافت نشد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
