import mongoose from 'mongoose';

const AllocationSchema = new mongoose.Schema({
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
  supervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supervisor',
    required: [true, 'Please provide a supervisor'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Allocation || mongoose.model('Allocation', AllocationSchema);
