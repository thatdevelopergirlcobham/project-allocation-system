import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  supervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supervisor',
    required: [true, 'Please provide a supervisor'],
  },
  department: {
    type: String,
    required: [true, 'Please provide a department'],
  },
  maxStudents: {
    type: Number,
    required: [true, 'Please provide maximum number of students'],
    min: [1, 'Must allow at least 1 student'],
  },
  currentStudents: {
    type: Number,
    default: 0,
  },
  requirements: {
    type: String,
    maxlength: [500, 'Requirements cannot be more than 500 characters'],
  },
  status: {
    type: String,
    enum: ['available', 'assigned', 'completed'],
    default: 'available',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
