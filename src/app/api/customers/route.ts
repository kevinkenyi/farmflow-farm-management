import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase, createResponse } from '@/lib/mongodb';

// GET /api/customers - Get all customers
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const customers = await db.collection('customers').find({}).toArray();
    
    return createResponse(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return createResponse('Failed to fetch customers', false, 500);
  }
}

// POST /api/customers - Create a new customer
export async function POST(request: NextRequest) {
  try {
    const customerData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'phone'];
    for (const field of requiredFields) {
      if (!customerData[field]) {
        return createResponse(`Missing required field: ${field}`, false, 400);
      }
    }

    const db = await getDatabase();
    
    const newCustomer = {
      ...customerData,
      status: customerData.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('customers').insertOne(newCustomer);
    
    const createdCustomer = await db.collection('customers').findOne({ _id: result.insertedId });
    
    return createResponse(createdCustomer, true, 201);
  } catch (error) {
    console.error('Error creating customer:', error);
    return createResponse('Failed to create customer', false, 500);
  }
}
