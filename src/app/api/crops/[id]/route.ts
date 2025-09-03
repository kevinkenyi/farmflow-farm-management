import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase, createResponse, isValidObjectId } from '@/lib/mongodb';

// GET /api/crops/[id] - Get a single crop
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isValidObjectId(id)) {
      return createResponse('Invalid crop ID', false, 400);
    }

    const db = await getDatabase();
    const crop = await db.collection('crops').findOne({ _id: new ObjectId(id) });
    
    if (!crop) {
      return createResponse('Crop not found', false, 404);
    }
    
    return createResponse(crop);
  } catch (error) {
    console.error('Error fetching crop:', error);
    return createResponse('Failed to fetch crop', false, 500);
  }
}

// PUT /api/crops/[id] - Update a crop
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isValidObjectId(id)) {
      return createResponse('Invalid crop ID', false, 400);
    }

    const updateData = await request.json();
    
    const db = await getDatabase();
    
    const updatedCrop = {
      ...updateData,
      updatedAt: new Date()
    };

    const result = await db.collection('crops').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedCrop },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return createResponse('Crop not found', false, 404);
    }
    
    return createResponse(result);
  } catch (error) {
    console.error('Error updating crop:', error);
    return createResponse('Failed to update crop', false, 500);
  }
}

// DELETE /api/crops/[id] - Delete a crop
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isValidObjectId(id)) {
      return createResponse('Invalid crop ID', false, 400);
    }

    const db = await getDatabase();
    const result = await db.collection('crops').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return createResponse('Crop not found', false, 404);
    }
    
    return createResponse({ message: 'Crop deleted successfully' });
  } catch (error) {
    console.error('Error deleting crop:', error);
    return createResponse('Failed to delete crop', false, 500);
  }
}
