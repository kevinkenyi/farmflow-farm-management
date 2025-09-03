'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import PageHeader from "@/components/PageHeader";
import CheckUpload from "@/components/CheckUpload";
import UnifiedTimeline from "@/components/UnifiedTimeline";
import { 
  Search, 
  Plus, 
  Filter, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileImage,
  CheckCircle,
  Calendar,
  Package,
  Users,
  BarChart3
} from "lucide-react";

interface CheckData {
  amount: number;
  date: string;
  payee: string;
  bank: string;
  checkNumber: string;
  memo?: string;
}

interface TimelineEvent {
  id: number;
  type: 'planting' | 'fertilizing' | 'watering' | 'pest_control' | 'harvesting' | 'sale' | 'payment';
  date: string;
  title: string;
  description: string;
  cost?: number;
  revenue?: number;
  worker?: string;
  client?: string;
  quantity?: number;
  unit?: string;
  pricePerUnit?: number;
  checkImage?: string;
  checkNumber?: string;
  bank?: string;
  notes?: string;
}

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'checks' | 'timeline'>('overview');
  
  // Mock data - in real app, this would come from API
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      id: 1,
      type: 'planting',
      date: '2024-01-15',
      title: 'Tomato Planting',
      description: 'Planted 100 tomato seedlings in Field A',
      cost: 500,
      worker: 'John Doe',
      quantity: 100,
      unit: 'plants'
    },
    {
      id: 2,
      type: 'fertilizing',
      date: '2024-01-20',
      title: 'Fertilizer Application',
      description: 'Applied organic fertilizer to tomato plants',
      cost: 300,
      worker: 'Jane Smith',
      quantity: 2,
      unit: 'kg'
    },
    {
      id: 3,
      type: 'harvesting',
      date: '2024-03-15',
      title: 'First Harvest',
      description: 'Harvested 50kg of tomatoes',
      cost: 200,
      worker: 'John Doe',
      quantity: 50,
      unit: 'kg'
    },
    {
      id: 4,
      type: 'sale',
      date: '2024-03-16',
      title: 'Sale to Green Valley School',
      description: 'Sold 30kg tomatoes to Green Valley Primary School',
      revenue: 4500,
      client: 'Green Valley Primary School',
      quantity: 30,
      unit: 'kg',
      pricePerUnit: 150
    },
    {
      id: 5,
      type: 'payment',
      date: '2024-03-20',
      title: 'Payment Received',
      description: 'Received payment for tomato sale',
      revenue: 4500,
      client: 'Green Valley Primary School',
      checkNumber: 'CHK-2024-001234',
      bank: 'Equity Bank',
      notes: 'Check deposited and cleared'
    }
  ]);

  const [checks, setChecks] = useState<CheckData[]>([
    {
      amount: 4500,
      date: '2024-03-20',
      payee: 'Green Valley Primary School',
      bank: 'Equity Bank',
      checkNumber: 'CHK-2024-001234',
      memo: 'Payment for fresh vegetables - December order'
    },
    {
      amount: 3200,
      date: '2024-03-25',
      payee: 'Sunshine Secondary School',
      bank: 'KCB Bank',
      checkNumber: 'CHK-2024-001567',
      memo: 'Payment for lettuce and carrots'
    }
  ]);

  const handleCheckProcessed = (checkData: CheckData) => {
    // Add to checks list
    setChecks([...checks, checkData]);
    
    // Add payment event to timeline
    const newEvent: TimelineEvent = {
      id: Date.now(),
      type: 'payment',
      date: checkData.date,
      title: 'Payment Received',
      description: `Received payment from ${checkData.payee}`,
      revenue: checkData.amount,
      client: checkData.payee,
      checkNumber: checkData.checkNumber,
      bank: checkData.bank,
      notes: checkData.memo
    };
    
    setTimelineEvents([...timelineEvents, newEvent]);
    
    alert('Payment recorded successfully!');
  };

  const calculateTotalRevenue = () => {
    return timelineEvents
      .filter(event => event.revenue)
      .reduce((sum, event) => sum + (event.revenue || 0), 0);
  };

  const calculateTotalCosts = () => {
    return timelineEvents
      .filter(event => event.cost)
      .reduce((sum, event) => sum + (event.cost || 0), 0);
  };

  const calculateProfit = () => {
    return calculateTotalRevenue() - calculateTotalCosts();
  };

  const getPendingPayments = () => {
    const sales = timelineEvents.filter(event => event.type === 'sale');
    const payments = timelineEvents.filter(event => event.type === 'payment');
    
    const totalSales = sales.reduce((sum, event) => sum + (event.revenue || 0), 0);
    const totalPayments = payments.reduce((sum, event) => sum + (event.revenue || 0), 0);
    
    return totalSales - totalPayments;
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <PageHeader 
        title="Financial Management" 
        subtitle="Track income, expenses, and payments"
      />

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <Link href="/sales/add" className="flex items-center space-x-2 bg-harvest-500 text-white px-4 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Record Sale</span>
            </Link>
          </div>
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('checks')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'checks'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FileImage className="h-4 w-4" />
              <span>Check Upload</span>
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'timeline'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Financial Summary */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    KSH {calculateTotalRevenue().toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-4 text-center">
                  <TrendingDown className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    KSH {calculateTotalCosts().toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Costs</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className={`text-2xl font-bold ${calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    KSH {calculateProfit().toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {calculateProfit() >= 0 ? 'Net Profit' : 'Net Loss'}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    KSH {getPendingPayments().toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pending Payments</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Checks */}
            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileImage className="h-5 w-5 text-earth-600" />
                  <span>Recent Checks ({checks.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checks.slice(0, 3).map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{check.payee}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {check.date} • {check.bank} • #{check.checkNumber}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        KSH {check.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'checks' && (
          <CheckUpload onCheckProcessed={handleCheckProcessed} />
        )}

        {activeTab === 'timeline' && (
          <UnifiedTimeline 
            cropId={1} 
            events={timelineEvents}
            onAddEvent={(event) => {
              const newEvent = { ...event, id: Date.now() };
              setTimelineEvents([...timelineEvents, newEvent]);
            }}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}