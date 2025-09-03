'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Calendar, User, DollarSign, FileText } from 'lucide-react';
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";

interface AddActivityClientProps {
  cropId: number;
}

export default function AddActivityClient({ cropId }: AddActivityClientProps) {
  const [newActivity, setNewActivity] = useState({
    type: 'planting',
    date: new Date().toISOString().split('T')[0],
    description: '',
    cost: '',
    worker: '',
    notes: ''
  });

  const activityTypes = [
    { value: 'planting', label: 'Planting' },
    { value: 'fertilizing', label: 'Fertilizing' },
    { value: 'watering', label: 'Watering' },
    { value: 'pest_control', label: 'Pest Control' },
    { value: 'harvesting', label: 'Harvesting' },
    { value: 'mulching', label: 'Mulching' },
    { value: 'thinning', label: 'Thinning' },
    { value: 'pruning', label: 'Pruning' },
    { value: 'weeding', label: 'Weeding' },
    { value: 'other', label: 'Other' }
  ];

  const workers = [
    'John Doe',
    'Jane Smith',
    'Peter Jones',
    'Mary Wanjiku',
    'David Kimani'
  ];

  const handleInputChange = (field: string, value: string) => {
    setNewActivity(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Adding new activity:', newActivity);
      alert('Activity added successfully!');
      setNewActivity({
        type: 'planting',
        date: new Date().toISOString().split('T')[0],
        description: '',
        cost: '',
        worker: '',
        notes: ''
      });
      window.location.href = `/crops/${cropId}/timeline`;
    } catch (error) {
      console.error('Error adding activity:', error);
      alert('Error adding activity. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <PageHeader 
        title="Add Activity" 
        subtitle="Record a new activity for this crop"
      />

      {/* Main Content */}
      <main className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activity Type */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-earth-600" />
              Activity Type
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Activity Type *
              </label>
              <select
                required
                value={newActivity.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
              >
                {activityTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-earth-600" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={newActivity.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  required
                  value={newActivity.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="e.g., Applied organic fertilizer to all plants"
                />
              </div>
            </div>
          </div>

          {/* Cost and Worker */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-earth-600" />
              Cost and Worker
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cost (KSH)
                </label>
                <input
                  type="number"
                  value={newActivity.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Worker
                </label>
                <select
                  value={newActivity.worker}
                  onChange={(e) => handleInputChange('worker', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                >
                  <option value="">Select worker</option>
                  {workers.map((worker) => (
                    <option key={worker} value={worker}>
                      {worker}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-earth-600" />
              Additional Notes
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes
              </label>
              <textarea
                value={newActivity.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                placeholder="Any additional details about this activity..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link
              href={`/crops/${cropId}/timeline`}
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Cancel</span>
            </Link>
            
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 bg-earth-500 hover:bg-earth-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Activity</span>
            </button>
          </div>
        </form>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}


