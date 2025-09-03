import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  console.warn('Warning: MONGODB_URI environment variable not set. Using default connection string.');
}

const uri = process.env.MONGODB_URI || 'mongodb+srv://farm:%40ID39337447@cluster0.5lhmarm.mongodb.net/farmflow?retryWrites=true&w=majority&appName=Cluster0';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('farmflow');
}

// Helper function to handle common API response patterns
export function createResponse(data: any, success: boolean = true, status: number = 200) {
  return Response.json(
    {
      success,
      data: success ? data : undefined,
      error: success ? undefined : data,
      timestamp: new Date().toISOString()
    },
    { status }
  );
}

// Helper function to handle MongoDB ObjectId validation
export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}
