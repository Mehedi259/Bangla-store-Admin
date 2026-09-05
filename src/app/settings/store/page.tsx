import React from 'react';

export default function StoreSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store settings here.</p>
        </div>
        <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700">
          Add New
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-gray-400 text-2xl">📋</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900">No store settings found</h2>
        <p className="text-sm text-gray-500 mt-1 max-w-sm text-center">This section is currently empty. Start by adding some data to see it here.</p>
      </div>
    </div>
  );
}
