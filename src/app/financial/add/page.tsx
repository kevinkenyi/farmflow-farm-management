'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowLeft,
  Save,
  DollarSign,
  Calendar,
  Receipt,
  ShoppingCart,
  Users,
  Wrench
} from "lucide-react";

export default function AddFinancialPage() {
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    category: 'sales',
    amount: '',
    description: '',
    date: '',
    paymentMethod: 'cash',
    relatedCrop: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Connect to backend API
      console.log('Adding new transaction:', newTransaction);
      
      // TODO: Show success toast and redirect
      // router.push('/financial');
    } catch (error) {
      console.error('Error adding transaction:', error);
      // TODO: Show error toast
    }
  };

  const getCategoryOptions = () => {
    if (newTransaction.type === 'income') {
      return [
        { value: 'sales', label: 'Sales' },
        { value: 'services', label: 'Services' },
        { value: 'grants', label: 'Grants' },
        { value: 'other', label: 'Other Income' }
      ];
    } else {
      return [
        { value: 'purchases', label: 'Purchases' },
        { value: 'labor', label: 'Labor' },
        { value: 'equipment', label: 'Equipment' },
        { value: 'maintenance', label: 'Maintenance' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'other', label: 'Other Expenses' }
      ];
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link 
                href="/financial"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Transaction</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Record income or expense</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="px-4 py-6">
        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Transaction Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Transaction Type *
                  </label>
                  <select
                    required
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value, category: e.target.value === 'income' ? 'sales' : 'purchases'})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  >
                    {getCategoryOptions().map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount (KSH) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <select
                    value={newTransaction.paymentMethod}
                    onChange={(e) => setNewTransaction({...newTransaction, paymentMethod: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  >
                    <option value="cash">Cash</option>
                    <option value="mpesa">M-Pesa</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="check">Check</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Related Crop (Optional)
                  </label>
                  <select
                    value={newTransaction.relatedCrop}
                    onChange={(e) => setNewTransaction({...newTransaction, relatedCrop: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  >
                    <option value="">Select a crop</option>
                    <option value="tomatoes">Tomatoes</option>
                    <option value="lettuce">Lettuce</option>
                    <option value="strawberries">Strawberries</option>
                    <option value="carrots">Carrots</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  required
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="Brief description of the transaction"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({...newTransaction, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="Additional notes about the transaction..."
                />
              </div>
              
              <div className="flex space-x-3 pt-6">
                <Link
                  href="/financial"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-harvest-500 text-white rounded-lg hover:bg-harvest-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Add Transaction</span>
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

