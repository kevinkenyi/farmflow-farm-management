'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Receipt,
  ShoppingCart,
  Wrench,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';

export default function FinancialPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with real API calls
  const stats = {
    totalIncome: 12500,
    totalExpenses: 8200,
    profit: 4300,
    profitMargin: 34.4
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'income',
      category: 'sales',
      description: 'Tomato Harvest Sale',
      amount: 1250,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'expense',
      category: 'equipment',
      description: 'Tractor Maintenance',
      amount: 450,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'income',
      category: 'sales',
      description: 'Lettuce Batch Sale',
      amount: 800,
      date: '2024-01-13',
      status: 'completed'
    },
    {
      id: 4,
      type: 'expense',
      category: 'labor',
      description: 'Seasonal Workers',
      amount: 1200,
      date: '2024-01-12',
      status: 'completed'
    }
  ];

  const categories = [
    { id: 'sales', name: 'Sales', icon: Receipt, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'purchases', name: 'Purchases', icon: ShoppingCart, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'labor', name: 'Labor', icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 'equipment', name: 'Equipment', icon: Wrench, color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-earth-900 dark:text-white">Financial Management</h1>
            <p className="text-earth-600 dark:text-earth-300">Track income, expenses, and profitability</p>
          </div>
          <Link 
            href="/financial/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-earth-600 hover:bg-earth-700 text-white rounded-xl shadow-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </Link>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-earth-600" />
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1 border border-earth-200 rounded-lg bg-white dark:bg-gray-800 text-earth-900 dark:text-white"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-earth-600 dark:text-earth-400">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalIncome)}</div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-earth-600 dark:text-earth-400">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-red-600">{formatCurrency(stats.totalExpenses)}</div>
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-earth-600 dark:text-earth-400">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-earth-600">{formatCurrency(stats.profit)}</div>
              <DollarSign className="w-5 h-5 text-earth-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-earth-600 dark:text-earth-400">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-earth-600">{stats.profitMargin}%</div>
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-earth-600" />
          <span className="text-sm font-medium text-earth-700 dark:text-earth-300">Filter by Category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-earth-600 text-white'
                : 'bg-white dark:bg-gray-800 text-earth-600 border border-earth-200 dark:border-gray-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-earth-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-earth-600 border border-earth-200 dark:border-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-earth-900 dark:text-white">Recent Transactions</h2>
          <Link 
            href="/financial/transactions"
            className="text-sm text-earth-600 hover:text-earth-700 dark:text-earth-400 dark:hover:text-earth-300"
          >
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-earth-900 dark:text-white">{transaction.description}</h3>
                      <p className="text-sm text-earth-600 dark:text-earth-400">
                        {categories.find(c => c.id === transaction.category)?.name} • {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-xs text-earth-500 dark:text-earth-400 capitalize">{transaction.status}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Category Overview */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-earth-900 dark:text-white mb-4">Category Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${category.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-earth-900 dark:text-white">{category.name}</h3>
                      <p className="text-sm text-earth-600 dark:text-earth-400">
                        {category.id === 'sales' ? formatCurrency(4500) : 
                         category.id === 'purchases' ? formatCurrency(2800) :
                         category.id === 'labor' ? formatCurrency(3200) :
                         formatCurrency(1800)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-earth-200 dark:border-gray-700 p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <Link href="/" className="flex flex-col items-center gap-1 text-earth-600 hover:text-earth-700">
            <div className="w-6 h-6 rounded-full bg-earth-100 dark:bg-earth-900 flex items-center justify-center">
              <span className="text-xs">🏠</span>
            </div>
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link href="/crops" className="flex flex-col items-center gap-1 text-earth-600 hover:text-earth-700">
            <div className="w-6 h-6 rounded-full bg-earth-100 dark:bg-earth-900 flex items-center justify-center">
              <span className="text-xs">🌱</span>
            </div>
            <span className="text-xs">Crops</span>
          </Link>
          <Link href="/inventory" className="flex flex-col items-center gap-1 text-earth-600 hover:text-earth-700">
            <div className="w-6 h-6 rounded-full bg-earth-100 dark:bg-earth-900 flex items-center justify-center">
              <span className="text-xs">📦</span>
            </div>
            <span className="text-xs">Inventory</span>
          </Link>
          <Link href="/financial" className="flex flex-col items-center gap-1 text-earth-700 dark:text-earth-300">
            <div className="w-6 h-6 rounded-full bg-earth-200 dark:bg-earth-800 flex items-center justify-center">
              <span className="text-xs">💰</span>
            </div>
            <span className="text-xs">Financial</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
