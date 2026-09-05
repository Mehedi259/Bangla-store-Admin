'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import { SalesChart } from '@/components/DashboardCharts';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Deep dive into your store's performance metrics." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">3.2%</p>
          <span className="text-xs text-emerald-600 font-medium">↑ 0.4% from last month</span>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Average Order Value</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">৳ 1,450</p>
          <span className="text-xs text-emerald-600 font-medium">↑ ৳ 120 from last month</span>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Bounce Rate</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">42%</p>
          <span className="text-xs text-red-500 font-medium">↑ 2% from last month</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Traffic & Sales Overview</h2>
        <SalesChart />
      </div>
    </div>
  );
}
