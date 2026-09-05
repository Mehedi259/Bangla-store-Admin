'use client';

import React from 'react';
import { Search, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import clsx from 'clsx';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  searchPlaceholder?: string;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export default function DataTable({ 
  columns, 
  data, 
  searchPlaceholder = "Search...",
  onEdit,
  onDelete
}: DataTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[800px]">
          <thead className="bg-gray-50/50 text-xs text-gray-500 uppercase font-semibold border-b border-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-medium">{col.label}</th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button onClick={() => onEdit(item)} className="p-1.5 text-gray-400 hover:text-[#4F46E5] rounded-md hover:bg-indigo-50 transition-colors">
                            <Edit2 size={16} />
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(item)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to {data.length} of {data.length} entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded text-gray-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-[#4F46E5] text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
