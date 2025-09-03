'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  MapPin,
  Wrench,
  Users,
  UserPlus,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import PageHeader from "@/components/PageHeader";
import { smsService, smsTemplates } from "@/services/smsService";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Check fruit for insects",
      description: "Inspect all fruit trees for pest damage",
      time: "8:00 AM - 10:00 AM",
      priority: "urgent",
      status: "pending",
      assignedWorker: null,
      field: "Field A"
    },
    {
      id: 2,
      title: "Irrigate vegetable field",
      description: "Water the tomato and lettuce plants",
      time: "11:00 AM - 12:00 PM",
      priority: "medium",
      status: "pending",
      assignedWorker: null,
      field: "Field B"
    },
    {
      id: 3,
      title: "Irrigate berries",
      description: "Water the strawberry plants",
      time: "12:00 PM - 1:00 PM",
      priority: "normal",
      status: "completed",
      assignedWorker: { id: 1, name: "John Doe", phone: "+254712345678" },
      field: "Field C"
    }
  ]);

  const [workers] = useState([
    { id: 1, name: "John Doe", phone: "+254712345678" },
    { id: 2, name: "Jane Smith", phone: "+254723456789" },
    { id: 3, name: "Peter Jones", phone: "+254734567890" }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-error-500';
      case 'medium': return 'bg-warning-500';
      case 'normal': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAssignWorker = (taskId: number, workerId: number) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, assignedWorker: worker, status: 'in_progress' }
        : task
    ));

    // Send SMS notification to worker
    sendTaskAssignmentSMS(worker, tasks.find(t => t.id === taskId)!);
  };

  const sendTaskAssignmentSMS = async (worker: any, task: any) => {
    try {
      if (!smsService.isInitialized()) {
        alert('SMS service not configured. Worker assignment saved but no SMS sent.');
        return;
      }

      const message = smsTemplates.taskAssignment(
        task.title,
        worker.name,
        task.field
      );

      const result = await smsService.sendSMS(worker.phone, message);
      
      if (result.success) {
        alert(`Task assigned to ${worker.name} and SMS notification sent!`);
      } else {
        alert(`Task assigned to ${worker.name} but SMS failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Task assigned to ${worker.name} but SMS failed. Please try again.`);
    }
  };

  const handleMarkComplete = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: 'completed' }
        : task
    ));
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header with Home Button */}
      <PageHeader 
        title="Tasks" 
        subtitle="Manage your daily farm tasks"
      />

      {/* Add Task Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-end">
            <Link href="/tasks/add" className="flex items-center space-x-2 bg-harvest-500 text-white px-4 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Task</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Tasks</h2>
          
          {tasks.map((task) => (
            <Card key={task.id} className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Task Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">{task.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{task.time}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`${getPriorityColor(task.priority)} text-white text-xs px-2 py-1 rounded-full`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      <span className={`${getStatusColor(task.status)} text-white text-xs px-2 py-1 rounded-full`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Task Details */}
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>{task.description}</p>
                    <p className="mt-1">📍 {task.field}</p>
                  </div>

                  {/* Assigned Worker */}
                  {task.assignedWorker && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-400">Assigned to:</span>
                      <span className="font-medium text-blue-600">{task.assignedWorker.name}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    {!task.assignedWorker && task.status !== 'completed' && (
                      <div className="flex space-x-1">
                        {workers.map((worker) => (
                          <button
                            key={worker.id}
                            onClick={() => handleAssignWorker(task.id, worker.id)}
                            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            <UserPlus className="h-3 w-3" />
                            <span>{worker.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {task.assignedWorker && task.status !== 'completed' && (
                      <button
                        onClick={() => handleMarkComplete(task.id)}
                        className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Mark Complete</span>
                      </button>
                    )}

                    {task.assignedWorker && (
                      <button
                        onClick={() => {
                          const message = smsTemplates.taskReminder(
                            task.assignedWorker.name,
                            task.title,
                            new Date().toLocaleDateString()
                          );
                          smsService.sendSMS(task.assignedWorker.phone || '', message);
                        }}
                        className="flex items-center space-x-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>Send Reminder</span>
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}