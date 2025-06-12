'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Settings, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home size={18} /> },
  { label: 'Profile', href: '/profile', icon: <User size={18} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white flex flex-col shadow-lg">
      <div className="p-6 font-bold text-xl border-b border-gray-700">
        MyApp
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? 'bg-gray-700'
                    : 'hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
          <LogOut size={18} />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
}
