'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockPages = [
  { id: 1, title: 'About Us', slug: '/about', status: 'Published', lastUpdated: '12 May 2025' },
  { id: 2, title: 'Privacy Policy', slug: '/privacy', status: 'Published', lastUpdated: '10 Jan 2025' },
  { id: 3, title: 'Terms & Conditions', slug: '/terms', status: 'Published', lastUpdated: '10 Jan 2025' },
  { id: 4, title: 'Return Policy', slug: '/returns', status: 'Draft', lastUpdated: '16 Jun 2025' },
];

const columns = [
  { key: 'title', label: 'Page Title', render: (val: string) => <span className="font-bold text-gray-800">{val}</span> },
  { key: 'slug', label: 'URL Slug', render: (val: string) => <span className="text-[#4F46E5] underline">{val}</span> },
  { key: 'lastUpdated', label: 'Last Updated' },
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

export default function PagesPage() {
  return (
    <div>
      <PageHeader title="Pages" description="Manage static content pages (About, Privacy, etc.)." onAdd={() => {}} addLabel="Create Page" />
      <DataTable columns={columns} data={mockPages} searchPlaceholder="Search pages..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
