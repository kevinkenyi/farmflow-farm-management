'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sprout,
  Droplets,
  Wrench,
  Apple,
  DollarSign,
  FileImage,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  MapPin,
  Package,
  Truck
} from "lucide-react";

interface TimelineEvent {
  id: number;
  type: 'planting' | 'fertilizing' | 'watering' | 'pest_control' | 'harvesting' | 'sale' | 'payment';
  date: string;
  title: string;
  description: string;
  cost?: number;
  revenue?: number;
  worker?: string;
  client?: string;
  quantity?: number;
  unit?: string;
  pricePerUnit?: number;
  checkImage?: string;
  checkNumber?: string;
  bank?: string;
  notes?: string;
}

interface UnifiedTimelineProps {
  cropId: number;
  events: TimelineEvent[];
  onAddEvent?: (event: Omit<TimelineEvent, 'id'>) => void;
}

export default function UnifiedTimeline({ cropId, events, onAddEvent }: UnifiedTimelineProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'planting': return Sprout;
      case 'fertilizing': return Droplets;
      case 'watering': return Droplets;
      case 'pest_control': return Wrench;
      case 'harvesting': return Apple;
      case 'sale': return Package;
      case 'payment': return CheckCircle;
      default: return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'planting': return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'fertilizing': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'watering': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'pest_control': return 'text-red-500 bg-red-100 dark:bg-red-900';
      case 'harvesting': return 'text-orange-500 bg-orange-100 dark:bg-orange-900';
      case 'sale': return 'text-purple-500 bg-purple-100 dark:bg-purple-900';
      case 'payment': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900';
    }
  };

  const calculateTotalCost = () => {
    return events
      .filter(event => event.cost && event.type !== 'payment')
      .reduce((sum, event) => sum + (event.cost || 0), 0);
  };

  const calculateTotalRevenue = () => {
    return events
      .filter(event => event.revenue)
      .reduce((sum, event) => sum + (event.revenue || 0), 0);
  };

  const calculateProfit = () => {
    return calculateTotalRevenue() - calculateTotalCost();
  };

  const getTotalHarvest = () => {
    const harvestEvents = events.filter(event => event.type === 'harvesting');
    return harvestEvents.reduce((sum, event) => sum + (event.quantity || 0), 0);
  };

  const getTotalSales = () => {
    const saleEvents = events.filter(event => event.type === 'sale');
    return saleEvents.reduce((sum, event) => sum + (event.quantity || 0), 0);
  };

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-earth-600" />
            <span>Financial Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                KSH {calculateTotalCost().toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Investment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                KSH {calculateTotalRevenue().toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {getTotalHarvest()} kg
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Harvest</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                KSH {calculateProfit().toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {calculateProfit() >= 0 ? 'Profit' : 'Loss'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Complete Timeline</span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-1 bg-earth-500 hover:bg-earth-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              <span>+ Add Event</span>
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event, index) => {
              const EventIcon = getEventIcon(event.type);
              const isLast = index === events.length - 1;
              
              return (
                <div key={event.id} className="relative">
                  {/* Timeline Line */}
                  {!isLast && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200 dark:bg-gray-700"></div>
                  )}
                  
                  {/* Event Card */}
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getEventColor(event.type)}`}>
                      <EventIcon className="h-6 w-6" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                          
                          {/* Event Details */}
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{event.date}</span>
                            </div>
                            
                            {event.worker && (
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{event.worker}</span>
                              </div>
                            )}
                            
                            {event.client && (
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{event.client}</span>
                              </div>
                            )}
                            
                            {event.quantity && event.unit && (
                              <div className="flex items-center space-x-1">
                                <Package className="h-3 w-3" />
                                <span>{event.quantity} {event.unit}</span>
                              </div>
                            )}
                          </div>

                          {/* Financial Information */}
                          <div className="flex items-center space-x-4 mt-2">
                            {event.cost && (
                              <div className="flex items-center space-x-1 text-red-600">
                                <TrendingDown className="h-3 w-3" />
                                <span className="text-sm font-medium">Cost: KSH {event.cost.toLocaleString()}</span>
                              </div>
                            )}
                            
                            {event.revenue && (
                              <div className="flex items-center space-x-1 text-green-600">
                                <TrendingUp className="h-3 w-3" />
                                <span className="text-sm font-medium">Revenue: KSH {event.revenue.toLocaleString()}</span>
                              </div>
                            )}
                            
                            {event.pricePerUnit && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                @ KSH {event.pricePerUnit}/kg
                              </div>
                            )}
                          </div>

                          {/* Check Information */}
                          {event.checkNumber && (
                            <div className="mt-2 p-2 bg-green-50 dark:bg-green-900 rounded-lg">
                              <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">Check #{event.checkNumber}</span>
                                {event.bank && <span className="text-sm">• {event.bank}</span>}
                              </div>
                              {event.checkImage && (
                                <div className="mt-1">
                                  <img
                                    src={event.checkImage}
                                    alt="Check image"
                                    className="w-20 h-12 object-cover rounded border"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Notes */}
                          {event.notes && (
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                              {event.notes}
                            </div>
                          )}
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
    </div>
  );
}


