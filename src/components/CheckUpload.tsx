'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  Camera, 
  FileImage, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Calendar,
  User,
  Building
} from "lucide-react";

interface CheckData {
  amount: number;
  date: string;
  payee: string;
  bank: string;
  checkNumber: string;
  memo?: string;
}

interface CheckUploadProps {
  onCheckProcessed: (checkData: CheckData) => void;
  cropId?: number;
  clientId?: number;
}

export default function CheckUpload({ onCheckProcessed, cropId, clientId }: CheckUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<CheckData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate OCR processing - in real app, this would call an OCR API
  const simulateOCR = async (imageFile: File): Promise<CheckData> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data - in real app, this would come from OCR service
    return {
      amount: 15000,
      date: new Date().toISOString().split('T')[0],
      payee: "Green Valley Primary School",
      bank: "Equity Bank",
      checkNumber: "CHK-2024-001234",
      memo: "Payment for fresh vegetables - December order"
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setUploadedImage(previewUrl);

      // Simulate OCR processing
      setIsProcessing(true);
      const extractedCheckData = await simulateOCR(file);
      setExtractedData(extractedCheckData);
      setIsProcessing(false);

    } catch (err) {
      setError('Failed to process check image. Please try again.');
      setIsProcessing(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open the device camera
    alert('Camera capture functionality will be implemented');
  };

  const handleConfirmData = () => {
    if (extractedData) {
      onCheckProcessed(extractedData);
      // Reset form
      setUploadedImage(null);
      setExtractedData(null);
      setError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleEditData = (field: keyof CheckData, value: string | number) => {
    if (extractedData) {
      setExtractedData({
        ...extractedData,
        [field]: value
      });
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-earth-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileImage className="h-5 w-5 text-earth-600" />
          <span>Upload Check Image</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Section */}
        {!uploadedImage && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload a clear image of the check
              </p>
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center space-x-2 bg-earth-500 hover:bg-earth-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <Upload className="h-4 w-4" />
                  <span>Choose File</span>
                </button>
                <button
                  onClick={handleCameraCapture}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Take Photo</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Processing check image...</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Extracting check details using OCR</p>
          </div>
        )}

        {/* Uploaded Image Preview */}
        {uploadedImage && !isProcessing && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={uploadedImage}
                alt="Uploaded check"
                className="w-full max-w-md mx-auto rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setExtractedData(null);
                  setError(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Extracted Data Form */}
        {extractedData && !isProcessing && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Check details extracted successfully!</span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Verify Check Details</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount (KSH)
                  </label>
                  <input
                    type="number"
                    value={extractedData.amount}
                    onChange={(e) => handleEditData('amount', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={extractedData.date}
                    onChange={(e) => handleEditData('date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payee
                </label>
                <input
                  type="text"
                  value={extractedData.payee}
                  onChange={(e) => handleEditData('payee', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bank
                  </label>
                  <input
                    type="text"
                    value={extractedData.bank}
                    onChange={(e) => handleEditData('bank', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Check Number
                  </label>
                  <input
                    type="text"
                    value={extractedData.checkNumber}
                    onChange={(e) => handleEditData('checkNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Memo/Notes
                </label>
                <textarea
                  value={extractedData.memo || ''}
                  onChange={(e) => handleEditData('memo', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-earth-500"
                />
              </div>
            </div>

            <button
              onClick={handleConfirmData}
              className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Confirm & Record Payment</span>
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


