'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockOrders = [
  { id: '#BS-250617', date: '17 Jun 2025, 10:45 AM', customer: 'Taufiq Rahman', total: '৳ 2,650', payment: 'bKash', status: 'Delivered' },
  { id: '#BS-250616', date: '17 Jun 2025, 09:30 AM', customer: 'Nusrat Jahan', total: '৳ 1,850', payment: 'Nagad', status: 'Processing' },
  { id: '#BS-250615', date: '16 Jun 2025, 08:15 PM', customer: 'Imran Hossain', total: '৳ 3,450', payment: 'COD', status: 'Shipped' },
  { id: '#BS-250614', date: '16 Jun 2025, 02:20 PM', customer: 'Farhana Akter', total: '৳ 950', payment: 'bKash', status: 'Delivered' },
  { id: '#BS-250613', date: '15 Jun 2025, 11:10 AM', customer: 'Mahmudul Hasan', total: '৳ 1,280', payment: 'Nagad', status: 'Cancelled' },
];

const columns = [
  { key: 'id', label: 'Order ID', render: (val: string) => <span className="font-medium text-[#4F46E5]">{val}</span> },
  { key: 'date', label: 'Date' },
  { key: 'customer', label: 'Customer', render: (val: string) => <span className="font-medium text-gray-800">{val}</span> },
  { key: 'total', label: 'Total', render: (val: string) => <span className="font-medium text-gray-800">{val}</span> },
  { key: 'payment', label: 'Payment' },
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
  return (
    <div>
      <PageHeader title="Orders" description="Manage and track all customer orders." onAdd={() => alert('Create order')} addLabel="Create Order" />
      <DataTable columns={columns} data={mockOrders} searchPlaceholder="Search by Order ID or Customer..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
