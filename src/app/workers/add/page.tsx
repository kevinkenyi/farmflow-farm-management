'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowLeft,
  Save,
  Users,
  Phone,
  MapPin,
  Star,
  Wrench,
  Loader2
} from "lucide-react";
import { apiService } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AddWorkerPage() {
  const [newWorker, setNewWorker] = useState({
    name: '',
    phone: '',
    skills: [] as string[],
    hourlyRate: '',
    location: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const availableSkills = [
    'Planting',
    'Harvesting',
    'Irrigation',
    'Fertilizing',
    'Pest Control',
    'Maintenance',
    'Transport',
    'Equipment',
    'Quality Control',
    'Supervision'
  ];

  const handleSkillToggle = (skill: string) => {
    setNewWorker(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await apiService.createWorker(newWorker);
      
      if (response.data.success) {
        toast.success('Worker added successfully!');
        
        // Reset form
        setNewWorker({
          name: '',
          phone: '',
          skills: [],
          hourlyRate: '',
          location: '',
          notes: ''
        });
        
        // Redirect back to workers page
        window.location.href = '/workers';
      } else {
        toast.error('Failed to add worker');
      }
      
    } catch (error: any) {
      console.error('Error adding worker:', error);
      const errorMessage = error.response?.data?.error || 'Error adding worker. Please try again.';
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
                href="/workers"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Worker</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add a worker to your farm team</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="px-4 py-6">
        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Worker Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newWorker.name}
                    onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="e.g., John Mwangi"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newWorker.phone}
                    onChange={(e) => setNewWorker({...newWorker, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="e.g., +254 712 345 678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hourly Rate (KSH) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newWorker.hourlyRate}
                    onChange={(e) => setNewWorker({...newWorker, hourlyRate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                    placeholder="500"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Location
                  </label>
                  <select
                    value={newWorker.location}
                    onChange={(e) => setNewWorker({...newWorker, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  >
                    <option value="">Select location</option>
                    <option value="Field A">Field A</option>
                    <option value="Field B">Field B</option>
                    <option value="Field C">Field C</option>
                    <option value="Field D">Field D</option>
                    <option value="Storage">Storage</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills *
                </label>
                <p className="text-xs text-gray-500 mb-3">Tap to select worker's skills</p>
                <div className="grid grid-cols-2 gap-2">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                        newWorker.skills.includes(skill)
                          ? 'border-harvest-500 bg-harvest-100 text-harvest-700 dark:bg-harvest-900 dark:text-harvest-300'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-earth-500'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                {newWorker.skills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Selected skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {newWorker.skills.map((skill) => (
                        <span key={skill} className="bg-harvest-100 dark:bg-harvest-900 text-harvest-700 dark:text-harvest-300 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={newWorker.notes}
                  onChange={(e) => setNewWorker({...newWorker, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="Any additional notes about this worker..."
                />
              </div>
              
              <div className="flex space-x-3 pt-6">
                <Link
                  href="/workers"
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
                      <span>Add Worker</span>
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

