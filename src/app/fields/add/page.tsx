'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowLeft,
  Save,
  MapPin,
  Sun,
  Droplets,
  Wrench,
  Loader2
} from "lucide-react";
import { apiService } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AddFieldPage() {
  const [newField, setNewField] = useState({
    name: '',
    area: '',
    location: '',
    soilType: 'loamy',
    irrigationType: 'drip',
    status: 'active',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await apiService.createField(newField);
      
      if (response.data.success) {
        toast.success('Field added successfully!');
        
        // Reset form
        setNewField({
          name: '',
          area: '',
          location: '',
          soilType: 'loamy',
          irrigationType: 'drip',
          status: 'active',
          notes: ''
        });
        
        // Redirect back to fields page
        window.location.href = '/fields';
      } else {
        toast.error('Failed to add field');
      }
      
    } catch (error: any) {
      console.error('Error adding field:', error);
      const errorMessage = error.response?.data?.error || 'Error adding field. Please try again.';
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
                href="/fields"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Field</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create a new field for crop management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="px-4 py-6">
        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Field Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Field Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newField.name}
                    onChange={(e) => setNewField({...newField, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="e.g., Field A"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Area (acres) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newField.area}
                    onChange={(e) => setNewField({...newField, area: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="0.0"
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={newField.location}
                    onChange={(e) => setNewField({...newField, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="e.g., North Section"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Soil Type *
                  </label>
                  <select
                    required
                    value={newField.soilType}
                    onChange={(e) => setNewField({...newField, soilType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  >
                    <option value="loamy">Loamy</option>
                    <option value="clay">Clay</option>
                    <option value="sandy">Sandy</option>
                    <option value="silt">Silt</option>
                    <option value="peaty">Peaty</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Irrigation Type *
                  </label>
                  <select
                    required
                    value={newField.irrigationType}
                    onChange={(e) => setNewField({...newField, irrigationType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  >
                    <option value="drip">Drip Irrigation</option>
                    <option value="sprinkler">Sprinkler</option>
                    <option value="flood">Flood Irrigation</option>
                    <option value="manual">Manual</option>
                    <option value="none">None</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={newField.status}
                    onChange={(e) => setNewField({...newField, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="fallow">Fallow</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={newField.notes}
                  onChange={(e) => setNewField({...newField, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="Additional notes about the field, special conditions, etc..."
                />
              </div>
              
              <div className="flex space-x-3 pt-6">
                <Link
                  href="/fields"
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
                      <span>Add Field</span>
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
