'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import { Download } from 'lucide-react';

const mockReports = [
  { id: 1, name: 'Monthly Sales Report', date: '01 Jun 2025', size: '2.4 MB', type: 'PDF' },
  { id: 2, name: 'Inventory Valuation', date: '28 May 2025', size: '1.1 MB', type: 'CSV' },
  { id: 3, name: 'Tax Summary Q2', date: '15 May 2025', size: '3.5 MB', type: 'PDF' },
];

const columns = [
  { key: 'name', label: 'Report Name', render: (val: string) => <span className="font-bold text-gray-800">{val}</span> },
  { key: 'date', label: 'Generated On' },
  { key: 'type', label: 'Format', render: (val: string) => <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold">{val}</span> },
  { key: 'size', label: 'Size' },
];

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="Download and manage system reports." onAdd={() => {}} addLabel="Generate Report" />
      <DataTable 
        columns={columns} 
        data={mockReports} 
        searchPlaceholder="Search reports..." 
        onEdit={(item) => alert('Downloading ' + item.name)} 
      />
    </div>
  );
}
