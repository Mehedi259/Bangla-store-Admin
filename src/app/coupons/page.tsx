'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockCoupons = [
  { id: 1, code: 'SUMMER25', discount: '25%', uses: '142 / 500', status: 'Active', expiry: '31 Aug 2025' },
  { id: 2, code: 'NEWUSER', discount: '৳ 500', uses: '89 / ∞', status: 'Active', expiry: 'Never' },
  { id: 3, code: 'EIDOFFER', discount: '15%', uses: '500 / 500', status: 'Expired', expiry: '10 Apr 2025' },
];

const columns = [
  { key: 'code', label: 'Coupon Code', render: (val: string) => <span className="px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded font-mono font-bold">{val}</span> },
  { key: 'discount', label: 'Discount', render: (val: string) => <span className="font-bold text-gray-800">{val}</span> },
  { key: 'uses', label: 'Usage' },
  { key: 'expiry', label: 'Expiry Date' },
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

export default function CouponsPage() {
  return (
    <div>
      <PageHeader title="Coupons" description="Manage discount codes and promotions." onAdd={() => alert('Add coupon')} addLabel="Create Coupon" />
      <DataTable columns={columns} data={mockCoupons} searchPlaceholder="Search coupon codes..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
