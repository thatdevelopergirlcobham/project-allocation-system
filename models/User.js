// User model for dummy data - no mongoose dependency

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  role: {
    type: String,
    required: [true, 'Please provide a role'],
    enum: ['admin', 'supervisor', 'student'],
  },
  department: {
    type: String,
    required: false, // Make it optional, we'll validate in the API
  },
  matricNumber: {
    type: String,
    required: false, // Make it optional, we'll validate in the API
    sparse: true, // Allow null values but enforce uniqueness when present
    set: function(value) {
      // Convert empty strings to null to avoid sparse index conflicts
      return value === '' ? null : value;
    }
  },
  specialization: {
    type: String,
    required: false, // Make it optional, we'll validate in the API
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    // Check if we're in a test/mock environment
    if (process.env.USE_MOCK_DB === 'true') {
      // For mock DB, just prefix the password with 'hashed:' to simulate hashing
      this.password = `hashed:${this.password}`;
      return next();
    }
    
    // Real hashing for production
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update updatedAt on save
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  // Check if we're in a test/mock environment
  if (process.env.USE_MOCK_DB === 'true') {
    // For mock DB, just check if the hashed password matches our format
    return this.password === `hashed:${candidatePassword}` || candidatePassword === this.password;
  }
  
  // Real comparison for production
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static methods for database operations
UserModel.findOne = async (query) => {
  const { findOne } = await import('../lib/dummyData.js');
  return findOne('users', query);
};

UserModel.find = async (query = {}) => {
  const { find } = await import('../lib/dummyData.js');
  return find('users', query);
};

UserModel.findById = async (id) => {
  const { getById } = await import('../lib/dummyData.js');
  return getById('users', id);
};

UserModel.create = async (data) => {
  const { create } = await import('../lib/dummyData.js');
  return create('users', data);
};

UserModel.findByIdAndUpdate = async (id, data) => {
  const { updateById } = await import('../lib/dummyData.js');
  return updateById('users', id, data);
};

UserModel.findByIdAndDelete = async (id) => {
  const { deleteById } = await import('../lib/dummyData.js');
  return deleteById('users', id);
};

// Prototype methods
UserModel.prototype.comparePassword = async function(candidatePassword) {
  const { comparePassword } = await import('../lib/dummyData.js');
  return comparePassword(candidatePassword, this.password);
};

UserModel.prototype.toJSON = function() {
  const userObject = { ...this };
  delete userObject.password;
  return userObject;
};

export default UserModel;
