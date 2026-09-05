'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockProducts = [
  { id: 1, img: 'https://placehold.co/40x40/F3F4F6/9CA3AF?text=P1', name: 'ঐতিহ্যবাহী জামদানি শাড়ি', category: 'Clothing', price: '৳ 8,000', stock: 45, status: 'Active' },
  { id: 2, img: 'https://placehold.co/40x40/F3F4F6/9CA3AF?text=P2', name: 'কটন পাঞ্জাবি', category: 'Clothing', price: '৳ 1,500', stock: 120, status: 'Active' },
  { id: 3, img: 'https://placehold.co/40x40/F3F4F6/9CA3AF?text=P3', name: 'নকশী কাঁথা (ডাবল)', category: 'Home Decor', price: '৳ 2,500', stock: 15, status: 'Low Stock' },
  { id: 4, img: 'https://placehold.co/40x40/F3F4F6/9CA3AF?text=P4', name: 'মাটির হাঁড়ি সেট', category: 'Kitchen', price: '৳ 800', stock: 0, status: 'Out of Stock' },
];

const columns = [
  { 
    key: 'name', 
    label: 'Product', 
    render: (val: string, item: any) => (
      <div className="flex items-center gap-3">
        <img src={item.img} className="w-10 h-10 rounded-lg object-cover border border-gray-100" alt={val} />
        <span className="font-medium text-gray-800">{val}</span>
      </div>
    ) 
  },
  { key: 'category', label: 'Category', render: (val: string) => <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">{val}</span> },
  { key: 'price', label: 'Price', render: (val: string) => <span className="font-bold text-gray-800">{val}</span> },
  { key: 'stock', label: 'Stock' },
  { 
    key: 'status', 
    label: 'Status', 
    render: (val: string) => {
      let color = 'bg-gray-100 text-gray-700';
      if(val === 'Active') color = 'bg-emerald-100 text-emerald-700';
      else if(val === 'Low Stock') color = 'bg-amber-100 text-amber-700';
      else if(val === 'Out of Stock') color = 'bg-red-100 text-red-700';
      return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${color}`}>{val}</span>;
    } 
  },
];

export default function ProductsPage() {
  return (
    <div>
      <PageHeader title="Products" description="Manage your store's inventory and products." onAdd={() => alert('Add product')} addLabel="Add Product" />
      <DataTable columns={columns} data={mockProducts} searchPlaceholder="Search products..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
