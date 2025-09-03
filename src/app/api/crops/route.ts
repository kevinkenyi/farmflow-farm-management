import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase, createResponse } from '@/lib/mongodb';

// GET /api/crops - Get all crops
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const crops = await db.collection('crops').find({}).toArray();
    
    return createResponse(crops);
  } catch (error) {
    console.error('Error fetching crops:', error);
    return createResponse('Failed to fetch crops', false, 500);
  }
}

// POST /api/crops - Create a new crop
export async function POST(request: NextRequest) {
  try {
    const cropData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'variety', 'plantedDate', 'expectedHarvestDate', 'field'];
    for (const field of requiredFields) {
      if (!cropData[field]) {
        return createResponse(`Missing required field: ${field}`, false, 400);
      }
    }

    const db = await getDatabase();
    
    const newCrop = {
      ...cropData,
      status: cropData.status || 'planted',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('crops').insertOne(newCrop);
    
    const createdCrop = await db.collection('crops').findOne({ _id: result.insertedId });
    
    return createResponse(createdCrop, true, 201);
  } catch (error) {
    console.error('Error creating crop:', error);
    return createResponse('Failed to create crop', false, 500);
  }
}
