// Student model for dummy data - no mongoose dependency

// Mock Student constructor that works with our dummy data
const StudentModel = function(data) {
  Object.assign(this, data);
};

// Static methods for database operations
StudentModel.findOne = async (query) => {
  const { findOne } = await import('../lib/dummyData.js');
  return findOne('students', query);
};

StudentModel.find = async (query = {}) => {
  const { find } = await import('../lib/dummyData.js');
  return find('students', query);
};

StudentModel.findById = async (id) => {
  const { getById } = await import('../lib/dummyData.js');
  return getById('students', id);
};

StudentModel.create = async (data) => {
  const { create } = await import('../lib/dummyData.js');
  return create('students', data);
};

StudentModel.findByIdAndUpdate = async (id, data) => {
  const { updateById } = await import('../lib/dummyData.js');
  return updateById('students', id, data);
};

StudentModel.findByIdAndDelete = async (id) => {
  const { deleteById } = await import('../lib/dummyData.js');
  return deleteById('students', id);
};

export default StudentModel;
