import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

// Transform output to remove password and sensitive data
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
