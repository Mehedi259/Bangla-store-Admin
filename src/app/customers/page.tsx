'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockCustomers = [
  { id: 1, name: 'Taufiq Rahman', email: 'taufiq@example.com', orders: 12, spent: '৳ 24,500', joined: '12 Jan 2024' },
  { id: 2, name: 'Nusrat Jahan', email: 'nusrat@example.com', orders: 8, spent: '৳ 15,200', joined: '04 Mar 2024' },
  { id: 3, name: 'Imran Hossain', email: 'imran@example.com', orders: 3, spent: '৳ 5,400', joined: '22 May 2024' },
];

const columns = [
  { 
    key: 'name', 
    label: 'Customer', 
    render: (val: string, item: any) => (
      <div>
        <div className="font-bold text-gray-800">{val}</div>
        <div className="text-xs text-gray-500">{item.email}</div>
      </div>
    ) 
  },
  { key: 'orders', label: 'Total Orders' },
  { key: 'spent', label: 'Total Spent', render: (val: string) => <span className="font-medium">{val}</span> },
  { key: 'joined', label: 'Joined Date' },
];

export default function CustomersPage() {
  return (
    <div>
      <PageHeader title="Customers" description="View and manage customer data." />
      <DataTable columns={columns} data={mockCustomers} searchPlaceholder="Search by name or email..." onEdit={() => {}} />
    </div>
  );
}
