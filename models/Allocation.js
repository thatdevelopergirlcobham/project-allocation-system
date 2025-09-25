// Allocation model for dummy data - no mongoose dependency

// Mock Allocation constructor that works with our dummy data
const AllocationModel = function(data) {
  Object.assign(this, data);
};

// Static methods for database operations
AllocationModel.findOne = async (query) => {
  const { findOne } = await import('../lib/dummyData.js');
  return findOne('allocations', query);
};

AllocationModel.find = async (query = {}) => {
  const { find } = await import('../lib/dummyData.js');
  return find('allocations', query);
};

AllocationModel.findById = async (id) => {
  const { getById } = await import('../lib/dummyData.js');
  return getById('allocations', id);
};

AllocationModel.create = async (data) => {
  const { create } = await import('../lib/dummyData.js');
  return create('allocations', data);
};

AllocationModel.findByIdAndUpdate = async (id, data) => {
  const { updateById } = await import('../lib/dummyData.js');
  return updateById('allocations', id, data);
};

AllocationModel.findByIdAndDelete = async (id) => {
  const { deleteById } = await import('../lib/dummyData.js');
  return deleteById('allocations', id);
};

export default AllocationModel;
