'use client';

import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const salesData = [
  { name: 'May 18', revenue: 600, orders: 300 },
  { name: 'May 23', revenue: 500, orders: 400 },
  { name: 'May 28', revenue: 1000, orders: 800 },
  { name: 'Jun 02', revenue: 600, orders: 500 },
  { name: 'Jun 07', revenue: 1100, orders: 600 },
  { name: 'Jun 12', revenue: 500, orders: 400 },
  { name: 'Jun 17', revenue: 900, orders: 600 },
];

const statusData = [
  { name: 'Delivered', value: 1245, color: '#10B981' },
  { name: 'Processing', value: 456, color: '#F59E0B' },
  { name: 'Shipped', value: 356, color: '#3B82F6' },
  { name: 'Cancelled', value: 210, color: '#EF4444' },
  { name: 'Pending', value: 186, color: '#8B5CF6' },
];

export function SalesChart() {
  return (
    <div className="h-72 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value) => `${value >= 1000 ? (value / 1000) + 'M' : value + 'k'}`}
          />
          <RechartsTooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#4F46E5" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="orders" 
            stroke="#3B82F6" 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StatusChart() {
  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <RechartsTooltip 
            formatter={(value) => `${value} Orders`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-gray-800">2,453</span>
        <span className="text-xs text-gray-500">Total Orders</span>
      </div>
    </div>
  );
}
