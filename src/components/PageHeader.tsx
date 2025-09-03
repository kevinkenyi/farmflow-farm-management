'use client';

import Link from "next/link";
import { Home } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showHomeButton?: boolean;
}

export default function PageHeader({ title, subtitle, showHomeButton = true }: PageHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showHomeButton && (
              <Link 
                href="/"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Go to Home"
              >
                <Home className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

