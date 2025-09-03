import { NextRequest } from 'next/server';
import { getDatabase, createResponse } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    const db = await getDatabase();
    await db.admin().ping();

    return createResponse({
      message: 'FarmFlow API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'connected'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return createResponse('Health check failed', false, 500);
  }
}
