'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  Search, 
  Plus, 
  Filter, 
  Users, 
  Phone, 
  MapPin, 
  Star,
  ChevronRight,
  Edit,
  Trash2,
  MessageSquare,
  Calendar,
  CheckCircle2
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import PageHeader from "@/components/PageHeader";
import { smsService, smsTemplates } from "@/services/smsService";

export default function WorkersPage() {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "John Mwangi",
      phone: "+254 712 345 678",
      skills: ["Planting", "Harvesting", "Irrigation"],
      status: "active",
      hourlyRate: 500,
      tasksCompleted: 15,
      rating: 4.5,
      location: "Field A"
    },
    {
      id: 2,
      name: "Mary Wanjiku",
      phone: "+254 723 456 789",
      skills: ["Fertilizing", "Pest Control", "Maintenance"],
      status: "active",
      hourlyRate: 450,
      tasksCompleted: 12,
      rating: 4.8,
      location: "Field B"
    },
    {
      id: 3,
      name: "Peter Kimani",
      phone: "+254 734 567 890",
      skills: ["Harvesting", "Transport", "Equipment"],
      status: "busy",
      hourlyRate: 600,
      tasksCompleted: 8,
      rating: 4.2,
      location: "Field C"
    },
    {
      id: 4,
      name: "Grace Akinyi",
      phone: "+254 745 678 901",
      skills: ["Planting", "Fertilizing", "Quality Control"],
      status: "available",
      hourlyRate: 480,
      tasksCompleted: 20,
      rating: 4.9,
      location: "Field D"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-500';
      case 'busy': return 'bg-warning-500';
      case 'available': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDeleteWorker = (id: number) => {
    if (confirm('Are you sure you want to remove this worker?')) {
      setWorkers(workers.filter(worker => worker.id !== id));
    }
  };

  const handleSendMessage = async (worker: any) => {
    try {
      if (!smsService.isInitialized()) {
        alert('SMS service not configured. Please go to Settings > SMS to configure your SMS provider.');
        return;
      }

      const message = smsTemplates.taskReminder(
        worker.name, 
        'Check your assigned tasks', 
        new Date().toLocaleDateString()
      );

      const result = await smsService.sendSMS(worker.phone, message);
      
      if (result.success) {
        alert(`SMS sent successfully to ${worker.name}!`);
      } else {
        alert(`Failed to send SMS: ${result.error}`);
      }
    } catch (error) {
      alert('Error sending SMS. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header with Home Button */}
      <PageHeader 
        title="Workers" 
        subtitle="Manage your farm team"
      />

      {/* Search and Add Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <Link href="/workers/add" className="flex items-center space-x-2 bg-harvest-500 text-white px-4 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Worker</span>
            </Link>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search workers..."
                className="w-full pl-10 pr-4 py-2 border border-earth-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-earth-500"
              />
            </div>
            <button className="p-2 border border-earth-200 dark:border-gray-700 rounded-lg hover:bg-earth-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Workers</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success-500">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Today</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">55</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Worker Cards */}
        <div className="space-y-4">
          {workers.map((worker) => (
            <Card key={worker.id} className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-nature-600 dark:text-nature-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{worker.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{worker.phone}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(worker.status)}`}>
                        {worker.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{worker.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{worker.rating}/5</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{worker.tasksCompleted} tasks</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">KSH {worker.hourlyRate}/hr</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {worker.skills.map((skill, index) => (
                          <span key={index} className="bg-nature-100 dark:bg-nature-900 text-nature-700 dark:text-nature-300 text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleSendMessage(worker)}
                      className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Send SMS"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <Link
                      href={`/workers/edit/${worker.id}`}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteWorker(worker.id)}
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
      <BottomNavigation />

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
