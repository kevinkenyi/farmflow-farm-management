'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  MessageSquare, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Key,
  User,
  Send
} from "lucide-react";
import { smsService, SMSConfig } from "@/services/smsService";

export default function SMSSettingsPage() {
  const [config, setConfig] = useState<SMSConfig>({
    provider: 'africas_talking',
    apiKey: '',
    username: '',
    senderId: '',
    accountSid: '',
    authToken: ''
  });
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved configuration from localStorage
    const savedConfig = localStorage.getItem('smsConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      setIsInitialized(smsService.isInitialized());
    }
  }, []);

  const handleConfigChange = (field: keyof SMSConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveConfig = async () => {
    setIsLoading(true);
    try {
      const success = await smsService.initialize(config);
      if (success) {
        localStorage.setItem('smsConfig', JSON.stringify(config));
        setIsInitialized(true);
        setTestResult({
          success: true,
          message: 'SMS service configured successfully!'
        });
      } else {
        setTestResult({
          success: false,
          message: 'Failed to configure SMS service. Please check your settings.'
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Error configuring SMS service. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestSMS = async () => {
    setIsLoading(true);
    try {
      const result = await smsService.sendSMS('+254712345678', 'Test message from FarmFlow SMS service. If you receive this, your SMS is working correctly!');
      setTestResult({
        success: result.success,
        message: result.success 
          ? 'Test SMS sent successfully!' 
          : result.error || 'Failed to send test SMS'
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Error sending test SMS. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const providers = [
    {
      id: 'africas_talking',
      name: 'Africa\'s Talking',
      description: 'Popular SMS provider in Africa',
      fields: ['username', 'apiKey', 'senderId']
    },
    {
      id: 'twilio',
      name: 'Twilio',
      description: 'Global SMS provider',
      fields: ['accountSid', 'authToken', 'senderId']
    },
    {
      id: 'generic',
      name: 'Generic/Custom',
      description: 'Custom SMS service',
      fields: ['apiKey', 'senderId']
    }
  ];

  const currentProvider = providers.find(p => p.id === config.provider);

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-gray-900">
      {/* Header */}
      <PageHeader 
        title="SMS Settings" 
        subtitle="Configure SMS notifications for workers and clients"
      />

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Status Card */}
        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-earth-600" />
              <span>SMS Service Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              {isInitialized ? (
                <>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-green-600 font-medium">SMS Service Active</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Provider: {currentProvider?.name}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-orange-600 font-medium">SMS Service Not Configured</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Configure your SMS provider below
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Provider Selection */}
        <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-earth-600" />
              <span>Select SMS Provider</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    config.provider === provider.id
                      ? 'border-earth-500 bg-earth-50 dark:bg-earth-900'
                      : 'border-gray-200 dark:border-gray-700 hover:border-earth-300'
                  }`}
                  onClick={() => handleConfigChange('provider', provider.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {provider.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {provider.description}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      config.provider === provider.id
                        ? 'border-earth-500 bg-earth-500'
                        : 'border-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuration Fields */}
        {currentProvider && (
          <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-earth-600" />
                <span>Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentProvider.fields.includes('username') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Username
                    </label>
                    <input
                      type="text"
                      value={config.username || ''}
                      onChange={(e) => handleConfigChange('username', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                      placeholder="Enter your username"
                    />
                  </div>
                )}

                {currentProvider.fields.includes('apiKey') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Key className="h-4 w-4 inline mr-2" />
                      API Key
                    </label>
                    <input
                      type="password"
                      value={config.apiKey || ''}
                      onChange={(e) => handleConfigChange('apiKey', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                      placeholder="Enter your API key"
                    />
                  </div>
                )}

                {currentProvider.fields.includes('accountSid') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Key className="h-4 w-4 inline mr-2" />
                      Account SID
                    </label>
                    <input
                      type="text"
                      value={config.accountSid || ''}
                      onChange={(e) => handleConfigChange('accountSid', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                      placeholder="Enter your Account SID"
                    />
                  </div>
                )}

                {currentProvider.fields.includes('authToken') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Key className="h-4 w-4 inline mr-2" />
                      Auth Token
                    </label>
                    <input
                      type="password"
                      value={config.authToken || ''}
                      onChange={(e) => handleConfigChange('authToken', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                      placeholder="Enter your Auth Token"
                    />
                  </div>
                )}

                {currentProvider.fields.includes('senderId') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Sender ID
                    </label>
                    <input
                      type="text"
                      value={config.senderId || ''}
                      onChange={(e) => handleConfigChange('senderId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                      placeholder="Enter your Sender ID (e.g., FarmFlow)"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSaveConfig}
            disabled={isLoading}
            className="w-full bg-earth-500 hover:bg-earth-600 text-white py-3 text-lg font-medium"
          >
            {isLoading ? 'Saving...' : 'Save Configuration'}
          </Button>

          {isInitialized && (
            <Button
              onClick={handleTestSMS}
              disabled={isLoading}
              variant="outline"
              className="w-full border-earth-500 text-earth-500 hover:bg-earth-50 py-3 text-lg font-medium"
            >
              <Send className="h-5 w-5 mr-2" />
              {isLoading ? 'Sending...' : 'Send Test SMS'}
            </Button>
          )}
        </div>

        {/* Test Result */}
        {testResult && (
          <Card className={`border ${
            testResult.success 
              ? 'border-green-200 bg-green-50 dark:bg-green-900' 
              : 'border-red-200 bg-red-50 dark:bg-red-900'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                {testResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <p className={`font-medium ${
                  testResult.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {testResult.message}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
          <CardHeader>
            <CardTitle className="text-blue-800 dark:text-blue-200">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <p><strong>Africa's Talking:</strong> Sign up at africastalking.com and get your API credentials</p>
              <p><strong>Twilio:</strong> Sign up at twilio.com and get your Account SID and Auth Token</p>
              <p><strong>Generic:</strong> Use your custom SMS service API endpoint</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}


