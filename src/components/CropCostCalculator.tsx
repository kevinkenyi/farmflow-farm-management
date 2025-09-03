'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Minus,
  Trash2
} from "lucide-react";

interface CostItem {
  id: number;
  category: string;
  description: string;
  cost: number;
  quantity?: number;
  unit?: string;
}

interface CropCostCalculatorProps {
  cropId: number;
  onCostUpdate?: (totalCost: number) => void;
}

export default function CropCostCalculator({ cropId, onCostUpdate }: CropCostCalculatorProps) {
  const [costItems, setCostItems] = useState<CostItem[]>([
    {
      id: 1,
      category: 'Seeds/Seedlings',
      description: 'Tomato seedlings',
      cost: 500,
      quantity: 100,
      unit: 'plants'
    },
    {
      id: 2,
      category: 'Fertilizer',
      description: 'Organic compost',
      cost: 300,
      quantity: 2,
      unit: 'kg'
    },
    {
      id: 3,
      category: 'Labor',
      description: 'Planting labor',
      cost: 200,
      quantity: 4,
      unit: 'hours'
    }
  ]);

  const [newItem, setNewItem] = useState({
    category: '',
    description: '',
    cost: '',
    quantity: '',
    unit: ''
  });

  const categories = [
    'Seeds/Seedlings',
    'Fertilizer',
    'Pesticides',
    'Labor',
    'Equipment',
    'Water',
    'Other'
  ];

  const totalCost = costItems.reduce((sum, item) => sum + item.cost, 0);

  const handleAddItem = () => {
    if (newItem.category && newItem.description && newItem.cost) {
      const item: CostItem = {
        id: Date.now(),
        category: newItem.category,
        description: newItem.description,
        cost: parseFloat(newItem.cost),
        quantity: newItem.quantity ? parseFloat(newItem.quantity) : undefined,
        unit: newItem.unit || undefined
      };
      
      setCostItems([...costItems, item]);
      setNewItem({ category: '', description: '', cost: '', quantity: '', unit: '' });
      
      if (onCostUpdate) {
        onCostUpdate(totalCost + item.cost);
      }
    }
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = costItems.filter(item => item.id !== id);
    setCostItems(updatedItems);
    
    if (onCostUpdate) {
      const newTotal = updatedItems.reduce((sum, item) => sum + item.cost, 0);
      onCostUpdate(newTotal);
    }
  };

  const handleUpdateCost = (id: number, newCost: number) => {
    const updatedItems = costItems.map(item => 
      item.id === id ? { ...item, cost: newCost } : item
    );
    setCostItems(updatedItems);
    
    if (onCostUpdate) {
      const newTotal = updatedItems.reduce((sum, item) => sum + item.cost, 0);
      onCostUpdate(newTotal);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Seeds/Seedlings': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Fertilizer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Pesticides': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Labor': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Equipment': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Water': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-earth-600" />
          <span>Cost Calculator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Item */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-white">Add Cost Item</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <input
              type="text"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              placeholder="Description"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              value={newItem.cost}
              onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
              placeholder="Cost (KSH)"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
            />
            
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              placeholder="Quantity"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
            />
            
            <input
              type="text"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              placeholder="Unit"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
            />
          </div>
          
          <button
            onClick={handleAddItem}
            className="w-full flex items-center justify-center space-x-2 bg-earth-500 hover:bg-earth-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Cost Items List */}
        <div className="space-y-3">
          {costItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <div className="text-sm text-gray-900 dark:text-white">{item.description}</div>
                {item.quantity && item.unit && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {item.quantity} {item.unit}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={item.cost}
                  onChange={(e) => handleUpdateCost(item.id, parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-earth-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">KSH</span>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Cost */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="font-medium text-gray-900 dark:text-white">Total Cost</span>
            </div>
            <div className="text-xl font-bold text-green-600">
              KSH {totalCost.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


