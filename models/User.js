// User model for dummy data - no mongoose dependency

// Mock User constructor that works with our dummy data
const UserModel = function(data) {
  Object.assign(this, data);
};

// Static methods for database operations
UserModel.findOne = async (query) => {
  const { findOne } = await import('../lib/dummyData.js');
  return findOne('users', query);
};

UserModel.find = async (query = {}) => {
  const { find } = await import('../lib/dummyData.js');
  return find('users', query);
};

UserModel.findById = async (id) => {
  const { getById } = await import('../lib/dummyData.js');
  return getById('users', id);
};

UserModel.create = async (data) => {
  const { create } = await import('../lib/dummyData.js');
  return create('users', data);
};

UserModel.findByIdAndUpdate = async (id, data) => {
  const { updateById } = await import('../lib/dummyData.js');
  return updateById('users', id, data);
};

UserModel.findByIdAndDelete = async (id) => {
  const { deleteById } = await import('../lib/dummyData.js');
  return deleteById('users', id);
};

// Prototype methods
UserModel.prototype.comparePassword = async function(candidatePassword) {
  const { comparePassword } = await import('../lib/dummyData.js');
  return comparePassword(candidatePassword, this.password);
};

UserModel.prototype.toJSON = function() {
  const userObject = { ...this };
  delete userObject.password;
  return userObject;
};

export default UserModel;
