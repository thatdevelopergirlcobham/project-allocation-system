// Project model for dummy data - no mongoose dependency

// Mock Project constructor that works with our dummy data
const ProjectModel = function(data) {
  Object.assign(this, data);
};

// Static methods for database operations
ProjectModel.findOne = async (query) => {
  const { findOne } = await import('../lib/dummyData.js');
  return findOne('projects', query);
};

ProjectModel.find = async (query = {}) => {
  const { find } = await import('../lib/dummyData.js');
  return find('projects', query);
};

ProjectModel.findById = async (id) => {
  const { getById } = await import('../lib/dummyData.js');
  return getById('projects', id);
};

ProjectModel.create = async (data) => {
  const { create } = await import('../lib/dummyData.js');
  return create('projects', data);
};

ProjectModel.findByIdAndUpdate = async (id, data) => {
  const { updateById } = await import('../lib/dummyData.js');
  return updateById('projects', id, data);
};

ProjectModel.findByIdAndDelete = async (id) => {
  const { deleteById } = await import('../lib/dummyData.js');
  return deleteById('projects', id);
};

export default ProjectModel;
