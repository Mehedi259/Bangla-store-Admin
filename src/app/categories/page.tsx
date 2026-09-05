'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockCategories = [
  { id: 1, name: 'Clothing', items: 145, status: 'Active' },
  { id: 2, name: 'Home Decor', items: 84, status: 'Active' },
  { id: 3, name: 'Kitchen', items: 56, status: 'Active' },
  { id: 4, name: 'Jewelry', items: 92, status: 'Inactive' },
];

const columns = [
  { key: 'name', label: 'Category Name', render: (val: string) => <span className="font-bold text-gray-800">{val}</span> },
  { key: 'items', label: 'Total Products' },
  { 
    key: 'status', 
    label: 'Status', 
    render: (val: string) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${val === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
        {val}
      </span>
    ) 
  },
];

export default function CategoriesPage() {
  return (
    <div>
      <PageHeader title="Categories" description="Organize products by categories." onAdd={() => alert('Add category')} addLabel="Add Category" />
      <DataTable columns={columns} data={mockCategories} searchPlaceholder="Search categories..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
