'use client';

import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const columns = [
  { key: 'id', label: 'Order ID', render: (val: string) => <span className="font-medium text-[#4F46E5]">{val}</span> },
  { key: 'created_at', label: 'Date', render: (val: string) => <span>{new Date(val).toLocaleString()}</span> },
  { key: 'customer_name', label: 'Customer', render: (val: string) => <span className="font-medium text-gray-800">{val}</span> },
  { key: 'amount', label: 'Total', render: (val: string) => <span className="font-medium text-gray-800">৳ {val}</span> },
  { key: 'payment_method', label: 'Payment' },
  { 
    key: 'status', 
    label: 'Status', 
    render: (val: string) => {
      let color = 'bg-gray-100 text-gray-700';
      if(val === 'Delivered') color = 'bg-emerald-100 text-emerald-700';
      else if(val === 'Processing') color = 'bg-amber-100 text-amber-700';
      else if(val === 'Shipped') color = 'bg-blue-100 text-blue-700';
      else if(val === 'Cancelled') color = 'bg-red-100 text-red-700';
      return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${color}`}>{val}</span>;
    } 
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/orders/')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader title="Orders" description="Manage and track all customer orders." onAdd={() => alert('Create order feature coming soon!')} addLabel="Create Order" />
      <DataTable columns={columns} data={orders} searchPlaceholder="Search by Order ID or Customer..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
