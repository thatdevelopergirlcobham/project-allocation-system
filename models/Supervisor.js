// Supervisor model for dummy data - no mongoose dependency

// Mock Supervisor constructor that works with our dummy data
const SupervisorModel = function(data) {
  Object.assign(this, data);
};

// Static methods for database operations
SupervisorModel.findOne = async (query) => {
  const { findOne } = await import('../lib/dummyData.js');
  return findOne('supervisors', query);
};

SupervisorModel.find = async (query = {}) => {
  const { find } = await import('../lib/dummyData.js');
  return find('supervisors', query);
};

SupervisorModel.findById = async (id) => {
  const { getById } = await import('../lib/dummyData.js');
  return getById('supervisors', id);
};

SupervisorModel.create = async (data) => {
  const { create } = await import('../lib/dummyData.js');
  return create('supervisors', data);
};

SupervisorModel.findByIdAndUpdate = async (id, data) => {
  const { updateById } = await import('../lib/dummyData.js');
  return updateById('supervisors', id, data);
};

SupervisorModel.findByIdAndDelete = async (id) => {
  const { deleteById } = await import('../lib/dummyData.js');
  return deleteById('supervisors', id);
};

export default SupervisorModel;
