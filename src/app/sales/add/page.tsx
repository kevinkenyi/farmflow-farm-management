'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Package, DollarSign, Users, Calendar } from 'lucide-react';
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";

export default function AddSalePage() {
  const [newSale, setNewSale] = useState({
    cropId: '',
    clientId: '',
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    totalAmount: '',
    saleDate: new Date().toISOString().split('T')[0],
    paymentTerms: 'immediate',
    notes: ''
  });

  // Mock data - in real app, this would come from API
  const crops = [
    { id: 1, name: 'Tomatoes', variety: 'Cherry', availableQuantity: 50, unit: 'kg' },
    { id: 2, name: 'Lettuce', variety: 'Romaine', availableQuantity: 30, unit: 'kg' },
    { id: 3, name: 'Strawberries', variety: 'Alpine', availableQuantity: 25, unit: 'kg' },
    { id: 4, name: 'Carrots', variety: 'Nantes', availableQuantity: 40, unit: 'kg' }
  ];

  const clients = [
    { id: 1, name: 'Green Valley Primary School', contact: 'Mrs. Sarah Kimani' },
    { id: 2, name: 'Sunshine Secondary School', contact: 'Mr. James Mwangi' },
    { id: 3, name: 'Happy Kids Academy', contact: 'Ms. Grace Wanjiku' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setNewSale(prev => {
      const updated = {
        ...prev,
        [field]: value
      };

      // Auto-calculate total amount
      if (field === 'quantity' || field === 'pricePerUnit') {
        const quantity = field === 'quantity' ? parseFloat(value) : parseFloat(updated.quantity);
        const price = field === 'pricePerUnit' ? parseFloat(value) : parseFloat(updated.pricePerUnit);
        
        if (quantity && price) {
          updated.totalAmount = (quantity * price).toString();
        }
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Recording new sale:', newSale);
      alert('Sale recorded successfully!');
      
      // Reset form
      setNewSale({
        cropId: '',
        clientId: '',
        quantity: '',
        unit: 'kg',
        pricePerUnit: '',
        totalAmount: '',
        saleDate: new Date().toISOString().split('T')[0],
        paymentTerms: 'immediate',
        notes: ''
      });
      
      window.location.href = '/financial';
    } catch (error) {
      console.error('Error recording sale:', error);
      alert('Error recording sale. Please try again.');
    }
  };

  const selectedCrop = crops.find(crop => crop.id.toString() === newSale.cropId);
  const selectedClient = clients.find(client => client.id.toString() === newSale.clientId);

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <PageHeader 
        title="Record Sale" 
        subtitle="Record a new sale to a client"
      />

      {/* Main Content */}
      <main className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Crop Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-earth-600" />
              Select Crop
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Crop *
              </label>
              <select
                required
                value={newSale.cropId}
                onChange={(e) => handleInputChange('cropId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
              >
                <option value="">Select crop to sell</option>
                {crops.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name} ({crop.variety}) - {crop.availableQuantity} {crop.unit} available
                  </option>
                ))}
              </select>
            </div>

            {selectedCrop && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Available:</strong> {selectedCrop.availableQuantity} {selectedCrop.unit}
                </div>
              </div>
            )}
          </div>

          {/* Client Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-earth-600" />
              Select Client
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client *
              </label>
              <select
                required
                value={newSale.clientId}
                onChange={(e) => handleInputChange('clientId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
              >
                <option value="">Select client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} - {client.contact}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sale Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-earth-600" />
              Sale Details
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={newSale.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="0"
                  max={selectedCrop?.availableQuantity}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Unit
                </label>
                <select
                  value={newSale.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="pieces">Pieces</option>
                  <option value="bunches">Bunches</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price per Unit (KSH) *
                </label>
                <input
                  type="number"
                  required
                  value={newSale.pricePerUnit}
                  onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Amount (KSH)
                </label>
                <input
                  type="number"
                  value={newSale.totalAmount}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-earth-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-earth-600" />
              Payment Terms
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Terms
                </label>
                <select
                  value={newSale.paymentTerms}
                  onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                >
                  <option value="immediate">Immediate Payment</option>
                  <option value="7_days">7 Days</option>
                  <option value="14_days">14 Days</option>
                  <option value="30_days">30 Days</option>
                  <option value="60_days">60 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sale Date
                </label>
                <input
                  type="date"
                  value={newSale.saleDate}
                  onChange={(e) => handleInputChange('saleDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                />
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
                value={newSale.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                placeholder="Any additional details about this sale..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link
              href="/financial"
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
              <span>Record Sale</span>
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


