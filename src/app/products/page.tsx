'use client';

import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const columns = [
  { 
    key: 'name', 
    label: 'Product', 
    render: (val: string, item: any) => (
      <div className="flex items-center gap-3">
        <img src={item.image} className="w-10 h-10 rounded-lg object-cover border border-gray-100" alt={val} />
        <span className="font-medium text-gray-800">{val}</span>
      </div>
    ) 
  },
  { key: 'category', label: 'Category', render: (val: string) => <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">{val}</span> },
  { key: 'price', label: 'Price', render: (val: string) => <span className="font-bold text-gray-800">৳ {val}</span> },
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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader title="Products" description="Manage your store's inventory and products." onAdd={() => alert('Add product feature coming soon!')} addLabel="Add Product" />
      <DataTable columns={columns} data={products} searchPlaceholder="Search products..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
