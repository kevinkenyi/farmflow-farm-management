import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase, createResponse } from '@/lib/mongodb';

// GET /api/workers - Get all workers
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const workers = await db.collection('users').find({ role: 'worker' }).toArray();
    
    return createResponse(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    return createResponse('Failed to fetch workers', false, 500);
  }
}

// POST /api/workers - Create a new worker
export async function POST(request: NextRequest) {
  try {
    const workerData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'phone'];
    for (const field of requiredFields) {
      if (!workerData[field]) {
        return createResponse(`Missing required field: ${field}`, false, 400);
      }
    }

    const db = await getDatabase();
    
    const newWorker = {
      ...workerData,
      role: 'worker',
      status: workerData.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('users').insertOne(newWorker);
    
    const createdWorker = await db.collection('users').findOne({ _id: result.insertedId });
    
    return createResponse(createdWorker, true, 201);
  } catch (error) {
    console.error('Error creating worker:', error);
    return createResponse('Failed to create worker', false, 500);
  }
}
