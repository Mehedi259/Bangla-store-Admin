'use client';

import React, { useState } from 'react';
import { Search, Sun, Bell, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
      
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center relative max-w-md w-full">
          <Search size={18} className="absolute left-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders, customers, products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-gray-500 bg-white border border-gray-200 rounded">Enter</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        <button className="text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">
          <Sun size={20} />
        </button>
        
        <button className="text-gray-500 hover:text-gray-700 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
            12
          </span>
        </button>

        <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-gray-200 cursor-pointer">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-gray-800 leading-tight">Admin</p>
            <p className="text-[11px] text-gray-500">Super Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
            <img src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff" alt="Admin" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

    </header>
  );
}
