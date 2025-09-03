import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase, createResponse } from '@/lib/mongodb';

// GET /api/invoices - Get all invoices
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const invoices = await db.collection('invoices').find({}).toArray();
    
    return createResponse(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return createResponse('Failed to fetch invoices', false, 500);
  }
}

// POST /api/invoices - Create a new invoice
export async function POST(request: NextRequest) {
  try {
    const invoiceData = await request.json();
    
    // Validate required fields
    const requiredFields = ['invoiceNumber', 'customer', 'items', 'total', 'dueDate'];
    for (const field of requiredFields) {
      if (!invoiceData[field]) {
        return createResponse(`Missing required field: ${field}`, false, 400);
      }
    }

    const db = await getDatabase();
    
    const newInvoice = {
      ...invoiceData,
      status: invoiceData.status || 'pending',
      issueDate: invoiceData.issueDate || new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('invoices').insertOne(newInvoice);
    
    const createdInvoice = await db.collection('invoices').findOne({ _id: result.insertedId });
    
    return createResponse(createdInvoice, true, 201);
  } catch (error) {
    console.error('Error creating invoice:', error);
    return createResponse('Failed to create invoice', false, 500);
  }
}
