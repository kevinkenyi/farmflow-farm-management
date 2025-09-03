'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Wrench, 
  CheckCircle2,
  Home,
  Plus,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  Settings
} from "lucide-react";

export default function ModernDashboard() {
  const quickActions = [
    {
      icon: Plus,
      title: "Add Crop",
      description: "Plant new crops",
      href: "/crops/add",
      color: "bg-green-500 hover:bg-green-600",
      iconColor: "text-white"
    },
    {
      icon: Users,
      title: "Add Worker",
      description: "Hire new workers",
      href: "/workers/add",
      color: "bg-blue-500 hover:bg-blue-600",
      iconColor: "text-white"
    },
    {
      icon: MapPin,
      title: "Add Field",
      description: "Create new field",
      href: "/fields/add",
      color: "bg-orange-500 hover:bg-orange-600",
      iconColor: "text-white"
    },
    {
      icon: Calendar,
      title: "Add Task",
      description: "Create new task",
      href: "/tasks/add",
      color: "bg-purple-500 hover:bg-purple-600",
      iconColor: "text-white"
    }
  ];

  const mainModules = [
    {
      icon: MapPin,
      title: "Fields",
      description: "Manage your farm fields",
      href: "/fields",
      color: "bg-earth-100 dark:bg-earth-900",
      iconColor: "text-earth-600 dark:text-earth-400",
      borderColor: "border-earth-200 dark:border-earth-700"
    },
    {
      icon: Calendar,
      title: "Crops",
      description: "Track crop growth",
      href: "/crops",
      color: "bg-nature-100 dark:bg-nature-900",
      iconColor: "text-nature-600 dark:text-nature-400",
      borderColor: "border-nature-200 dark:border-nature-700"
    },
    {
      icon: Calendar,
      title: "Tasks",
      description: "Manage daily tasks",
      href: "/tasks",
      color: "bg-harvest-100 dark:bg-harvest-900",
      iconColor: "text-harvest-600 dark:text-harvest-400",
      borderColor: "border-harvest-200 dark:border-harvest-700"
    },
    {
      icon: Users,
      title: "Workers",
      description: "Manage your team",
      href: "/workers",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    {
      icon: Wrench,
      title: "Inventory",
      description: "Track supplies",
      href: "/inventory",
      color: "bg-gray-100 dark:bg-gray-800",
      iconColor: "text-gray-600 dark:text-gray-400",
      borderColor: "border-gray-200 dark:border-gray-700"
    },
    {
      icon: DollarSign,
      title: "Financial",
      description: "Track money",
      href: "/financial",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-700"
    },
    {
      icon: BarChart3,
      title: "Reports",
      description: "View analytics",
      href: "/reports",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-700"
    }
  ];

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">FarmFlow</h1>
            <p className="text-gray-600 dark:text-gray-400">Your Farm Management Dashboard</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-8">
        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href} className="block">
                <Card className={`${action.color} border-0 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}>
                  <CardContent className="p-6 text-center">
                    <action.icon className={`h-8 w-8 mx-auto mb-3 ${action.iconColor}`} />
                    <h3 className="text-lg font-semibold text-white mb-1">{action.title}</h3>
                    <p className="text-white/80 text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Modules */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Farm Modules</h2>
          <div className="grid grid-cols-2 gap-4">
            {mainModules.map((module, index) => (
              <Link key={index} href={module.href} className="block">
                <Card className={`${module.color} ${module.borderColor} border-2 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105`}>
                  <CardContent className="p-6 text-center">
                    <module.icon className={`h-10 w-10 mx-auto mb-4 ${module.iconColor}`} />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{module.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Today's Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tasks Today</div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">KSH 2,500</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Today's Revenue</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom padding */}
      <div className="h-8"></div>
    </div>
  );
}

