'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowLeft,
  Save,
  Sprout,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";

export default function EditCropPage() {
  const router = useRouter();
  const params = useParams();
  const cropId = params.id as string;

  const [crop, setCrop] = useState({
    name: 'Tomatoes',
    variety: 'Cherry',
    field: 'Field A',
    plantedDate: '2024-01-15',
    harvestDate: '2024-03-15',
    status: 'growing',
    expectedYield: '50',
    expectedPrice: '100',
    notes: 'Looking healthy, first fruits appearing'
  });

  const handleInputChange = (field: string, value: string) => {
    setCrop(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Updating crop:', crop);
      alert('Crop updated successfully!');
      router.push('/crops');
    } catch (error) {
      console.error('Error updating crop:', error);
      alert('Error updating crop. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <PageHeader 
        title="Edit Crop" 
        subtitle={`Edit Crop ID: ${cropId}`}
      />

      {/* Main Content */}
      <main className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Sprout className="h-5 w-5 mr-2 text-earth-600" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Crop Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={crop.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="Tomatoes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Variety *
                  </label>
                  <input
                    type="text"
                    required
                    value={crop.variety}
                    onChange={(e) => handleInputChange('variety', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="Cherry"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Field *
                </label>
                <select
                  required
                  value={crop.field}
                  onChange={(e) => handleInputChange('field', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                >
                  <option value="Field A">Field A</option>
                  <option value="Field B">Field B</option>
                  <option value="Field C">Field C</option>
                  <option value="Field D">Field D</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-earth-600" />
              Important Dates
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Planted Date *
                </label>
                <input
                  type="date"
                  required
                  value={crop.plantedDate}
                  onChange={(e) => handleInputChange('plantedDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Harvest Date *
                </label>
                <input
                  type="date"
                  required
                  value={crop.harvestDate}
                  onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                />
              </div>
            </div>
          </div>

          {/* Status and Expectations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-earth-600" />
              Status & Expectations
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={crop.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                >
                  <option value="planted">Planted</option>
                  <option value="growing">Growing</option>
                  <option value="flowering">Flowering</option>
                  <option value="fruiting">Fruiting</option>
                  <option value="ready">Ready to Harvest</option>
                  <option value="harvested">Harvested</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Yield (kg)
                  </label>
                  <input
                    type="number"
                    value={crop.expectedYield}
                    onChange={(e) => handleInputChange('expectedYield', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Price per kg (KSH)
                  </label>
                  <input
                    type="number"
                    value={crop.expectedPrice}
                    onChange={(e) => handleInputChange('expectedPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Additional Notes
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes
              </label>
              <textarea
                value={crop.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                placeholder="Any additional notes about this crop..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link
              href="/crops"
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Cancel</span>
            </Link>
            
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 bg-earth-500 hover:bg-earth-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Update Crop</span>
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


