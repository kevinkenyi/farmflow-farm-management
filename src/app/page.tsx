import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Cloud, 
  User, 
  Calendar, 
  Plus, 
  Droplets, 
  Wrench, 
  MapPin, 
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Sun,
  CloudRain,
  Thermometer
} from "lucide-react";


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header with Weather and User */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Weather Widget */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <CloudRain className="h-6 w-6 text-nature-500" />
                <div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">23°</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">70% chance of rain</div>
                </div>
              </div>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-earth-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Date Selector */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-earth-200 dark:border-gray-700">
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { day: '23', name: 'Sun', tasks: 3 },
            { day: '24', name: 'Mon', tasks: 0 },
            { day: '25', name: 'Tue', tasks: 5, active: true },
            { day: '26', name: 'Wed', tasks: 2 },
            { day: '27', name: 'Thu', tasks: 1 },
          ].map((date, index) => (
            <div
              key={index}
              className={`flex flex-col items-center min-w-[60px] p-2 rounded-lg cursor-pointer transition-colors ${
                date.active 
                  ? 'bg-earth-500 text-white' 
                  : 'bg-earth-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-earth-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="text-sm font-medium">{date.day}</div>
              <div className="text-xs">{date.name}</div>
              {date.tasks > 0 && (
                <div className="text-xs mt-1 bg-harvest-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {date.tasks}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Day Tasks Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Day tasks</h2>
            <Link href="/tasks/add" className="flex items-center space-x-1 bg-harvest-500 text-white px-3 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add task</span>
            </Link>
          </div>
          
          <div className="space-y-3">
            {/* Task Card 1 - Urgent */}
            <Link href="/tasks/1" className="block">
              <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">8 - 10 AM</span>
                      </div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                        Check fruit for insect
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Priority:</span>
                        <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full">Urgent</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Task Card 2 - Medium */}
            <Link href="/tasks/2" className="block">
              <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">11 AM - 12 PM</span>
                      </div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                        Irrigat vegatable field
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Priority:</span>
                        <span className="bg-warning-500 text-white text-xs px-2 py-1 rounded-full">Medium</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Task Card 3 - Normal */}
            <Link href="/tasks/3" className="block">
              <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">12 - 13 PM</span>
                      </div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                        Irrigat berrie
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Priority:</span>
                        <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">Normal</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Inventory Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Inventory</h2>
          
          <div className="space-y-3">
            {/* Inventory Card 1 */}
            <Link href="/inventory/1" className="block">
              <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-nature-100 dark:bg-nature-900 rounded-lg flex items-center justify-center">
                      <Droplets className="h-5 w-5 text-nature-600 dark:text-nature-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                        Regularly changing the engine oil
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        John Deere 6M
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Inventory Card 2 */}
            <Link href="/inventory/2" className="block">
              <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-harvest-100 dark:bg-harvest-900 rounded-lg flex items-center justify-center">
                      <Wrench className="h-5 w-5 text-harvest-600 dark:text-harvest-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                        Tire inspection and replacement
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        John Deere T560
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-earth-200 dark:border-gray-700">
        <div className="flex justify-around items-center py-2">
          {[
            { icon: MapPin, label: 'Fields', href: '/crops', active: true },
            { icon: Calendar, label: 'Tasks', href: '/tasks' },
            { icon: Wrench, label: 'Inventory', href: '/inventory' },
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
