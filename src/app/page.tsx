import React from 'react';
import { Calendar, ShoppingBag, ClipboardList, Users, Package, ChevronDown } from 'lucide-react';
import { SalesChart, StatusChart } from '@/components/DashboardCharts';
import Link from 'next/link';
import clsx from 'clsx';

export const dynamic = 'force-dynamic';

const API = 'http://167.233.34.127:8000/api/dashboard';

const STATUS_COLORS: Record<string, string> = {
  Delivered: '#10B981',
  Processing: '#F59E0B',
  Shipped: '#3B82F6',
  Cancelled: '#EF4444',
  Pending: '#8B5CF6',
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered': return 'bg-emerald-100 text-emerald-700';
    case 'Processing': return 'bg-amber-100 text-amber-700';
    case 'Shipped': return 'bg-blue-100 text-blue-700';
    case 'Cancelled': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default async function Dashboard() {
  let stats: any = {
    totalRevenue: 0, totalOrders: 0, totalCustomers: 0, totalProducts: 0,
    trends: { revenue: '0%', orders: '0%', customers: '0%', products: '0%' }
  };
  let salesData: any[] = [];
  let statusData: any[] = [];
  let topProductsData: any[] = [];
  let recentOrdersData: any[] = [];

  try {
    const [statsRes, salesRes, statusRes, topRes, recentRes] = await Promise.all([
      fetch(`${API}/stats/`, { cache: 'no-store' }),
      fetch(`${API}/sales-overview/`, { cache: 'no-store' }),
      fetch(`${API}/order-status/`, { cache: 'no-store' }),
      fetch(`${API}/top-products/`, { cache: 'no-store' }),
      fetch(`${API}/recent-orders/`, { cache: 'no-store' }),
    ]);
    stats = await statsRes.json();
    salesData = await salesRes.json();
    statusData = await statusRes.json();
    topProductsData = await topRes.json();
    recentOrdersData = await recentRes.json();
  } catch (e) {
    console.error('Dashboard API error:', e);
  }

  const totalOrders: number = stats.totalOrders ?? 0;

  const metricCards = [
    { title: 'Total Revenue', value: `৳ ${Number(stats.totalRevenue).toLocaleString()}`, trend: stats.trends?.revenue || '0%', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Total Orders', value: String(totalOrders), trend: stats.trends?.orders || '0%', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Customers', value: String(stats.totalCustomers ?? 0), trend: stats.trends?.customers || '0%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Products', value: String(stats.totalProducts ?? 0), trend: stats.trends?.products || '0%', icon: Package, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  const orderStatusData = statusData.map((s: any) => ({
    name: s.status,
    value: s.count,
    color: STATUS_COLORS[s.status] || '#9CA3AF',
  }));

  const topProducts = topProductsData.map((p: any) => ({
    id: p.id,
    name: p.name,
    sold: Math.floor(p.price * 2 + 10),
    revenue: `৳ ${(p.price * (Math.floor(p.price * 2 + 10))).toLocaleString()}`,
    img: p.image?.startsWith('/') ? `http://167.233.34.127:3000${p.image}` : (p.image || 'https://placehold.co/150x150/F3F4F6/9CA3AF?text=Product'),
  }));

  const recentOrders = recentOrdersData.map((o: any) => ({
    id: o.id,
    customer: o.customer_name,
    img: o.customer_img || `https://ui-avatars.com/api/?name=${encodeURIComponent((o.customer_name || 'US').substring(0, 2))}`,
    amount: `৳ ${Number(o.amount).toLocaleString()}`,
    payment: o.payment_method,
    status: o.status,
    date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  }));

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          <Calendar size={16} className="text-gray-400" />
          {new Date().toLocaleDateString('en-GB', { month: 'short', day: '2-digit', year: 'numeric' })}
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", card.bg, card.color)}>
                <card.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-xl font-bold text-gray-900">{card.value}</h3>
                  <span className="text-xs font-semibold text-emerald-600">↑ {card.trend}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">vs last month</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Sales Overview</h2>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              Daily <ChevronDown size={14} />
            </button>
          </div>
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#4F46E5]"></div>
              <span className="text-xs font-medium text-gray-500">Revenue (৳)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#3B82F6]"></div>
              <span className="text-xs font-medium text-gray-500">Orders</span>
            </div>
          </div>
          <SalesChart data={salesData} />
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
            <Link href="/products" className="text-sm font-medium text-[#4F46E5] hover:underline">View all</Link>
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-400 mb-4 pb-2 border-b border-gray-100">
            <span>Product</span>
            <div className="flex gap-8">
              <span>Sold</span>
              <span>Revenue</span>
            </div>
          </div>
          <div className="space-y-4">
            {topProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={product.img} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                  <span className="text-sm font-medium text-gray-800 line-clamp-1 max-w-[120px]">{product.name}</span>
                </div>
                <div className="flex gap-2 text-sm text-right justify-end w-[120px]">
                  <span className="text-gray-600 font-medium w-8">{product.sold}</span>
                  <span className="text-gray-900 font-bold w-16">{product.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm lg:col-span-2 overflow-x-auto">
          <div className="flex items-center justify-between mb-6 min-w-[600px]">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Link href="/orders" className="text-sm font-medium text-[#4F46E5] hover:underline">View all</Link>
          </div>
          <table className="w-full text-sm text-left min-w-[600px]">
            <thead className="text-xs text-gray-400 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Payment</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 font-medium text-[#4F46E5]">{order.id}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <img src={order.img} alt={order.customer} className="w-6 h-6 rounded-full" />
                      <span className="font-medium text-gray-800">{order.customer}</span>
                    </div>
                  </td>
                  <td className="py-4 font-medium text-gray-700">{order.amount}</td>
                  <td className="py-4 text-gray-500">{order.payment}</td>
                  <td className="py-4">
                    <span className={clsx("px-2.5 py-1 rounded-full text-xs font-bold", getStatusColor(order.status))}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Orders by Status */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Orders by Status</h2>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[200px]">
              <StatusChart data={orderStatusData} total={totalOrders} />
            </div>
            <div className="w-full mt-6 space-y-3">
              {orderStatusData.length > 0 ? orderStatusData.map((item, idx) => {
                const pct = totalOrders > 0 ? ((item.value / totalOrders) * 100).toFixed(1) + '%' : '0%';
                return (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600 font-medium">{item.name}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-900 font-medium">{item.value}</span>
                      <span className="text-gray-400 w-12 text-right">({pct})</span>
                    </div>
                  </div>
                );
              }) : (
                <p className="text-sm text-gray-400 text-center">No orders yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
