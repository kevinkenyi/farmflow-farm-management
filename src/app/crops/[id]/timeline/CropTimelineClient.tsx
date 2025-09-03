'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  User,
  Activity,
  Sprout,
  Droplets,
  Wrench,
  Apple,
  Leaf,
  Camera,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";

interface CropTimelineClientProps {
  cropId: number;
}

export default function CropTimelineClient({ cropId }: CropTimelineClientProps) {
  // Mock crop data - in real app, this would come from API
  const [crop] = useState({
    id: cropId,
    name: "Tomatoes",
    variety: "Cherry",
    field: "Field A",
    plantedDate: "2024-01-15",
    harvestDate: "2024-03-15",
    totalCost: 2500,
    expectedRevenue: 5000,
    activities: [
      {
        id: 1,
        type: "planting",
        date: "2024-01-15",
        description: "Planted 100 tomato seedlings",
        cost: 500,
        worker: "John Doe",
        notes: "Used organic soil mix, planted in rows 2 feet apart"
      },
      {
        id: 2,
        type: "fertilizing",
        date: "2024-01-20",
        description: "Applied organic fertilizer",
        cost: 300,
        worker: "Jane Smith",
        notes: "Applied 2kg of compost per plant"
      },
      {
        id: 3,
        type: "watering",
        date: "2024-01-25",
        description: "Irrigation system setup",
        cost: 200,
        worker: "John Doe",
        notes: "Installed drip irrigation system"
      },
      {
        id: 4,
        type: "pest_control",
        date: "2024-02-10",
        description: "Applied organic pest control",
        cost: 400,
        worker: "Jane Smith",
        notes: "Sprayed neem oil solution to prevent aphids"
      },
      {
        id: 5,
        type: "harvesting",
        date: "2024-02-28",
        description: "First harvest - 10kg tomatoes",
        cost: 100,
        worker: "John Doe",
        notes: "Harvested ripe tomatoes, quality looks good"
      },
      {
        id: 6,
        type: "fertilizing",
        date: "2024-03-05",
        description: "Second fertilizer application",
        cost: 250,
        worker: "Jane Smith",
        notes: "Applied liquid fertilizer for continued growth"
      }
    ],
    photos: [
      { id: 1, url: "/api/placeholder/300/200", date: "2024-01-15", description: "Planting day" },
      { id: 2, url: "/api/placeholder/300/200", date: "2024-02-10", description: "First flowers" },
      { id: 3, url: "/api/placeholder/300/200", date: "2024-02-28", description: "First harvest" },
      { id: 4, url: "/api/placeholder/300/200", date: "2024-03-05", description: "Continued growth" }
    ]
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'planting': return Sprout;
      case 'fertilizing': return Droplets;
      case 'watering': return Droplets;
      case 'pest_control': return Wrench;
      case 'harvesting': return Apple;
      case 'mulching': return Leaf;
      case 'thinning': return Wrench;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'planting': return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'fertilizing': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'watering': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'pest_control': return 'text-red-500 bg-red-100 dark:bg-red-900';
      case 'harvesting': return 'text-orange-500 bg-orange-100 dark:bg-orange-900';
      case 'mulching': return 'text-brown-500 bg-brown-100 dark:bg-brown-900';
      case 'thinning': return 'text-gray-500 bg-gray-100 dark:bg-gray-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900';
    }
  };

  const handleAddActivity = () => {
    window.location.href = `/crops/${cropId}/add-activity`;
  };

  const handleAddPhoto = () => {
    alert('Add Photo functionality will be implemented');
  };

  const handleEditActivity = (activityId: number) => {
    alert(`Edit Activity ${activityId} functionality will be implemented`);
  };

  const handleDeleteActivity = (activityId: number) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      alert(`Delete Activity ${activityId} functionality will be implemented`);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <PageHeader 
        title={`${crop.name} Timeline`} 
        subtitle={`${crop.variety} in ${crop.field}`}
      />

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Crop Summary */}
        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Crop Summary</span>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddActivity}
                  className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Activity</span>
                </button>
                <button
                  onClick={handleAddPhoto}
                  className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Add Photo</span>
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Planted Date</div>
                <div className="font-medium text-gray-900 dark:text-white">{crop.plantedDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Expected Harvest</div>
                <div className="font-medium text-gray-900 dark:text-white">{crop.harvestDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Investment</div>
                <div className="font-medium text-red-600">KSH {crop.totalCost.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Expected Revenue</div>
                <div className="font-medium text-green-600">KSH {crop.expectedRevenue.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-earth-600" />
              <span>Activity Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crop.activities.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);
                const isLast = index === crop.activities.length - 1;
                
                return (
                  <div key={activity.id} className="relative">
                    {/* Timeline Line */}
                    {!isLast && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200 dark:bg-gray-700"></div>
                    )}
                    
                    {/* Activity Card */}
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        <ActivityIcon className="h-6 w-6" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{activity.description}</h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{activity.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{activity.worker}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>KSH {activity.cost}</span>
                              </div>
                            </div>
                            {activity.notes && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                                {activity.notes}
                              </p>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex space-x-1 ml-4">
                            <button
                              onClick={() => handleEditActivity(activity.id)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteActivity(activity.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        {crop.photos.length > 0 && (
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-earth-600" />
                <span>Photo Gallery ({crop.photos.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {crop.photos.map((photo) => (
                  <div key={photo.id} className="space-y-2">
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{photo.description}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{photo.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Back Button */}
        <div className="flex justify-center">
          <Link
            href="/crops"
            className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Crops</span>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}


