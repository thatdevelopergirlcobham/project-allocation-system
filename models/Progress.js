// Progress model for dummy data - no mongoose dependency

// Mock Progress constructor that works with our dummy data
const ProgressModel = function(data) {
  Object.assign(this, data);
};

// Static methods for database operations
ProgressModel.findOne = async (query) => {
  const { findOne } = await import('../lib/dummyData.js');
  return findOne('progress', query);
};

ProgressModel.find = async (query = {}) => {
  const { find } = await import('../lib/dummyData.js');
  return find('progress', query);
};

ProgressModel.findById = async (id) => {
  const { getById } = await import('../lib/dummyData.js');
  return getById('progress', id);
};

ProgressModel.create = async (data) => {
  const { create } = await import('../lib/dummyData.js');
  return create('progress', data);
};

ProgressModel.findByIdAndUpdate = async (id, data) => {
  const { updateById } = await import('../lib/dummyData.js');
  return updateById('progress', id, data);
};

ProgressModel.findByIdAndDelete = async (id) => {
  const { deleteById } = await import('../lib/dummyData.js');
  return deleteById('progress', id);
};

export default ProgressModel;
