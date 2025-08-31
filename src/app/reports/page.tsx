'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  MapPin,
  Calendar,
  Droplets,
  BarChart,
  Download,
  Filter,
  CalendarDays,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function ReportsPage() {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 420000, expenses: 280000, profit: 140000 },
    { month: 'Feb', revenue: 380000, expenses: 320000, profit: 60000 },
    { month: 'Mar', revenue: 520000, expenses: 290000, profit: 230000 },
    { month: 'Apr', revenue: 480000, expenses: 310000, profit: 170000 },
    { month: 'May', revenue: 610000, expenses: 340000, profit: 270000 },
    { month: 'Jun', revenue: 845000, expenses: 420000, profit: 425000 }
  ];

  const cropPerformance = [
    { name: 'Tomatoes', yield: 85, revenue: 320000, color: '#FF6B6B' },
    { name: 'Lettuce', yield: 72, revenue: 180000, color: '#4ECDC4' },
    { name: 'Strawberries', yield: 91, revenue: 280000, color: '#45B7D1' },
    { name: 'Carrots', yield: 68, revenue: 120000, color: '#96CEB4' },
    { name: 'Peppers', yield: 78, revenue: 210000, color: '#FFEAA7' }
  ];

  const inventoryStatus = [
    { name: 'In Stock', value: 65, color: '#4ECDC4' },
    { name: 'Low Stock', value: 20, color: '#FFEAA7' },
    { name: 'Out of Stock', value: 15, color: '#FF6B6B' }
  ];

  const recentActivities = [
    { type: 'harvest', title: 'Tomato harvest completed', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
    { type: 'planting', title: 'New crop planted', time: '1 day ago', icon: BarChart3, color: 'text-blue-600' },
    { type: 'maintenance', title: 'Equipment maintenance', time: '2 days ago', icon: AlertTriangle, color: 'text-orange-600' },
    { type: 'sale', title: 'Crop sale completed', time: '3 days ago', icon: DollarSign, color: 'text-green-600' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Farm insights and performance metrics</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-earth-200 dark:border-gray-700 rounded-lg hover:bg-earth-50 dark:hover:bg-gray-700 transition-colors">
                <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 border border-earth-200 dark:border-gray-700 rounded-lg hover:bg-earth-50 dark:hover:bg-gray-700 transition-colors">
                <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Crops</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +8% from last month
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-nature-600 dark:text-nature-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(845000)}</p>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12% from last month
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-harvest-100 dark:bg-harvest-900 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-harvest-600 dark:text-harvest-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(420000)}</p>
                    <div className="flex items-center text-red-600 text-sm">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      +5% from last month
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Net Profit</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(425000)}</p>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +18% from last month
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend Chart */}
            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8B4513" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#DC143C" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" stroke="#228B22" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Crop Performance Chart */}
            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Crop Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={cropPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8B4513" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Status Chart */}
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="50%" height={300}>
                  <PieChart>
                    <Pie
                      data={inventoryStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {inventoryStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color.replace('text-', 'bg-').replace('600', '100')} dark:bg-gray-700`}>
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-earth-200 dark:border-gray-700">
        <div className="flex justify-around items-center py-2">
          <Link
            href="/fields"
            className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <MapPin className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Fields</span>
          </Link>
          <Link
            href="/crops"
            className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Calendar className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Crops</span>
          </Link>
          <Link
            href="/inventory"
            className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Droplets className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Inventory</span>
          </Link>
          <Link
            href="/reports"
            className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors text-earth-500 bg-earth-100 dark:bg-earth-900"
          >
            <BarChart className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Reports</span>
          </Link>
        </div>
      </nav>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
