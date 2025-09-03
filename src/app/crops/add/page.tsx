'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save,
  Loader2
} from "lucide-react";
import { apiService } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AddCropPage() {
  const [newCrop, setNewCrop] = useState({
    name: '',
    variety: '',
    field: '',
    plantedDate: '',
    expectedHarvestDate: '',
    notes: '',
    status: 'planted'
  });
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fieldsLoading, setFieldsLoading] = useState(true);

  // Load fields for the dropdown
  useEffect(() => {
    const loadFields = async () => {
      try {
        const response = await apiService.getFields();
        setFields(response.data.data || []);
      } catch (error) {
        console.error('Error loading fields:', error);
        toast.error('Failed to load fields');
      } finally {
        setFieldsLoading(false);
      }
    };
    
    loadFields();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Find the selected field ID
      const selectedField = fields.find(f => f.name === newCrop.field);
      if (!selectedField) {
        toast.error('Please select a valid field');
        return;
      }

      const cropData = {
        ...newCrop,
        field: selectedField._id, // Use the field's ObjectId
      };

      const response = await apiService.createCrop(cropData);
      
      if (response.data.success) {
        toast.success('Crop added successfully!');
      
      // Reset form
      setNewCrop({
        name: '',
        variety: '',
        field: '',
        plantedDate: '',
        expectedHarvestDate: '',
        notes: '',
        status: 'planted'
      });
      
      // Redirect back to crops page
      window.location.href = '/crops';
      } else {
        toast.error('Failed to add crop');
      }
      
    } catch (error: any) {
      console.error('Error adding crop:', error);
      const errorMessage = error.response?.data?.error || 'Error adding crop. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link 
                href="/crops"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Crop</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Track a new crop from planting to harvest</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="px-4 py-6">
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Crop Information</CardTitle>
            </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Crop Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCrop.name}
                    onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="e.g., Tomatoes"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Variety
                  </label>
                  <input
                    type="text"
                    value={newCrop.variety}
                    onChange={(e) => setNewCrop({...newCrop, variety: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="e.g., Cherry"
                  />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Field *
                </label>
                  <select
                    required
                    value={newCrop.field}
                    onChange={(e) => setNewCrop({...newCrop, field: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    disabled={fieldsLoading}
                  >
                    <option value="">
                      {fieldsLoading ? 'Loading fields...' : 'Select a field'}
                    </option>
                    {fields.map((field) => (
                      <option key={field._id} value={field.name}>
                        {field.name} ({field.area} acres)
                      </option>
                    ))}
                  </select>
              </div>
                
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                </label>
                  <select
                    value={newCrop.status}
                    onChange={(e) => setNewCrop({...newCrop, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  >
                    <option value="planted">Planted</option>
                    <option value="growing">Growing</option>
                    <option value="ready">Ready to Harvest</option>
                    <option value="harvested">Harvested</option>
                </select>
              </div>
              
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Planted Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newCrop.plantedDate}
                    onChange={(e) => setNewCrop({...newCrop, plantedDate: e.target.value})}
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
                    value={newCrop.expectedHarvestDate}
                    onChange={(e) => setNewCrop({...newCrop, expectedHarvestDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  />
                </div>
              </div>
              
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                  </label>
                <textarea
                  value={newCrop.notes}
                  onChange={(e) => setNewCrop({...newCrop, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="Additional notes about the crop, special care instructions, etc..."
                  />
                </div>
              
              <div className="flex space-x-3 pt-6">
                <Link
                  href="/crops"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-harvest-500 text-white rounded-lg hover:bg-harvest-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                  <Save className="h-4 w-4" />
                  <span>Add Crop</span>
                    </>
                  )}
                </button>
              </div>
            </form>
            </CardContent>
          </Card>
      </main>
    </div>
  );
}

