import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase, createResponse, isValidObjectId } from '@/lib/mongodb';

// GET /api/fields/[id] - Get a single field
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isValidObjectId(id)) {
      return createResponse('Invalid field ID', false, 400);
    }

    const db = await getDatabase();
    const field = await db.collection('fields').findOne({ _id: new ObjectId(id) });
    
    if (!field) {
      return createResponse('Field not found', false, 404);
    }
    
    return createResponse(field);
  } catch (error) {
    console.error('Error fetching field:', error);
    return createResponse('Failed to fetch field', false, 500);
  }
}

// PUT /api/fields/[id] - Update a field
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isValidObjectId(id)) {
      return createResponse('Invalid field ID', false, 400);
    }

    const updateData = await request.json();
    
    const db = await getDatabase();
    
    const updatedField = {
      ...updateData,
      updatedAt: new Date()
    };

    const result = await db.collection('fields').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedField },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return createResponse('Field not found', false, 404);
    }
    
    return createResponse(result);
  } catch (error) {
    console.error('Error updating field:', error);
    return createResponse('Failed to update field', false, 500);
  }
}

// DELETE /api/fields/[id] - Delete a field
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isValidObjectId(id)) {
      return createResponse('Invalid field ID', false, 400);
    }

    const db = await getDatabase();
    const result = await db.collection('fields').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return createResponse('Field not found', false, 404);
    }
    
    return createResponse({ message: 'Field deleted successfully' });
  } catch (error) {
    console.error('Error deleting field:', error);
    return createResponse('Failed to delete field', false, 500);
  }
}
