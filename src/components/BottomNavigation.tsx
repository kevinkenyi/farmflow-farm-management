'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Wrench, 
  CheckCircle2,
  Home,
  Settings,
  School
} from "lucide-react";

export default function BottomNavigation() {
  const pathname = usePathname();

  const navigationItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: MapPin, label: 'Fields', href: '/fields' },
    { icon: Calendar, label: 'Crops', href: '/crops' },
    { icon: Calendar, label: 'Tasks', href: '/tasks' },
    { icon: Users, label: 'Workers', href: '/workers' },
    { icon: School, label: 'Clients', href: '/clients' },
    { icon: Wrench, label: 'Inventory', href: '/inventory' },
    { icon: CheckCircle2, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings/sms' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-earth-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center py-2">
        {navigationItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-earth-500 bg-earth-100 dark:bg-earth-900'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
