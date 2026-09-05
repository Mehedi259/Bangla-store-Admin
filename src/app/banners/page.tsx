'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockBanners = [
  { id: 1, title: 'Eid Special Sale', position: 'Hero Slider', status: 'Active', clicks: 1250 },
  { id: 2, name: 'Free Shipping Promo', position: 'Header Top', status: 'Active', clicks: 850 },
  { id: 3, name: 'Winter Collection', position: 'Hero Slider', status: 'Inactive', clicks: 4500 },
];

const columns = [
  { key: 'title', label: 'Banner Title', render: (val: string, item: any) => <span className="font-bold text-gray-800">{val || item.name}</span> },
  { key: 'position', label: 'Position' },
  { key: 'clicks', label: 'Clicks / Views' },
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

export default function BannersPage() {
  return (
    <div>
      <PageHeader title="Banners" description="Manage website banners and promotional graphics." onAdd={() => {}} addLabel="Upload Banner" />
      <DataTable columns={columns} data={mockBanners} searchPlaceholder="Search banners..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
