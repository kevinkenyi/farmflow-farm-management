import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase, createResponse } from '@/lib/mongodb';

// GET /api/financial - Get all financial transactions
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const transactions = await db.collection('financial').find({}).toArray();
    
    return createResponse(transactions);
  } catch (error) {
    console.error('Error fetching financial transactions:', error);
    return createResponse('Failed to fetch financial transactions', false, 500);
  }
}

// POST /api/financial - Create a new financial transaction
export async function POST(request: NextRequest) {
  try {
    const transactionData = await request.json();
    
    // Validate required fields
    const requiredFields = ['type', 'category', 'amount', 'description'];
    for (const field of requiredFields) {
      if (!transactionData[field]) {
        return createResponse(`Missing required field: ${field}`, false, 400);
      }
    }

    const db = await getDatabase();
    
    const newTransaction = {
      ...transactionData,
      currency: transactionData.currency || 'KSH',
      status: transactionData.status || 'completed',
      date: transactionData.date || new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('financial').insertOne(newTransaction);
    
    const createdTransaction = await db.collection('financial').findOne({ _id: result.insertedId });
    
    return createResponse(createdTransaction, true, 201);
  } catch (error) {
    console.error('Error creating financial transaction:', error);
    return createResponse('Failed to create financial transaction', false, 500);
  }
}
