import axios from 'axios';

// In Next.js full-stack mode, we use relative paths
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_URL || ''
  : '';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access:', error);
      // For now, just log the error instead of redirecting to login
      // localStorage.removeItem('authToken');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  health: '/api/health',
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
  },
  users: '/api/users',
  workers: '/api/workers',
  crops: '/api/crops',
  fields: '/api/fields',
  inventory: '/api/inventory',
  financial: '/api/financial',
  customers: '/api/customers',
  invoices: '/api/invoices',
  activities: '/api/activities',
  sms: '/api/sms',
};

// API functions
export const apiService = {
  // Health check
  health: () => api.get(endpoints.health),
  
  // Auth
  login: (credentials: { email: string; password: string }) =>
    api.post(endpoints.auth.login, credentials),
  
  register: (userData: { name: string; email: string; password: string }) =>
    api.post(endpoints.auth.register, userData),
  
  // Users
  getUsers: () => api.get(endpoints.users),
  getUser: (id: string) => api.get(`${endpoints.users}/${id}`),
  createUser: (userData: any) => api.post(endpoints.users, userData),
  updateUser: (id: string, userData: any) => api.put(`${endpoints.users}/${id}`, userData),
  deleteUser: (id: string) => api.delete(`${endpoints.users}/${id}`),
  
  // Workers
  getWorkers: () => api.get(endpoints.workers),
  getWorker: (id: string) => api.get(`${endpoints.workers}/${id}`),
  createWorker: (workerData: any) => api.post(endpoints.workers, workerData),
  updateWorker: (id: string, workerData: any) => api.put(`${endpoints.workers}/${id}`, workerData),
  deleteWorker: (id: string) => api.delete(`${endpoints.workers}/${id}`),
  
  // Crops
  getCrops: () => api.get(endpoints.crops),
  getCrop: (id: string) => api.get(`${endpoints.crops}/${id}`),
  createCrop: (cropData: any) => api.post(endpoints.crops, cropData),
  updateCrop: (id: string, cropData: any) => api.put(`${endpoints.crops}/${id}`, cropData),
  deleteCrop: (id: string) => api.delete(`${endpoints.crops}/${id}`),
  
  // Fields
  getFields: () => api.get(endpoints.fields),
  getField: (id: string) => api.get(`${endpoints.fields}/${id}`),
  createField: (fieldData: any) => api.post(endpoints.fields, fieldData),
  updateField: (id: string, fieldData: any) => api.put(`${endpoints.fields}/${id}`, fieldData),
  deleteField: (id: string) => api.delete(`${endpoints.fields}/${id}`),
  
  // Inventory
  getInventory: () => api.get(endpoints.inventory),
  getInventoryItem: (id: string) => api.get(`${endpoints.inventory}/${id}`),
  createInventoryItem: (itemData: any) => api.post(endpoints.inventory, itemData),
  updateInventoryItem: (id: string, itemData: any) => api.put(`${endpoints.inventory}/${id}`, itemData),
  deleteInventoryItem: (id: string) => api.delete(`${endpoints.inventory}/${id}`),
  
  // Financial
  getTransactions: () => api.get(endpoints.financial),
  getTransaction: (id: string) => api.get(`${endpoints.financial}/${id}`),
  createTransaction: (transactionData: any) => api.post(endpoints.financial, transactionData),
  updateTransaction: (id: string, transactionData: any) => api.put(`${endpoints.financial}/${id}`, transactionData),
  deleteTransaction: (id: string) => api.delete(`${endpoints.financial}/${id}`),
  
  // Customers
  getCustomers: () => api.get(endpoints.customers),
  getCustomer: (id: string) => api.get(`${endpoints.customers}/${id}`),
  createCustomer: (customerData: any) => api.post(endpoints.customers, customerData),
  updateCustomer: (id: string, customerData: any) => api.put(`${endpoints.customers}/${id}`, customerData),
  deleteCustomer: (id: string) => api.delete(`${endpoints.customers}/${id}`),
  
  // Invoices
  getInvoices: () => api.get(endpoints.invoices),
  getInvoice: (id: string) => api.get(`${endpoints.invoices}/${id}`),
  createInvoice: (invoiceData: any) => api.post(endpoints.invoices, invoiceData),
  updateInvoice: (id: string, invoiceData: any) => api.put(`${endpoints.invoices}/${id}`, invoiceData),
  deleteInvoice: (id: string) => api.delete(`${endpoints.invoices}/${id}`),
  
  // Activities
  getActivities: () => api.get(endpoints.activities),
  getActivity: (id: string) => api.get(`${endpoints.activities}/${id}`),
  createActivity: (activityData: any) => api.post(endpoints.activities, activityData),
  updateActivity: (id: string, activityData: any) => api.put(`${endpoints.activities}/${id}`, activityData),
  deleteActivity: (id: string) => api.delete(`${endpoints.activities}/${id}`),
  
  // SMS
  getSMSConfig: () => api.get(`${endpoints.sms}/config`),
  saveSMSConfig: (configData: any) => api.post(`${endpoints.sms}/config`, configData),
  sendSMS: (smsData: { to: string; message: string; type?: string }) => api.post(`${endpoints.sms}/send`, smsData),
  sendBulkSMS: (smsData: { recipients: string[]; message: string; type?: string }) => api.post(`${endpoints.sms}/send-bulk`, smsData),
  notifyWorker: (workerData: { workerId: string; taskTitle: string; taskDetails?: string; workerPhone?: string }) => api.post(`${endpoints.sms}/notify-worker`, workerData),
  sendPaymentReminder: (reminderData: { customerId: string; amount: number; dueDate: string; invoiceNumber?: string; customerPhone?: string }) => api.post(`${endpoints.sms}/payment-reminder`, reminderData),
  getSMSLogs: (params?: { limit?: number; skip?: number; type?: string }) => api.get(`${endpoints.sms}/logs`, { params }),
};
