'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  onAdd?: () => void;
  addLabel?: string;
}

export default function PageHeader({ title, description, onAdd, addLabel = 'Add New' }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      {onAdd && (
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 bg-[#4F46E5] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          {addLabel}
        </button>
      )}
    </div>
  );
}
