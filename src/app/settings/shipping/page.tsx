'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockShipping = [
  { id: 1, zone: 'Inside Dhaka', time: '2-3 Days', fee: '৳ 60', status: 'Active' },
  { id: 2, zone: 'Outside Dhaka', time: '3-5 Days', fee: '৳ 120', status: 'Active' },
  { id: 3, zone: 'Express Delivery (Dhaka City)', time: 'Same Day', fee: '৳ 150', status: 'Active' },
];

const columns = [
  { key: 'zone', label: 'Shipping Zone', render: (val: string) => <span className="font-bold text-gray-800">{val}</span> },
  { key: 'time', label: 'Estimated Time' },
  { key: 'fee', label: 'Delivery Fee', render: (val: string) => <span className="font-bold text-gray-900">{val}</span> },
  { 
    key: 'status', 
    label: 'Status', 
    render: (val: string) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${val === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
        {val}
      </span>
    ) 
  },
];

export default function ShippingSettingsPage() {
  return (
    <div>
      <PageHeader title="Shipping Methods" description="Configure delivery zones, fees, and times." onAdd={() => {}} addLabel="Add Zone" />
      <DataTable columns={columns} data={mockShipping} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
