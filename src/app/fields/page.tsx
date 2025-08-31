'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  Search, 
  Plus, 
  Filter, 
  MapPin, 
  Calendar, 
  Droplets, 
  Sun,
  ChevronRight,
  Edit,
  Trash2,
  Wrench,
  CheckCircle2,
  DollarSign
} from "lucide-react";

export default function FieldsPage() {
  const [fields, setFields] = useState([
    {
      id: 1,
      name: "Field A",
      area: 2.5,
      location: "North Section",
      soilType: "Loamy",
      irrigationType: "Drip",
      status: "active",
      crops: ["Tomatoes", "Lettuce"]
    },
    {
      id: 2,
      name: "Field B",
      area: 1.8,
      location: "East Section",
      soilType: "Clay",
      irrigationType: "Sprinkler",
      status: "active",
      crops: ["Strawberries"]
    },
    {
      id: 3,
      name: "Field C",
      area: 3.2,
      location: "South Section",
      soilType: "Sandy",
      irrigationType: "Drip",
      status: "maintenance",
      crops: []
    },
    {
      id: 4,
      name: "Field D",
      area: 1.5,
      location: "West Section",
      soilType: "Loamy",
      irrigationType: "Sprinkler",
      status: "fallow",
      crops: ["Carrots"]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-500';
      case 'maintenance': return 'bg-warning-500';
      case 'fallow': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDeleteField = (id: number) => {
    if (confirm('Are you sure you want to delete this field?')) {
      setFields(fields.filter(field => field.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header with Search and Add */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fields</h1>
            <Link href="/fields/add" className="flex items-center space-x-2 bg-harvest-500 text-white px-4 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Field</span>
            </Link>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search fields..."
                className="w-full pl-10 pr-4 py-2 border border-earth-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-earth-500"
              />
            </div>
            <button className="p-2 border border-earth-200 dark:border-gray-700 rounded-lg hover:bg-earth-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Fields</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success-500">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Fields</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">9.0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Acres</div>
            </CardContent>
          </Card>
        </div>

        {/* Field Cards */}
        <div className="space-y-4">
          {fields.map((field) => (
            <Card key={field.id} className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-nature-600 dark:text-nature-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{field.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{field.location}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(field.status)}`}>
                        {field.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{field.area} acres</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{field.irrigationType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Wrench className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{field.soilType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{field.crops.length} crops</span>
                      </div>
                    </div>
                    
                    {field.crops.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Crops:</p>
                        <div className="flex flex-wrap gap-1">
                          {field.crops.map((crop, index) => (
                            <span key={index} className="bg-nature-100 dark:bg-nature-900 text-nature-700 dark:text-nature-300 text-xs px-2 py-1 rounded-full">
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      href={`/fields/edit/${field.id}`}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteField(field.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-earth-200 dark:border-gray-700">
        <div className="flex justify-around items-center py-2">
          {[
            { icon: MapPin, label: 'Fields', href: '/fields', active: true },
            { icon: Calendar, label: 'Crops', href: '/crops' },
            { icon: Calendar, label: 'Tasks', href: '/tasks' },
            { icon: Wrench, label: 'Inventory', href: '/inventory' },
            { icon: DollarSign, label: 'Financial', href: '/financial' },
            { icon: CheckCircle2, label: 'Reports', href: '/reports' },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                item.active
                  ? 'text-earth-500 bg-earth-100 dark:bg-earth-900'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
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
