import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase, createResponse } from '@/lib/mongodb';

// GET /api/activities - Get all activities
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const activities = await db.collection('activities').find({}).toArray();
    
    return createResponse(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return createResponse('Failed to fetch activities', false, 500);
  }
}

// POST /api/activities - Create a new activity
export async function POST(request: NextRequest) {
  try {
    const activityData = await request.json();
    
    // Validate required fields
    const requiredFields = ['type', 'description', 'date'];
    for (const field of requiredFields) {
      if (!activityData[field]) {
        return createResponse(`Missing required field: ${field}`, false, 400);
      }
    }

    const db = await getDatabase();
    
    const newActivity = {
      ...activityData,
      status: activityData.status || 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('activities').insertOne(newActivity);
    
    const createdActivity = await db.collection('activities').findOne({ _id: result.insertedId });
    
    return createResponse(createdActivity, true, 201);
  } catch (error) {
    console.error('Error creating activity:', error);
    return createResponse('Failed to create activity', false, 500);
  }
}
