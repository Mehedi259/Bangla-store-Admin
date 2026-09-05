'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockPosts = [
  { id: 1, title: 'Top 10 Eid Outfits for 2025', author: 'Admin', category: 'Fashion', views: 4200, status: 'Published' },
  { id: 2, title: 'How to care for your Jamdani Shari', author: 'Nusrat', category: 'Guides', views: 1850, status: 'Published' },
  { id: 3, title: 'Upcoming Summer Sale Highlights', author: 'Admin', category: 'News', views: 0, status: 'Draft' },
];

const columns = [
  { key: 'title', label: 'Post Title', render: (val: string) => <span className="font-bold text-gray-800">{val}</span> },
  { key: 'author', label: 'Author' },
  { key: 'category', label: 'Category' },
  { key: 'views', label: 'Views' },
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

export default function BlogPage() {
  return (
    <div>
      <PageHeader title="Blog" description="Manage blog posts and articles." onAdd={() => {}} addLabel="Write Post" />
      <DataTable columns={columns} data={mockPosts} searchPlaceholder="Search posts..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
