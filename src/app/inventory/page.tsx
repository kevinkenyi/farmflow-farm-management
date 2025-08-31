import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Filter, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  ChevronRight,
  Wrench,
  Droplets,
  Sprout,
  Truck,
  MapPin,
  Calendar,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage your farm supplies and equipment</p>
            </div>
            <Link href="/inventory/add" className="flex items-center space-x-2 bg-harvest-500 text-white px-4 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Item</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-earth-200 dark:border-gray-700">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-2 border border-earth-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-earth-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-3 py-2 border border-earth-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-earth-50 dark:hover:bg-gray-600 transition-colors">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                </div>
                <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-nature-600 dark:text-nature-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                  <p className="text-2xl font-bold text-error-600">8</p>
                </div>
                <div className="w-12 h-12 bg-error-100 dark:bg-error-900 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-error-600 dark:text-error-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">KSh 1,245,000</p>
                </div>
                <div className="w-12 h-12 bg-harvest-100 dark:bg-harvest-900 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-harvest-600 dark:text-harvest-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Categories */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h2>
          
          {/* Seeds Category */}
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900 rounded-lg flex items-center justify-center">
                    <Sprout className="h-6 w-6 text-nature-600 dark:text-nature-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Seeds</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">24 items • KSh 234,000 value</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Fertilizers Category */}
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-earth-100 dark:bg-earth-900 rounded-lg flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-earth-600 dark:text-earth-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Fertilizers</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">18 items • KSh 412,000 value</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Tools Category */}
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-harvest-100 dark:bg-harvest-900 rounded-lg flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-harvest-600 dark:text-harvest-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tools & Equipment</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">32 items • KSh 589,000 value</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Harvest Category */}
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center">
                    <Truck className="h-6 w-6 text-success-600 dark:text-success-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Harvest Storage</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">12 items • KSh 10,000 value</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-nature-100 dark:bg-nature-900 rounded-full flex items-center justify-center">
                      <Plus className="h-4 w-4 text-nature-600 dark:text-nature-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Added Tomato Seeds</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">+50 units</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-error-100 dark:bg-error-900 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-error-600 dark:text-error-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Low Stock Alert</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">4 hours ago</p>
                    </div>
                  </div>
                  <span className="text-sm text-error-600">Fertilizer A</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-earth-200 dark:border-gray-700">
        <div className="flex justify-around items-center py-2">
          {[
            { icon: MapPin, label: 'Fields', href: '/crops' },
            { icon: Calendar, label: 'Tasks', href: '/tasks' },
            { icon: Wrench, label: 'Inventory', href: '/inventory', active: true },
            { icon: CheckCircle2, label: 'Reports', href: '/reports' },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                item.active
                  ? 'text-earth-500 bg-earth-100 dark:bg-earth-900'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
