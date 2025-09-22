import mongoose from 'mongoose';

const SupervisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  department: {
    type: String,
    required: [true, 'Please provide a department'],
  },
  projectsCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Supervisor || mongoose.model('Supervisor', SupervisorSchema);
