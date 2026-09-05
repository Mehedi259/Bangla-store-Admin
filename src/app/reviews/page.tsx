'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockReviews = [
  { id: 1, product: 'ঐতিহ্যবাহী জামদানি শাড়ি', customer: 'Taufiq Rahman', rating: 5, comment: 'Beautiful design and great quality!', status: 'Published' },
  { id: 2, product: 'মাটির হাঁড়ি সেট', customer: 'Imran Hossain', rating: 4, comment: 'Nice, but packing could be better.', status: 'Published' },
  { id: 3, product: 'কটন পাঞ্জাবি', customer: 'Nusrat Jahan', rating: 1, comment: 'Color faded after one wash.', status: 'Pending' },
];

const columns = [
  { key: 'product', label: 'Product', render: (val: string) => <span className="font-medium text-gray-800">{val}</span> },
  { key: 'customer', label: 'Customer' },
  { 
    key: 'rating', 
    label: 'Rating',
    render: (val: number) => (
      <div className="flex text-amber-400">
        {[...Array(5)].map((_, i) => <span key={i}>{i < val ? '★' : '☆'}</span>)}
      </div>
    )
  },
  { key: 'comment', label: 'Comment', render: (val: string) => <span className="text-gray-500 italic">"{val}"</span> },
  { 
    key: 'status', 
    label: 'Status', 
    render: (val: string) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${val === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
        {val}
      </span>
    ) 
  },
];

export default function ReviewsPage() {
  return (
    <div>
      <PageHeader title="Reviews" description="Moderate customer reviews." />
      <DataTable columns={columns} data={mockReviews} searchPlaceholder="Search reviews..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
