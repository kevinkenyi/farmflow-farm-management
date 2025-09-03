'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowLeft,
  Save,
  MapPin,
  Sun,
  Droplets,
  Wrench
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";

export default function EditFieldPage() {
  const router = useRouter();
  const params = useParams();
  const fieldId = params.id as string;

  const [field, setField] = useState({
    name: 'Field A',
    area: '2.5',
    location: 'North Section',
    soilType: 'loamy',
    irrigationType: 'drip',
    status: 'active',
    notes: 'Good soil quality, well-drained'
  });

  const handleInputChange = (field: string, value: string) => {
    setField(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Updating field:', field);
      alert('Field updated successfully!');
      router.push('/fields');
    } catch (error) {
      console.error('Error updating field:', error);
      alert('Error updating field. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <PageHeader 
        title="Edit Field" 
        subtitle={`Edit Field ID: ${fieldId}`}
      />

      {/* Main Content */}
      <main className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-earth-600" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Field Name *
                </label>
                <input
                  type="text"
                  required
                  value={field.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="e.g., Field A"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Area (acres) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={field.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={field.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="North Section"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Soil and Irrigation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Sun className="h-5 w-5 mr-2 text-earth-600" />
              Soil & Irrigation
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Soil Type
                </label>
                <select
                  value={field.soilType}
                  onChange={(e) => handleInputChange('soilType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                >
                  <option value="loamy">Loamy</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="silty">Silty</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Irrigation Type
                </label>
                <select
                  value={field.irrigationType}
                  onChange={(e) => handleInputChange('irrigationType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                >
                  <option value="drip">Drip</option>
                  <option value="sprinkler">Sprinkler</option>
                  <option value="flood">Flood</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
            </div>
          </div>

          {/* Status and Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Wrench className="h-5 w-5 mr-2 text-earth-600" />
              Status & Notes
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={field.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                >
                  <option value="active">Active</option>
                  <option value="fallow">Fallow</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={field.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="Any additional notes about this field..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link
              href="/fields"
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
              <span>Update Field</span>
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


