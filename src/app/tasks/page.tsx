import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  MapPin,
  Wrench
} from "lucide-react";
import Link from "next/link";

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage your daily farm tasks</p>
            </div>
            <Link href="/tasks/add" className="flex items-center space-x-2 bg-harvest-500 text-white px-4 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Task</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Tasks</h2>
          
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Check fruit for insects</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">8:00 AM - 10:00 AM</p>
                  </div>
                </div>
                <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full">Urgent</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Irrigate vegetable field</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">11:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <span className="bg-warning-500 text-white text-xs px-2 py-1 rounded-full">Medium</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-success-500" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Irrigate berries</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">12:00 PM - 1:00 PM</p>
                  </div>
                </div>
                <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-full">Completed</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-earth-200 dark:border-gray-700">
        <div className="flex justify-around items-center py-2">
          {[
            { icon: MapPin, label: 'Fields', href: '/fields' },
            { icon: Calendar, label: 'Tasks', href: '/tasks' },
            { icon: Wrench, label: 'Inventory', href: '/inventory' },
            { icon: CheckCircle2, label: 'Reports', href: '/reports' },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
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



                </div>

                <span className="bg-warning-500 text-white text-xs px-2 py-1 rounded-full">Medium</span>

              </div>

            </CardContent>

          </Card>



          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">

            <CardContent className="p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center space-x-3">

                  <CheckCircle2 className="h-5 w-5 text-success-500" />

                  <div>

                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Irrigate berries</h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400">12:00 PM - 1:00 PM</p>

                  </div>

                </div>

                <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-full">Completed</span>

              </div>

            </CardContent>

          </Card>

        </div>

      </div>



      {/* Bottom Navigation */}

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-earth-200 dark:border-gray-700">

        <div className="flex justify-around items-center py-2">

          {[

            { icon: Calendar, label: 'Fields', href: '/crops' },

            { icon: Calendar, label: 'Tasks', href: '/tasks', active: true },

            { icon: Calendar, label: 'Inventory', href: '/inventory' },

            { icon: Calendar, label: 'Reports', href: '/reports' },

          ].map((item, index) => (

            <a

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

            </a>

          ))}

        </div>

      </nav>



      {/* Bottom padding to account for fixed navigation */}

      <div className="h-20"></div>

    </div>

  );

}




