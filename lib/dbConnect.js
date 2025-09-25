// No longer using mongoose - using dummy data instead

// We are now using only dummy data, no MongoDB connection needed

// Set environment variable for mock database
process.env.USE_MOCK_DB = 'true';

// Create a dummy connection object for compatibility with existing code
let cached = global.dummyDB;

if (!cached) {
  cached = global.dummyDB = { conn: null };
}

async function dbConnect() {
  console.log('Using dummy database');

  // Create a dummy connection object that mimics mongoose functionality
  if (!cached.conn) {
    cached.conn = {
      models: {},
      model: (name, _schema) => { // Prefix with underscore to indicate it's unused
        if (!cached.conn.models[name]) {
          cached.conn.models[name] = createDummyModel(name);
        }
        return cached.conn.models[name];
      }
    };
  }

  return cached.conn;
}

// Helper function to create dummy models that use our dummyData module
function createDummyModel(name) {
  const collectionName = name.toLowerCase();

  return {
    findOne: async (query) => {
      const { findOne } = await import('./dummyData.js');
      return findOne(collectionName, query);
    },
    find: async (query = {}) => {
      const { find } = await import('./dummyData.js');
      return find(collectionName, query);
    },
    findById: async (id) => {
      const { getById } = await import('./dummyData.js');
      return getById(collectionName, id);
    },
    create: async (data) => {
      const { create } = await import('./dummyData.js');
      return create(collectionName, data);
    },
    findByIdAndUpdate: async (id, data) => {
      const { updateById } = await import('./dummyData.js');
      return updateById(collectionName, id, data);
    },
    findByIdAndDelete: async (id) => {
      const { deleteById } = await import('./dummyData.js');
      return deleteById(collectionName, id);
    },
    // Instance methods for document creation
    prototype: {
      save: async function() {
        if (this._id) {
          const { updateById } = await import('./dummyData.js');
          return updateById(collectionName, this._id, this);
        } else {
          const { create } = await import('./dummyData.js');
          return create(collectionName, this);
        }
      },
      toObject: function() {
        return { ...this };
      }
    }
  };
}

export default dbConnect;