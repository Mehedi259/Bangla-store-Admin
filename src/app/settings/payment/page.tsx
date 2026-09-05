'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';

export default function PaymentSettingsPage() {
  const methods = [
    { name: 'Cash on Delivery (COD)', description: 'Allow customers to pay in cash upon delivery.', active: true },
    { name: 'bKash (Automated)', description: 'Receive payments automatically via bKash merchant API.', active: true },
    { name: 'Nagad', description: 'Manual or automated Nagad payments.', active: true },
    { name: 'SSLCommerz', description: 'Credit cards, debit cards, and net banking support.', active: false },
    { name: 'Stripe', description: 'International credit card processing.', active: false },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="Payment Methods" description="Configure how your store accepts payments." />
      
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {methods.map((method, idx) => (
          <div key={idx} className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">{method.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{method.description}</p>
            </div>
            
            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={method.active} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
