'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import PageHeader from "@/components/PageHeader";
import { 
  Search, 
  Plus, 
  Filter, 
  MapPin, 
  Calendar, 
  Droplets, 
  Sun,
  ChevronRight,
  Sprout,
  Flower,
  Apple,
  Leaf,
  Wrench,
  CheckCircle2,
  DollarSign,
  Camera,
  Clock,
  TrendingUp,
  Activity,
  Edit,
  Trash2
} from "lucide-react";

export default function CropsPage() {
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Tomatoes",
      variety: "Cherry",
      progress: 75,
      stage: "fruiting",
      stageIcon: Flower,
      field: "Field A",
      plantedDate: "2024-01-15",
      harvestDate: "2024-03-15",
      status: "growing",
      notes: "Looking healthy, first fruits appearing",
      totalCost: 2500,
      expectedYield: 50,
      expectedRevenue: 5000,
      activities: [
        {
          id: 1,
          type: "planting",
          date: "2024-01-15",
          description: "Planted 100 tomato seedlings",
          cost: 500,
          worker: "John Doe"
        },
        {
          id: 2,
          type: "fertilizing",
          date: "2024-01-20",
          description: "Applied organic fertilizer",
          cost: 300,
          worker: "Jane Smith"
        },
        {
          id: 3,
          type: "watering",
          date: "2024-01-25",
          description: "Irrigation system setup",
          cost: 200,
          worker: "John Doe"
        },
        {
          id: 4,
          type: "pest_control",
          date: "2024-02-10",
          description: "Applied organic pest control",
          cost: 400,
          worker: "Jane Smith"
        },
        {
          id: 5,
          type: "harvesting",
          date: "2024-02-28",
          description: "First harvest - 10kg tomatoes",
          cost: 100,
          worker: "John Doe"
        }
      ],
      photos: [
        { id: 1, url: "/api/placeholder/300/200", date: "2024-01-15", description: "Planting day" },
        { id: 2, url: "/api/placeholder/300/200", date: "2024-02-10", description: "First flowers" },
        { id: 3, url: "/api/placeholder/300/200", date: "2024-02-28", description: "First harvest" }
      ]
    },
    {
      id: 2,
      name: "Lettuce",
      variety: "Romaine",
      progress: 45,
      stage: "vegetative",
      stageIcon: Sprout,
      field: "Field B",
      plantedDate: "2024-02-01",
      harvestDate: "2024-03-01",
      status: "growing",
      notes: "Good growth, needs more water",
      totalCost: 1200,
      expectedYield: 30,
      expectedRevenue: 1800,
      activities: [
        {
          id: 1,
          type: "planting",
          date: "2024-02-01",
          description: "Planted lettuce seeds",
          cost: 200,
          worker: "Peter Jones"
        },
        {
          id: 2,
          type: "watering",
          date: "2024-02-05",
          description: "Daily watering setup",
          cost: 100,
          worker: "Peter Jones"
        },
        {
          id: 3,
          type: "fertilizing",
          date: "2024-02-15",
          description: "Applied liquid fertilizer",
          cost: 150,
          worker: "Jane Smith"
        }
      ],
      photos: [
        { id: 1, url: "/api/placeholder/300/200", date: "2024-02-01", description: "Seeds planted" },
        { id: 2, url: "/api/placeholder/300/200", date: "2024-02-15", description: "Good growth" }
      ]
    },
    {
      id: 3,
      name: "Strawberries",
      variety: "Alpine",
      progress: 90,
      stage: "fruiting",
      stageIcon: Flower,
      field: "Field C",
      plantedDate: "2024-01-01",
      harvestDate: "2024-02-28",
      status: "ready",
      notes: "Ready for harvest, berries are ripe",
      totalCost: 1800,
      expectedYield: 25,
      expectedRevenue: 3750,
      activities: [
        {
          id: 1,
          type: "planting",
          date: "2024-01-01",
          description: "Planted strawberry runners",
          cost: 400,
          worker: "John Doe"
        },
        {
          id: 2,
          type: "mulching",
          date: "2024-01-10",
          description: "Applied straw mulch",
          cost: 200,
          worker: "Jane Smith"
        },
        {
          id: 3,
          type: "harvesting",
          date: "2024-02-25",
          description: "First harvest - 5kg strawberries",
          cost: 150,
          worker: "John Doe"
        }
      ],
      photos: [
        { id: 1, url: "/api/placeholder/300/200", date: "2024-01-01", description: "Runners planted" },
        { id: 2, url: "/api/placeholder/300/200", date: "2024-02-20", description: "Ripe berries" }
      ]
    },
    {
      id: 4,
      name: "Carrots",
      variety: "Nantes",
      progress: 30,
      stage: "vegetative",
      stageIcon: Sprout,
      field: "Field D",
      plantedDate: "2024-02-10",
      harvestDate: "2024-04-10",
      status: "growing",
      notes: "Seedlings established, thinning needed",
      totalCost: 800,
      expectedYield: 40,
      expectedRevenue: 2000,
      activities: [
        {
          id: 1,
          type: "planting",
          date: "2024-02-10",
          description: "Planted carrot seeds",
          cost: 150,
          worker: "Peter Jones"
        },
        {
          id: 2,
          type: "thinning",
          date: "2024-02-25",
          description: "Thinned seedlings",
          cost: 100,
          worker: "Peter Jones"
        }
      ],
      photos: [
        { id: 1, url: "/api/placeholder/300/200", date: "2024-02-10", description: "Seeds planted" }
      ]
    }
  ]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'seedling': return 'text-blue-500';
      case 'vegetative': return 'text-green-500';
      case 'flowering': return 'text-purple-500';
      case 'fruiting': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-success-500';
      case 'growing': return 'bg-warning-500';
      case 'harvested': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

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
      case 'planting': return 'text-green-500';
      case 'fertilizing': return 'text-blue-500';
      case 'watering': return 'text-blue-500';
      case 'pest_control': return 'text-red-500';
      case 'harvesting': return 'text-orange-500';
      case 'mulching': return 'text-brown-500';
      case 'thinning': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const calculateProfit = (crop: any) => {
    return crop.expectedRevenue - crop.totalCost;
  };

  const handleAddActivity = (cropId: number) => {
    window.location.href = `/crops/${cropId}/add-activity`;
  };

  const handleAddPhoto = (cropId: number) => {
    // TODO: Open photo upload modal
    alert('Add Photo functionality will be implemented');
  };

  const handleViewTimeline = (cropId: number) => {
    window.location.href = `/crops/${cropId}/timeline`;
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header with Home Button */}
      <PageHeader 
        title="Crops" 
        subtitle="Track your crop growth"
      />

      {/* Search and Add Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <Link href="/crops/add" className="flex items-center space-x-2 bg-harvest-500 text-white px-4 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Crop</span>
            </Link>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search crops..."
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{crops.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Crops</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success-500">
                {crops.filter(crop => crop.status === 'ready').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ready to Harvest</div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                KSH {crops.reduce((sum, crop) => sum + crop.totalCost, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Investment</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                KSH {crops.reduce((sum, crop) => sum + crop.expectedRevenue, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expected Revenue</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                KSH {crops.reduce((sum, crop) => sum + calculateProfit(crop), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expected Profit</div>
            </CardContent>
          </Card>
        </div>

        {/* Crop Cards */}
        <div className="space-y-4">
          {crops.map((crop) => (
            <Card key={crop.id} className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Crop Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900 rounded-lg flex items-center justify-center">
                        <crop.stageIcon className={`h-6 w-6 ${getStageColor(crop.stage)}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{crop.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{crop.variety}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(crop.status)}`}>
                      {crop.status}
                    </span>
                  </div>

                  {/* Crop Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{crop.field}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Harvest: {crop.harvestDate}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{crop.progress}%</span>
                    </div>
                    <div className="w-full bg-earth-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-nature-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${crop.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-red-600">
                        KSH {crop.totalCost.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Total Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-green-600">
                        KSH {crop.expectedRevenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Expected Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${
                        calculateProfit(crop) > 0 ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        KSH {calculateProfit(crop).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Expected Profit</div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Recent Activities</h4>
                      <button
                        onClick={() => handleViewTimeline(crop.id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-2">
                      {crop.activities.slice(-3).map((activity) => {
                        const ActivityIcon = getActivityIcon(activity.type);
                        return (
                          <div key={activity.id} className="flex items-center space-x-3 text-sm">
                            <ActivityIcon className={`h-4 w-4 ${getActivityColor(activity.type)}`} />
                            <div className="flex-1">
                              <span className="text-gray-900 dark:text-white">{activity.description}</span>
                              <div className="text-xs text-gray-500">
                                {activity.date} • {activity.worker} • KSH {activity.cost}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Photos */}
                  {crop.photos.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Photos ({crop.photos.length})</h4>
                      <div className="flex space-x-2 overflow-x-auto">
                        {crop.photos.slice(0, 3).map((photo) => (
                          <div key={photo.id} className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <Camera className="h-6 w-6 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1 truncate">{photo.description}</p>
                          </div>
                        ))}
                        {crop.photos.length > 3 && (
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">+{crop.photos.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <strong>Notes:</strong> {crop.notes}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => handleAddActivity(crop.id)}
                      className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      <Activity className="h-3 w-3" />
                      <span>Add Activity</span>
                    </button>

                    <button
                      onClick={() => handleAddPhoto(crop.id)}
                      className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      <Camera className="h-3 w-3" />
                      <span>Add Photo</span>
                    </button>

                    <button
                      onClick={() => handleViewTimeline(crop.id)}
                      className="flex items-center space-x-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      <Clock className="h-3 w-3" />
                      <span>Timeline</span>
                    </button>

                    <Link
                      href={`/crops/${crop.id}/edit`}
                      className="flex items-center space-x-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </Link>
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
