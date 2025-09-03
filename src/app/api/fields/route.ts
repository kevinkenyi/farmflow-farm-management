import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase, createResponse } from '@/lib/mongodb';

// GET /api/fields - Get all fields
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const fields = await db.collection('fields').find({}).toArray();
    
    return createResponse(fields);
  } catch (error) {
    console.error('Error fetching fields:', error);
    return createResponse('Failed to fetch fields', false, 500);
  }
}

// POST /api/fields - Create a new field
export async function POST(request: NextRequest) {
  try {
    const fieldData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'area', 'location', 'soilType', 'irrigationType'];
    for (const field of requiredFields) {
      if (!fieldData[field]) {
        return createResponse(`Missing required field: ${field}`, false, 400);
      }
    }

    const db = await getDatabase();
    
    const newField = {
      ...fieldData,
      status: fieldData.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('fields').insertOne(newField);
    
    const createdField = await db.collection('fields').findOne({ _id: result.insertedId });
    
    return createResponse(createdField, true, 201);
  } catch (error) {
    console.error('Error creating field:', error);
    return createResponse('Failed to create field', false, 500);
  }
}
