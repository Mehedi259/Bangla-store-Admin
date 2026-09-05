'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';

export default function StoreSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="Store Settings" description="Manage your general store information and configuration." />
      
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Store Name</label>
            <input type="text" defaultValue="Bangla Store" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Contact Email</label>
            <input type="email" defaultValue="support@banglastore.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" defaultValue="+880 1712-345678" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Currency</label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] bg-white">
              <option>BDT (৳)</option>
              <option>USD ($)</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Store Address</label>
            <textarea rows={3} defaultValue="123 Banani, Dhaka, Bangladesh" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"></textarea>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button className="bg-[#4F46E5] text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
