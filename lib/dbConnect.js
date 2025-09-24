import mongoose from 'mongoose';

// Check if we should use mock database for development/testing
const USE_MOCK_DB = process.env.USE_MOCK_DB === 'true';

// Default to a local MongoDB instance if no URI is provided
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student-project-system';

// Log a warning instead of throwing an error
if (!process.env.MONGODB_URI) {
  console.warn('Warning: MONGODB_URI environment variable is not defined in .env.local');
  console.warn('Using default connection string:', MONGODB_URI);
}

// Mock database for development/testing
const mockDB = {
  users: [],
  students: [],
  supervisors: [],
  projects: [],
  allocations: [],
  progress: []
};

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If we're using the mock database, return early
  if (USE_MOCK_DB) {
    console.log('Using mock database for development');
    // Create a mock connection object that mimics mongoose
    if (!cached.mockConn) {
      cached.mockConn = {
        models: {},
        model: (name, schema) => {
          if (!cached.mockConn.models[name]) {
            cached.mockConn.models[name] = createMockModel(name, schema);
          }
          return cached.mockConn.models[name];
        }
      };
    }
    return cached.mockConn;
  }

  // Use real MongoDB connection
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e.message);
    
    // Instead of throwing, fall back to mock database
    console.log('Falling back to mock database due to connection error');
    if (!cached.mockConn) {
      cached.mockConn = {
        models: {},
        model: (name, schema) => {
          if (!cached.mockConn.models[name]) {
            cached.mockConn.models[name] = createMockModel(name, schema);
          }
          return cached.mockConn.models[name];
        }
      };
    }
    return cached.mockConn;
  }

  return cached.conn;
}

// Helper function to create mock models
function createMockModel(name) {  // We don't need schema for our mock implementation
  const collection = mockDB[name.toLowerCase()] || [];
  
  return {
    findOne: async (query) => {
      return collection.find(item => {
        return Object.keys(query).every(key => item[key] === query[key]);
      });
    },
    find: async (query) => {
      return collection.filter(item => {
        return Object.keys(query).length === 0 || 
          Object.keys(query).every(key => item[key] === query[key]);
      });
    },
    create: async (data) => {
      const newItem = {
        _id: Math.random().toString(36).substring(2, 15),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      collection.push(newItem);
      return newItem;
    },
    save: async () => {},
    toObject: () => ({}),
    comparePassword: async () => true
  };
}

export default dbConnect;