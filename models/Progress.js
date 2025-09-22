import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Please provide a student'],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Please provide a project'],
  },
  report: {
    type: String,
    required: [true, 'Please provide a progress report'],
    maxlength: [1000, 'Report cannot be more than 1000 characters'],
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  feedback: {
    type: String,
    maxlength: [500, 'Feedback cannot be more than 500 characters'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
