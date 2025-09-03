'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  Search, 
  Plus, 
  Filter, 
  School, 
  Phone, 
  MapPin, 
  DollarSign,
  ChevronRight,
  Edit,
  Trash2,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Clock
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import PageHeader from "@/components/PageHeader";
import { smsService, smsTemplates } from "@/services/smsService";

export default function ClientsPage() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Green Valley Primary School",
      type: "School",
      contact: "Mrs. Sarah Kimani",
      phone: "+254712345678",
      address: "Nairobi, Kenya",
      totalOrders: 15,
      totalAmount: 45000,
      outstandingBalance: 5000,
      lastOrder: "2024-12-15",
      paymentStatus: "partial",
      notes: "Regular customer, prefers organic produce"
    },
    {
      id: 2,
      name: "Sunshine Secondary School",
      type: "School",
      contact: "Mr. James Mwangi",
      phone: "+254723456789",
      address: "Kiambu, Kenya",
      totalOrders: 8,
      totalAmount: 28000,
      outstandingBalance: 0,
      lastOrder: "2024-12-10",
      paymentStatus: "paid",
      notes: "Pays on time, bulk orders"
    },
    {
      id: 3,
      name: "Happy Kids Academy",
      type: "School",
      contact: "Ms. Grace Wanjiku",
      phone: "+254734567890",
      address: "Thika, Kenya",
      totalOrders: 12,
      totalAmount: 36000,
      outstandingBalance: 8000,
      lastOrder: "2024-12-12",
      paymentStatus: "overdue",
      notes: "Needs payment reminder"
    }
  ]);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success-500';
      case 'partial': return 'bg-warning-500';
      case 'overdue': return 'bg-error-500';
      default: return 'bg-gray-500';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'partial': return 'Partial';
      case 'overdue': return 'Overdue';
      default: return 'Unknown';
    }
  };

  const handleDeleteClient = (id: number) => {
    if (confirm('Are you sure you want to remove this client?')) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const handleSendPaymentReminder = async (client: any) => {
    try {
      if (!smsService.isInitialized()) {
        alert('SMS service not configured. Please go to Settings > SMS to configure your SMS provider.');
        return;
      }

      const message = smsTemplates.paymentReminder(
        client.contact,
        client.outstandingBalance,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() // 7 days from now
      );

      const result = await smsService.sendSMS(client.phone, message);
      
      if (result.success) {
        alert(`Payment reminder sent successfully to ${client.contact}!`);
      } else {
        alert(`Failed to send payment reminder: ${result.error}`);
      }
    } catch (error) {
      alert('Error sending payment reminder. Please try again.');
    }
  };

  const handleRecordPayment = (clientId: number) => {
    const amount = prompt('Enter payment amount:');
    if (amount && !isNaN(Number(amount))) {
      setClients(clients.map(client => 
        client.id === clientId 
          ? { 
              ...client, 
              outstandingBalance: Math.max(0, client.outstandingBalance - Number(amount)),
              paymentStatus: client.outstandingBalance - Number(amount) <= 0 ? 'paid' : 'partial'
            }
          : client
      ));
      alert(`Payment of KSH ${amount} recorded successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header with Home Button */}
      <PageHeader 
        title="Clients" 
        subtitle="Manage your school customers and payments"
      />

      {/* Search and Add Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-earth-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <Link href="/clients/add" className="flex items-center space-x-2 bg-harvest-500 text-white px-4 py-2 rounded-lg hover:bg-harvest-600 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Client</span>
            </Link>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
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
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <School className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{clients.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Clients</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                KSH {clients.reduce((sum, client) => sum + client.totalAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                KSH {clients.reduce((sum, client) => sum + client.outstandingBalance, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Outstanding</div>
            </CardContent>
          </Card>
        </div>

        {/* Clients List */}
        <div className="space-y-4">
          {clients.map((client) => (
            <Card key={client.id} className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Client Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <School className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{client.type}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="h-3 w-3" />
                            <span>{client.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-3 w-3" />
                            <span>{client.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`${getPaymentStatusColor(client.paymentStatus)} text-white text-xs px-2 py-1 rounded-full`}>
                        {getPaymentStatusText(client.paymentStatus)}
                      </span>
                    </div>
                  </div>

                  {/* Client Stats */}
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{client.totalOrders}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        KSH {client.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-semibold ${
                        client.outstandingBalance > 0 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        KSH {client.outstandingBalance.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Outstanding</div>
                    </div>
                  </div>

                  {/* Client Notes */}
                  {client.notes && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      <strong>Notes:</strong> {client.notes}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => handleRecordPayment(client.id)}
                      className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Record Payment</span>
                    </button>

                    {client.outstandingBalance > 0 && (
                      <button
                        onClick={() => handleSendPaymentReminder(client)}
                        className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>Send Reminder</span>
                      </button>
                    )}

                    <Link
                      href={`/clients/${client.id}/edit`}
                      className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
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


