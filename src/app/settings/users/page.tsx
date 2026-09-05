'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';

const mockUsers = [
  { id: 1, name: 'Mehedi Hasan', email: 'mehedi@example.com', role: 'Super Admin', status: 'Active' },
  { id: 2, name: 'Taufiq Rahman', email: 'taufiq@example.com', role: 'Manager', status: 'Active' },
  { id: 3, name: 'Sarah Islam', email: 'sarah@example.com', role: 'Editor', status: 'Inactive' },
];

const columns = [
  { key: 'name', label: 'Name', render: (val: string) => <span className="font-bold text-gray-800">{val}</span> },
  { key: 'email', label: 'Email' },
  { 
    key: 'role', 
    label: 'Role',
    render: (val: string) => (
      <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded font-medium text-xs border border-indigo-100">{val}</span>
    )
  },
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

export default function UsersSettingsPage() {
  return (
    <div>
      <PageHeader title="Users & Roles" description="Manage admin dashboard access and permissions." onAdd={() => {}} addLabel="Add User" />
      <DataTable columns={columns} data={mockUsers} searchPlaceholder="Search users..." onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
