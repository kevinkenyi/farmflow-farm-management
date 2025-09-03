import { NextRequest } from 'next/server';
import { getDatabase, createResponse } from '@/lib/mongodb';

// POST /api/sms/send - Send SMS message
export async function POST(request: NextRequest) {
  try {
    const { to, message, type = 'general' } = await request.json();
    
    if (!to || !message) {
      return createResponse('Phone number and message are required', false, 400);
    }

    // For demo purposes, we'll simulate sending SMS
    // In production, you would integrate with actual SMS providers
    
    const db = await getDatabase();
    
    // Log SMS message
    const smsLog = {
      to,
      message,
      type,
      status: 'sent',
      sentAt: new Date(),
      provider: 'demo',
      messageId: `SMS_${Date.now()}`,
      cost: 1.0 // KSH
    };
    
    await db.collection('sms_logs').insertOne(smsLog);
    
    console.log('SMS sent:', { to, message, type });
    
    return createResponse({
      messageId: smsLog.messageId,
      message: 'SMS sent successfully',
      cost: smsLog.cost
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return createResponse('Failed to send SMS', false, 500);
  }
}
