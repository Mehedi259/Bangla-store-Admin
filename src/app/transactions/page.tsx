'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockTransactions = [
  { id: 'TRX-98234', order: '#BS-250617', amount: '৳ 2,650', method: 'bKash', date: '17 Jun 2025', status: 'Success' },
  { id: 'TRX-98233', order: '#BS-250616', amount: '৳ 1,850', method: 'Nagad', date: '17 Jun 2025', status: 'Pending' },
  { id: 'TRX-98232', order: '#BS-250614', amount: '৳ 950', method: 'SSLCommerz', date: '16 Jun 2025', status: 'Success' },
  { id: 'TRX-98231', order: '#BS-250613', amount: '৳ 1,280', method: 'Nagad', date: '15 Jun 2025', status: 'Failed' },
];

const columns = [
  { key: 'id', label: 'Transaction ID', render: (val: string) => <span className="font-medium text-[#4F46E5]">{val}</span> },
  { key: 'order', label: 'Order ID' },
  { key: 'amount', label: 'Amount', render: (val: string) => <span className="font-bold text-gray-900">{val}</span> },
  { key: 'method', label: 'Method' },
  { key: 'date', label: 'Date' },
  { 
    key: 'status', 
    label: 'Status', 
    render: (val: string) => {
      let color = 'bg-gray-100 text-gray-700';
      if(val === 'Success') color = 'bg-emerald-100 text-emerald-700';
      else if(val === 'Pending') color = 'bg-amber-100 text-amber-700';
      else if(val === 'Failed') color = 'bg-red-100 text-red-700';
      return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${color}`}>{val}</span>;
    } 
  },
];

export default function TransactionsPage() {
  return (
    <div>
      <PageHeader title="Transactions" description="View all payment transactions." />
      <DataTable columns={columns} data={mockTransactions} searchPlaceholder="Search transactions..." />
    </div>
  );
}
