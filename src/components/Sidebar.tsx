'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, ShoppingCart, Package, Layers, Users, Ticket, Star, 
  BarChart2, FileText, CreditCard, Image as ImageIcon, File, 
  Edit3, Settings, UserCheck, Wallet, Truck, LogOut 
} from 'lucide-react';
import clsx from 'clsx';

const menuGroups = [
  {
    title: 'MANAGE',
    items: [
      { name: 'Orders', icon: ShoppingCart, path: '/orders' },
      { name: 'Products', icon: Package, path: '/products' },
      { name: 'Categories', icon: Layers, path: '/categories' },
      { name: 'Customers', icon: Users, path: '/customers' },
      { name: 'Coupons', icon: Ticket, path: '/coupons' },
      { name: 'Reviews', icon: Star, path: '/reviews' },
    ]
  },
  {
    title: 'SALES',
    items: [
      { name: 'Analytics', icon: BarChart2, path: '/analytics' },
      { name: 'Reports', icon: FileText, path: '/reports' },
      { name: 'Transactions', icon: CreditCard, path: '/transactions' },
    ]
  },
  {
    title: 'CONTENT',
    items: [
      { name: 'Banners', icon: ImageIcon, path: '/banners' },
      { name: 'Pages', icon: File, path: '/pages' },
      { name: 'Blog', icon: Edit3, path: '/blog' },
    ]
  },
  {
    title: 'SETTINGS',
    items: [
      { name: 'Store Settings', icon: Settings, path: '/settings/store' },
      { name: 'Users & Roles', icon: UserCheck, path: '/settings/users' },
      { name: 'Payment Methods', icon: Wallet, path: '/settings/payment' },
      { name: 'Shipping Methods', icon: Truck, path: '/settings/shipping' },
    ]
  }
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={clsx(
        "fixed top-0 left-0 h-screen w-64 bg-[#1e1e2d] text-[#9899ac] flex flex-col transition-transform duration-300 z-50 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 shrink-0 bg-[#1a1a27] border-b border-gray-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-red-500 text-white p-1.5 rounded-lg flex items-center justify-center">
              <ShoppingCart size={20} />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">বাংলা স্টোর</h1>
              <p className="text-[10px] uppercase tracking-wider text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6 px-4 flex flex-col gap-6">
          
          <Link href="/" className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
            pathname === '/' ? "bg-[#4F46E5] text-white shadow-lg shadow-indigo-500/30" : "hover:text-white hover:bg-white/5"
          )}>
            <Home size={20} />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>

          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-4 text-[11px] font-bold text-[#565674] uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {group.items.map((item, itemIdx) => {
                  const isActive = pathname.startsWith(item.path);
                  return (
                    <li key={itemIdx}>
                      <Link href={item.path} className={clsx(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm",
                        isActive ? "bg-[#4F46E5] text-white shadow-lg shadow-indigo-500/30" : "hover:text-white hover:bg-white/5"
                      )}>
                        <item.icon size={18} className={isActive ? "text-white" : "text-[#76768e]"} />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

        </div>

        {/* Logout */}
        <div className="p-4 shrink-0 mt-auto border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium hover:text-white hover:bg-white/5 transition-all duration-200">
            <LogOut size={18} className="text-[#76768e]" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
