/**
 * SMS Service for FarmFlow
 * Supports multiple SMS providers: Africa's Talking, Twilio, and Generic APIs
 */

export interface SMSConfig {
  provider: 'africas_talking' | 'twilio' | 'generic';
  apiKey?: string;
  username?: string;
  senderId?: string;
  accountSid?: string;
  authToken?: string;
}

export interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  cost?: number;
}

export class SMSService {
  private config: SMSConfig | null = null;
  private initialized = false;

  /**
   * Initialize the SMS service with configuration
   */
  async initialize(config: SMSConfig): Promise<boolean> {
    try {
      // Validate configuration based on provider
      if (!this.validateConfig(config)) {
        console.error('Invalid SMS configuration');
        return false;
      }

      this.config = config;
      this.initialized = true;
      console.log(`SMS Service initialized with provider: ${config.provider}`);
      return true;
    } catch (error) {
      console.error('Failed to initialize SMS service:', error);
      this.initialized = false;
      return false;
    }
  }

  /**
   * Check if the SMS service is initialized
   */
  isInitialized(): boolean {
    return this.initialized && this.config !== null;
  }

  /**
   * Send SMS message
   */
  async sendSMS(to: string, message: string): Promise<SMSResponse> {
    if (!this.isInitialized() || !this.config) {
      return {
        success: false,
        error: 'SMS service not initialized'
      };
    }

    try {
      switch (this.config.provider) {
        case 'africas_talking':
          return await this.sendAfricasTalking(to, message);
        case 'twilio':
          return await this.sendTwilio(to, message);
        case 'generic':
          return await this.sendGeneric(to, message);
        default:
          return {
            success: false,
            error: 'Unsupported SMS provider'
          };
      }
    } catch (error) {
      console.error('Failed to send SMS:', error);
      return {
        success: false,
        error: 'Failed to send SMS message'
      };
    }
  }

  /**
   * Send bulk SMS to multiple recipients
   */
  async sendBulkSMS(recipients: string[], message: string): Promise<SMSResponse[]> {
    const results: SMSResponse[] = [];
    
    for (const recipient of recipients) {
      const result = await this.sendSMS(recipient, message);
      results.push(result);
      
      // Add small delay between messages to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return results;
  }

  /**
   * Send notification to worker
   */
  async notifyWorker(workerPhone: string, taskTitle: string, taskDetails?: string): Promise<SMSResponse> {
    const message = taskDetails 
      ? `FarmFlow Task Assigned: ${taskTitle}\n\nDetails: ${taskDetails}\n\nPlease confirm receipt.`
      : `FarmFlow Task Assigned: ${taskTitle}\n\nPlease confirm receipt.`;
    
    return await this.sendSMS(workerPhone, message);
  }

  /**
   * Send payment reminder to customer
   */
  async sendPaymentReminder(customerPhone: string, amount: number, dueDate: string, invoiceNumber?: string): Promise<SMSResponse> {
    const message = invoiceNumber
      ? `FarmFlow Payment Reminder: Invoice ${invoiceNumber} for KSH ${amount} is due on ${dueDate}. Please make payment to avoid service interruption.`
      : `FarmFlow Payment Reminder: Amount KSH ${amount} is due on ${dueDate}. Please make payment to avoid service interruption.`;
    
    return await this.sendSMS(customerPhone, message);
  }

  /**
   * Send crop update notification
   */
  async sendCropUpdate(phone: string, cropName: string, status: string, notes?: string): Promise<SMSResponse> {
    const message = notes
      ? `FarmFlow Update: ${cropName} status changed to ${status}.\n\nNotes: ${notes}`
      : `FarmFlow Update: ${cropName} status changed to ${status}.`;
    
    return await this.sendSMS(phone, message);
  }

  // Private methods for different providers

  private async sendAfricasTalking(to: string, message: string): Promise<SMSResponse> {
    if (!this.config?.username || !this.config?.apiKey) {
      return {
        success: false,
        error: 'Missing Africa\'s Talking credentials'
      };
    }

    try {
      // For demo/testing purposes, we'll simulate the API call
      // In production, you would make actual API calls to Africa's Talking
      console.log('Africa\'s Talking SMS:', { to, message, from: this.config.senderId });
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        messageId: `AT_${Date.now()}`,
        cost: 1.0 // KSH
      };
    } catch (error) {
      return {
        success: false,
        error: 'Africa\'s Talking API error'
      };
    }
  }

  private async sendTwilio(to: string, message: string): Promise<SMSResponse> {
    if (!this.config?.accountSid || !this.config?.authToken) {
      return {
        success: false,
        error: 'Missing Twilio credentials'
      };
    }

    try {
      // For demo/testing purposes, we'll simulate the API call
      // In production, you would make actual API calls to Twilio
      console.log('Twilio SMS:', { to, message, from: this.config.senderId });
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        messageId: `TW_${Date.now()}`,
        cost: 0.05 // USD
      };
    } catch (error) {
      return {
        success: false,
        error: 'Twilio API error'
      };
    }
  }

  private async sendGeneric(to: string, message: string): Promise<SMSResponse> {
    if (!this.config?.apiKey) {
      return {
        success: false,
        error: 'Missing Generic API credentials'
      };
    }

    try {
      // For demo/testing purposes, we'll simulate the API call
      // In production, you would make actual API calls to your SMS provider
      console.log('Generic SMS:', { to, message, from: this.config.senderId });
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        messageId: `GEN_${Date.now()}`,
        cost: 0.02 // USD
      };
    } catch (error) {
      return {
        success: false,
        error: 'Generic SMS API error'
      };
    }
  }

  private validateConfig(config: SMSConfig): boolean {
    switch (config.provider) {
      case 'africas_talking':
        return !!(config.username && config.apiKey);
      case 'twilio':
        return !!(config.accountSid && config.authToken);
      case 'generic':
        return !!(config.apiKey);
      default:
        return false;
    }
  }

  /**
   * Get current configuration (without sensitive data)
   */
  getConfig(): Partial<SMSConfig> | null {
    if (!this.config) return null;
    
    return {
      provider: this.config.provider,
      senderId: this.config.senderId,
      username: this.config.username ? '***' : undefined
    };
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      provider: this.config?.provider || null,
      senderId: this.config?.senderId || null
    };
  }
}

// Export singleton instance
export const smsService = new SMSService();

// Helper functions for common SMS patterns
export const smsTemplates = {
  taskAssignment: (taskTitle: string, workerName: string, dueDate?: string) => {
    const dueDateText = dueDate ? ` Due: ${dueDate}` : '';
    return `Hi ${workerName}, you've been assigned: ${taskTitle}${dueDateText}. Please confirm receipt. - FarmFlow`;
  },
  
  taskReminder: (workerName: string, taskTitle: string, dueDate: string) => {
    return `Hi ${workerName}, this is a reminder about your task: ${taskTitle} due on ${dueDate}. Please update status. - FarmFlow`;
  },
  
  paymentReminder: (amount: number, customerName: string, dueDate: string) => {
    return `Dear ${customerName}, this is a reminder that your payment of KSH ${amount} is due on ${dueDate}. Thank you. - FarmFlow`;
  },
  
  cropAlert: (cropName: string, alertType: string, details?: string) => {
    const detailText = details ? ` Details: ${details}` : '';
    return `Alert: ${cropName} - ${alertType}${detailText}. Please take necessary action. - FarmFlow`;
  },
  
  deliveryNotification: (customerName: string, items: string, deliveryDate: string) => {
    return `Hi ${customerName}, your order (${items}) will be delivered on ${deliveryDate}. Please be available. - FarmFlow`;
  }
};

export default smsService;
